import React, { useState, useEffect } from 'react';
import type {
  PageType,
  LoginData,
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
import LoginPage from './pages/LoginPage';
import CompanySearchPage from './pages/CompanySearchPage';
import LeasingSubjectPage from './pages/LeasingSubjectPage';
import LeasingSearchPage from './pages/LeasingSearchPage';
import CommercialProposalPage from './pages/CommercialProposalPage';
import ContractSigningPage from './pages/ContractSigningPage';

// Import UI components
import Header from './ui/Header';
import Stepper from './ui/Stepper';
import SuccessNotification from './ui/SuccessNotification';
import FinancingNotification from './ui/FinancingNotification';

const LeasingAggregator: React.FC = () => {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  // Loading state
  const [loading, setLoading] = useState(false);

  // Notification states
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFinancingNotification, setShowFinancingNotification] = useState(false);
  const [financingMessage, setFinancingMessage] = useState('');

  // Form data states
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });

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

  // Event handlers
  const handleLogin = async () => {
    if (loginData.username && loginData.password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentPage('company-search');
      }, 500);
    }
  };

  const handleLogout = () => {
    // Reset all state
    setCurrentPage('login');
    setLoginData({ username: '', password: '' });
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

  // Render login page
  if (currentPage === 'login') {
    return (
      <LoginPage
        loginData={loginData}
        loading={loading}
        onLoginDataChange={setLoginData}
        onLogin={handleLogin}
      />
    );
  }

  // Render main application with header
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        username={loginData.username}
        onLogout={handleLogout}
      />

      <Stepper
        currentStep={getCurrentStep()}
        selectedCompany={selectedCompany?.name || null}
        selectedSubject={leasingSubject || null}
        selectedVehicle={selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : null}
        selectedProduct={selectedProduct?.company || null}
        hasPaymentSchedule={paymentSchedule !== null}
        onStepClick={handleStepClick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
};

export default LeasingAggregator;