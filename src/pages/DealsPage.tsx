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

interface Deal {
  id: string;
  client: string;
  amount: number;
  status: string;
  date: string;
}

interface DealsPageProps {
  onCreateDeal?: () => void; // Made optional since we're integrating the functionality
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
  }
];

const DealsPage: React.FC<DealsPageProps> = ({ onCreateDeal }) => {
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

  // Utility functions for deals table
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'В обработке':
        return 'text-yellow-600 bg-yellow-100';
      case 'Одобрено':
        return 'text-green-600 bg-green-100';
      case 'Отклонено':
        return 'text-red-600 bg-red-100';
      case 'Завершено':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Event handlers from LeasingAggregator (login removed since it's handled at app level)

  const handleBackToDealsList = () => {
    // Reset all state and return to deals table
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

  // Handle "Create Deal" button click - starts the deal creation flow
  const handleCreateDealClick = () => {
    if (onCreateDeal) {
      onCreateDeal(); // Call the original prop if provided for backward compatibility
    }
    setShowDealCreation(true);
    setCurrentPage('company-search'); // Start from company search, not login
  };

  // If we're in deal creation mode, render the leasing aggregator functionality
  if (showDealCreation) {
    return (
      <div className="p-6">
        {/* Back button to return to deals table */}
        <div className="mb-6">
          <button
            onClick={handleBackToDealsList}
            className="bg-white shadow-md hover:shadow-lg text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к сделкам
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
      
      {/* Таблица сделок */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Клиент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сумма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockDeals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {deal.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deal.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatAmount(deal.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deal.status)}`}>
                    {deal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(deal.date).toLocaleDateString('ru-RU')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Кнопка "Создать сделку" под таблицей */}
      <div className="mt-6">
        <button
          onClick={handleCreateDealClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Создать сделку
        </button>
      </div>
    </div>
  );
};

export default DealsPage;