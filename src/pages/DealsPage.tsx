import React, { useState, useEffect } from 'react';
import type {
  PageType,
  CompanyData,
  VehicleData,
  Filter,
  LeasingProduct,
  CompanyResult,
  VehicleResult
} from '../types';
import {
  searchCompaniesByInn,
  searchVehicleByVin,
  searchWatercraftByName,
  searchAircraftByName,
  getRandomLeasingProducts,
  applyFiltersToProducts
} from '../data/mockData';

// Import page components
import CompanySearchPage from '../components/pages/CompanySearchPage';
import LeasingSubjectPage from '../components/pages/LeasingSubjectPage';
import LeasingSearchPage from '../components/pages/LeasingSearchPage';
import CommercialProposalPage from '../components/pages/CommercialProposalPage';
import ContractSigningPage from '../components/pages/ContractSigningPage';

// Import UI components
import Stepper from '../components/ui/Stepper';
import SuccessNotification from '../components/ui/SuccessNotification';
import FinancingNotification from '../components/ui/FinancingNotification';

// Import DataGrid components
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { Deal } from './DealsPage/types';
import { dealsColumns } from './DealsPage/dealsColumns';

// Вспомогательные функции для генерации мок-данных при редактировании сделки
const generateInnFromClient = (clientName: string): string => {
  // Генерируем ИНН на основе названия клиента
  const hash = clientName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return Math.abs(hash).toString().padStart(10, '0').substring(0, 10);
};

const generateKpp = (): string => {
  return Math.floor(Math.random() * 900000000 + 100000000).toString();
};

const generateOkato = (): string => {
  return Math.floor(Math.random() * 90000000000 + 10000000000).toString();
};

const generateAddress = (): string => {
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];
  const streets = ['ул. Ленина', 'пр. Мира', 'ул. Пушкина', 'ул. Гагарина', 'ул. Советская'];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const house = Math.floor(Math.random() * 200) + 1;
  return `${city}, ${street}, д. ${house}`;
};

const generateVehicleTypeFromAmount = (amount: number): string => {
  if (amount < 1000000) return 'Легковой автомобиль';
  if (amount < 3000000) return 'Грузовой автомобиль';
  if (amount < 5000000) return 'Специальная техника';
  return 'Строительная техника';
};

const generateVehicleFromAmount = (amount: number, vehicleType: string) => {
  const baseCost = amount;
  const customCost = Math.floor(baseCost * (0.8 + Math.random() * 0.4)); // ±20% от базовой стоимости
  
  if (vehicleType === 'Легковой автомобиль') {
    const brands = ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia'];
    const models = ['Camry', 'Accord', 'Altima', 'Elantra', 'Optima'];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    
    return {
      brand,
      model,
      year: (2020 + Math.floor(Math.random() * 4)).toString(),
      vin: `VIN${Math.random().toString(36).substr(2, 17).toUpperCase()}`,
      power: (150 + Math.floor(Math.random() * 100)).toString(),
      engineNumber: `ENG${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      cost: baseCost.toString(),
      customCost: customCost.toString()
    };
  } else if (vehicleType === 'Грузовой автомобиль') {
    const brands = ['КАМАЗ', 'МАЗ', 'Урал', 'ГАЗ', 'ЗИЛ'];
    const models = ['5320', '6312', '4320', '3302', '4331'];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    
    return {
      brand,
      model,
      year: (2018 + Math.floor(Math.random() * 6)).toString(),
      vin: `VIN${Math.random().toString(36).substr(2, 17).toUpperCase()}`,
      power: (200 + Math.floor(Math.random() * 200)).toString(),
      engineNumber: `ENG${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      cost: baseCost.toString(),
      customCost: customCost.toString()
    };
  } else {
    const brands = ['Caterpillar', 'Komatsu', 'Volvo', 'JCB', 'Liebherr'];
    const models = ['320D', 'PC200', 'EC210', '3CX', 'R944'];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    
    return {
      brand,
      model,
      year: (2017 + Math.floor(Math.random() * 7)).toString(),
      vin: `VIN${Math.random().toString(36).substr(2, 17).toUpperCase()}`,
      power: (300 + Math.floor(Math.random() * 300)).toString(),
      engineNumber: `ENG${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      cost: baseCost.toString(),
      customCost: customCost.toString()
    };
  }
};

const generateLeasingProductsFromAmount = (amount: number) => {
  const companies = ['Альфа-Лизинг', 'ВТБ Лизинг', 'Сбербанк Лизинг', 'Газпромбанк Лизинг', 'Россельхозбанк Лизинг'];
  const products = [];
  
  // Генерируем 2-3 лизинговых продукта
  const numProducts = 2 + Math.floor(Math.random() * 2);
  
  for (let i = 0; i < numProducts; i++) {
    const company = companies[i % companies.length];
    const rate = 8 + Math.random() * 7; // Ставка от 8% до 15%
    const term = 12 + Math.floor(Math.random() * 36); // Срок от 12 до 48 месяцев
    const advance = 10 + Math.floor(Math.random() * 20); // Аванс от 10% до 30%
    
    products.push({
      id: i + 1,
      company,
      rate: (Math.round(rate * 100) / 100).toString(),
      term: term.toString(),
      advance: advance.toString(),
      amount: amount,
      monthlyPayment: Math.round((amount * (1 - advance / 100) * (rate / 100 / 12) * Math.pow(1 + rate / 100 / 12, term)) / (Math.pow(1 + rate / 100 / 12, term) - 1)),
      paymentSchedule: '',
      agentFee: Math.round(amount * 0.01).toString(),
      buyoutPayment: Math.round(amount * 0.05).toString()
    });
  }
  
  return products;
};

interface DealsPageProps {
  prefilledClient?: {
    inn: string;
    name: string;
    kpp?: string;
    okato?: string;
    opf?: string;
    address?: string;
  };
  onBackToClient?: () => void;
}

// Мок-данные для отображения сделок
const mockDeals: Deal[] = [
  {
    id: '1',
    client: 'ООО "Транспортная компания"',
    amount: 2500000,
    status: 'В обработке',
    date: '2024-01-15'
  },
  {
    id: '2',
    client: 'ИП Иванов А.А.',
    amount: 850000,
    status: 'Одобрено',
    date: '2024-01-12'
  },
  {
    id: '3',
    client: 'ООО "Строительная компания"',
    amount: 4200000,
    status: 'Отклонено',
    date: '2024-01-10'
  },
  {
    id: '4',
    client: 'ООО "Логистика Плюс"',
    amount: 1750000,
    status: 'Завершено',
    date: '2024-01-08'
  },
  {
    id: '5',
    client: 'ИП Петров С.В.',
    amount: 650000,
    status: 'В обработке',
    date: '2024-01-05'
  },
  {
    id: '6',
    client: 'ООО "Автопарк"',
    amount: 3200000,
    status: 'Одобрено',
    date: '2024-01-03'
  },
  {
    id: '7',
    client: 'ИП Сидоров М.К.',
    amount: 920000,
    status: 'В обработке',
    date: '2024-01-02'
  },
  {
    id: '8',
    client: 'ООО "Грузоперевозки"',
    amount: 1850000,
    status: 'Завершено',
    date: '2023-12-28'
  },
  {
    id: '9',
    client: 'ИП Козлов А.В.',
    amount: 750000,
    status: 'Отклонено',
    date: '2023-12-25'
  },
  {
    id: '10',
    client: 'ООО "Экспресс Доставка"',
    amount: 2100000,
    status: 'В обработке',
    date: '2023-12-22'
  },
  {
    id: '11',
    client: 'ИП Морозов Д.С.',
    amount: 1200000,
    status: 'Одобрено',
    date: '2023-12-20'
  },
  {
    id: '12',
    client: 'ООО "Спецтехника"',
    amount: 4800000,
    status: 'Завершено',
    date: '2023-12-18'
  },
  {
    id: '13',
    client: 'ИП Волков Н.П.',
    amount: 680000,
    status: 'В обработке',
    date: '2023-12-15'
  },
  {
    id: '14',
    client: 'ООО "Мегатранс"',
    amount: 3500000,
    status: 'Отклонено',
    date: '2023-12-12'
  },
  {
    id: '15',
    client: 'ИП Лебедев К.А.',
    amount: 890000,
    status: 'Одобрено',
    date: '2023-12-10'
  }
];

const DealsPage: React.FC<DealsPageProps> = ({ prefilledClient, onBackToClient }) => {
  // State for showing the deal creation flow
  const [showDealCreation, setShowDealCreation] = useState(false);

  // All the LeasingAggregator state variables
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFinancingNotification, setShowFinancingNotification] = useState(false);
  const [financingMessage, setFinancingMessage] = useState('');

  // Username is now managed at the app level

  const [companyData, setCompanyData] = useState<CompanyData>({
    inn: '',
    result: null
  });

  const [selectedCompany, setSelectedCompany] = useState<CompanyResult | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<LeasingProduct | null>(null);

  const [leasingSubject, setLeasingSubject] = useState('');

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    searchQuery: '',
    result: null
  });

  const [filters, setFilters] = useState<Filter[]>([]);
  const [leasingProducts, setLeasingProducts] = useState<LeasingProduct[]>([]);
  const [paymentSchedule, setPaymentSchedule] = useState<any>(null);

  // Clear vehicle data when leasing subject changes
  useEffect(() => {
    setVehicleData({ searchQuery: '', result: null });
    setSelectedVehicle(null);
  }, [leasingSubject]);

  // Auto-start deal creation if prefilledClient is provided
  useEffect(() => {
    if (prefilledClient && !showDealCreation) {
      handleAddDeal();
    }
  }, [prefilledClient]);



  // Event handlers from LeasingAggregator (login removed since it's handled at app level)

  const handleBackToDealsList = () => {
    // Reset all state and return to deals table or client page
    setCurrentPage('company-search'); // Start from company search instead of login
    setCompanyData({ inn: '', result: null });
    setSelectedCompany(null);
    setLeasingSubject('');
    setVehicleData({ searchQuery: '', result: null });
    setSelectedVehicle(null);
    setSelectedProduct(null);
    setFilters([]);
    setLeasingProducts([]);
    setPaymentSchedule(null);
    setShowSuccess(false);
    setShowDealCreation(false);

    // If we came from a client page, go back there
    if (onBackToClient) {
      onBackToClient();
    }
  };

  const searchCompany = async () => {
    if (!companyData.inn) return;
    setLoading(true);
    setTimeout(() => {
      const results = searchCompaniesByInn(companyData.inn);
      setCompanyData({
        inn: companyData.inn,
        result: results
      } as CompanyData);
      setLoading(false);
    }, 500);
  };

  const searchVehicle = async () => {
    if (!vehicleData.searchQuery) return;
    setLoading(true);
    setTimeout(() => {
      let result;
      switch (leasingSubject) {
        case 'car':
          result = searchVehicleByVin(vehicleData.searchQuery);
          break;
        case 'aircraft':
          result = searchAircraftByName(vehicleData.searchQuery);
          break;
        case 'ship':
          result = searchWatercraftByName(vehicleData.searchQuery);
          break;
        default:
          result = searchVehicleByVin(vehicleData.searchQuery);
      }
      // Автоматически заполняем customCost значением из cost
      if (result) {
        result.customCost = result.cost;
      }
      setVehicleData({ ...vehicleData, result });
      setLoading(false);
    }, 500);
  };

  const searchLeasingProducts = async () => {
    setLoading(true);
    setTimeout(() => {
      // Получаем больше продуктов для фильтрации
      const allProducts = getRandomLeasingProducts(8, 12);

      // Применяем фильтры с адаптацией значений
      const filteredProducts = applyFiltersToProducts(allProducts, filters);
      setLeasingProducts(filteredProducts);
      setLoading(false);
    }, 500);
  };

  // Filter management
  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now(),
      parameter: '',
      operator: '',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: number, field: string, value: string) => {
    setFilters(filters.map(f => {
      if (f.id === id) {
        const updatedFilter = { ...f, [field]: value };

        // Сбрасываем зависимые поля при изменении параметра
        if (field === 'parameter') {
          updatedFilter.operator = '';
          updatedFilter.value = '';
        }
        // Сбрасываем значение при изменении оператора
        else if (field === 'operator') {
          updatedFilter.value = '';
        }

        return updatedFilter;
      }
      return f;
    }));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  // Proposal handling
  const handleCreateProposal = (product: LeasingProduct) => {
    setSelectedProduct(product);
    setCurrentPage('commercial-proposal');
  };

  const handleSendProposal = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleShowNotification = (message: string, schedule?: any) => {
    setFinancingMessage(message);
    setShowFinancingNotification(true);
    if (schedule) {
      setPaymentSchedule(schedule);
    }
  };

  const handleRejectDeal = () => {
    // Возвращаемся на шаг "Предварительный расчет"
    setCurrentPage('leasing-search');
    setPaymentSchedule(null);
  };

  const handleProceedToContract = () => {
    // Переходим к подписанию договора
    setCurrentPage('contract-signing');
  };

  const handleCloseFinancingNotification = () => {
    setShowFinancingNotification(false);
  };

  // Navigation handlers
  const handleCompanySearchNext = (companyIndex: number) => {
    // Set selected company when moving to next step
    if (companyData.result && companyData.result[companyIndex]) {
      setSelectedCompany(companyData.result[companyIndex]);
    }
    setCurrentPage('leasing-subject');
  };

  const handleLeasingSubjectNext = () => {
    // Set selected vehicle when moving to next step
    if (vehicleData.result) {
      setSelectedVehicle(vehicleData.result);
    }
    setCurrentPage('leasing-search');
  };

  // Stepper navigation handler
  const handleStepClick = (step: number) => {
    switch (step) {
      case 1:
        setCurrentPage('company-search');
        break;
      case 2:
        setCurrentPage('leasing-subject');
        break;
      case 3:
        setCurrentPage('leasing-search');
        break;
      case 4:
        setCurrentPage('commercial-proposal');
        break;
      case 5:
        setCurrentPage('contract-signing');
        break;
    }
  };

  // Get current step number based on page
  const getCurrentStep = (): number => {
    switch (currentPage) {
      case 'company-search':
        return 1;
      case 'leasing-subject':
        return 2;
      case 'leasing-search':
        return 3;
      case 'commercial-proposal':
        return 4;
      case 'contract-signing':
        return 5;
      default:
        return 1;
    }
  };

  // DataGrid handler functions
  const handleAddDeal = () => {
    setShowDealCreation(true);

    // If we have a prefilled client, skip to step 2 with client already selected
    if (prefilledClient) {
      // Set the company data as if search was completed
      const mockCompanyResult = [{
        name: prefilledClient.name,
        inn: prefilledClient.inn,
        kpp: prefilledClient.kpp || '',
        okato: prefilledClient.okato || '',
        opf: prefilledClient.opf || '',
        address: prefilledClient.address || ''
      }];

      setCompanyData({
        inn: prefilledClient.inn,
        result: mockCompanyResult
      });

      // Set the selected company
      setSelectedCompany(mockCompanyResult[0]);

      // Go directly to step 2 (leasing subject selection)
      setCurrentPage('leasing-subject');
    } else {
      // Normal flow - start from company search
      setCurrentPage('company-search');
    }
  };

  const handleEditDeal = (deal: Deal) => {
    // Переходим в режим создания сделки
    setShowDealCreation(true);
    
    // Генерируем мок-данные для компании на основе данных сделки
    const mockCompanyResult = [{
      name: deal.client,
      inn: generateInnFromClient(deal.client),
      kpp: generateKpp(),
      okato: generateOkato(),
      opf: deal.client.startsWith('ИП') ? 'Индивидуальный предприниматель' : 'Общество с ограниченной ответственностью',
      address: generateAddress()
    }];

    // Заполняем данные компании (1 шаг)
    setCompanyData({
      inn: mockCompanyResult[0].inn,
      result: mockCompanyResult
    });

    // Устанавливаем выбранную компанию
    setSelectedCompany(mockCompanyResult[0]);

    // Генерируем данные предмета лизинга на основе суммы сделки (2 шаг)
    const vehicleType = generateVehicleTypeFromAmount(deal.amount);
    setLeasingSubject(vehicleType);
    
    // Генерируем мок-данные транспортного средства
    const mockVehicleResult = generateVehicleFromAmount(deal.amount, vehicleType);
    setVehicleData({
      searchQuery: `${mockVehicleResult.brand} ${mockVehicleResult.model}`,
      result: mockVehicleResult
    });
    
    setSelectedVehicle(mockVehicleResult);

    // Генерируем мок-данные для лизинговых продуктов (3 шаг)
    const mockLeasingProducts = generateLeasingProductsFromAmount(deal.amount);
    setLeasingProducts(mockLeasingProducts);
    
    // Выбираем первый продукт как выбранный
    if (mockLeasingProducts.length > 0) {
      setSelectedProduct(mockLeasingProducts[0]);
    }

    // Переходим сразу на 4 шаг (Коммерческое предложение)
    setCurrentPage('commercial-proposal');
  };

  const handleDeleteDeal = (_id: string | number) => {
    // TODO: Implement deal deletion functionality
    // For now, we'll just log the ID. In a real implementation,
    // this would show a confirmation dialog and then delete the deal
  };

  // If we're in deal creation mode, render the leasing aggregator functionality
  if (showDealCreation) {
    return (
      <div className="p-4 md:p-6">
        {/* Back button to return to deals table or client page */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={handleBackToDealsList}
            className="bg-white shadow-md hover:shadow-lg text-gray-700 font-medium py-3 px-4 md:py-2 md:px-4 rounded-md border border-gray-300 transition-all duration-200 flex items-center gap-2 min-h-[44px] md:min-h-[auto] text-sm md:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {onBackToClient ? 'Назад к клиенту' : 'Назад к сделкам'}
          </button>
        </div>

        <Stepper
          currentStep={getCurrentStep()}
          selectedCompany={selectedCompany?.name || null}
          selectedSubject={leasingSubject || null}
          selectedVehicle={selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : null}
          selectedProduct={selectedProduct?.company || null}
          hasPaymentSchedule={paymentSchedule !== null}
          onStepClick={handleStepClick}
          skipFirstStep={!!prefilledClient}
        />

        <div className="mt-6 md:mt-8">
          {currentPage === 'company-search' && (
            <CompanySearchPage
              companyData={companyData}
              setCompanyData={setCompanyData}
              loading={loading}
              onSearch={searchCompany}
              onNext={handleCompanySearchNext}
            />
          )}

          {currentPage === 'leasing-subject' && (
            <LeasingSubjectPage
              leasingSubject={leasingSubject}
              setLeasingSubject={setLeasingSubject}
              vehicleData={vehicleData}
              setVehicleData={setVehicleData}
              loading={loading}
              onSearchVehicle={searchVehicle}
              onNext={handleLeasingSubjectNext}
            />
          )}

          {currentPage === 'leasing-search' && (
            <LeasingSearchPage
              filters={filters}
              leasingProducts={leasingProducts}
              loading={loading}
              onAddFilter={addFilter}
              onRemoveFilter={removeFilter}
              onUpdateFilter={updateFilter}
              onSearchLeasingProducts={searchLeasingProducts}
              onCreateProposal={handleCreateProposal}
              onClearAllFilters={clearAllFilters}
            />
          )}

          {currentPage === 'commercial-proposal' && (
            <CommercialProposalPage
              selectedCompany={selectedCompany}
              selectedVehicle={selectedVehicle}
              selectedProduct={selectedProduct}
              onSendProposal={handleSendProposal}
              onShowNotification={handleShowNotification}
              onRejectDeal={handleRejectDeal}
              onProceedToContract={handleProceedToContract}
            />
          )}

          {currentPage === 'contract-signing' && (
            <ContractSigningPage
              selectedCompany={selectedCompany}
              selectedVehicle={selectedVehicle}
              selectedProduct={selectedProduct}
              paymentSchedule={paymentSchedule}
            />
          )}
        </div>

        {/* Success notification */}
        <SuccessNotification isVisible={showSuccess} />

        {/* Financing notification */}
        <FinancingNotification
          isVisible={showFinancingNotification}
          message={financingMessage}
          onClose={handleCloseFinancingNotification}
        />
      </div>
    );
  }

  // Default view: Show deals table
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Сделки</h1>

      {/* DataGrid component replaces the old table */}
      <DataGrid
        data={mockDeals}
        columns={dealsColumns}
        onAdd={handleAddDeal}
        onEdit={handleEditDeal}
        onDelete={handleDeleteDeal}
        pageSize={5}
        searchable={true}
        sortable={true}
      />
    </div>
  );
};

export default DealsPage;