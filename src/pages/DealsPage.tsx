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

      console.log('Applied filters:', filters);
      console.log('Filtered and adapted products:', filteredProducts);

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

  // Helper function to search with specific INN
  const searchCompanyWithInn = async (inn: string) => {
    if (!inn) return;
    setLoading(true);
    setTimeout(() => {
      const results = searchCompaniesByInn(inn);
      setCompanyData({
        inn: inn,
        result: results
      } as CompanyData);
      setLoading(false);
    }, 500);
  };

  const handleEditDeal = (deal: Deal) => {
    // TODO: Implement deal editing functionality
    console.log('Edit deal:', deal);
    // For now, we'll just log the deal. In a real implementation,
    // this would open an edit modal or navigate to an edit page
  };

  const handleDeleteDeal = (id: string | number) => {
    // TODO: Implement deal deletion functionality
    console.log('Delete deal:', id);
    // For now, we'll just log the ID. In a real implementation,
    // this would show a confirmation dialog and then delete the deal
  };

  // If we're in deal creation mode, render the leasing aggregator functionality
  if (showDealCreation) {
    return (
      <div className="p-6">
        {/* Back button to return to deals table or client page */}
        <div className="mb-6">
          <button
            onClick={handleBackToDealsList}
            className="bg-white shadow-md hover:shadow-lg text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition-all duration-200 flex items-center gap-2"
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

        <div className="mt-8">
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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Сделки</h1>
      
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