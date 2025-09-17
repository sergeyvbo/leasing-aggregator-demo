import React, { useState, useEffect } from 'react';
import type {
  PageType,
  LoginData,
  CompanyData,
  VehicleData,
  Filter,
  LeasingProduct
} from '../types';
import {
  searchCompaniesByInn,
  searchVehicleByVin,
  searchWatercraftByName,
  searchAircraftByName,
  getRandomLeasingProducts
} from '../data/mockData';

// Import page components
import LoginPage from './pages/LoginPage';
import CompanySearchPage from './pages/CompanySearchPage';
import LeasingSubjectPage from './pages/LeasingSubjectPage';
import LeasingSearchPage from './pages/LeasingSearchPage';

// Import UI components
import Header from './ui/Header';
import Stepper from './ui/Stepper';
import Modal from './ui/Modal';
import SuccessNotification from './ui/SuccessNotification';

const LeasingAggregator: React.FC = () => {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  // Loading state
  const [loading, setLoading] = useState(false);

  // Modal and notification states
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data states
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });

  const [companyData, setCompanyData] = useState<CompanyData>({
    inn: '',
    result: null
  });

  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const [leasingSubject, setLeasingSubject] = useState('');

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    searchQuery: '',
    result: null
  });

  const [filters, setFilters] = useState<Filter[]>([]);
  const [leasingProducts, setLeasingProducts] = useState<LeasingProduct[]>([]);

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
    setFilters([]);
    setLeasingProducts([]);
    setShowModal(false);
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
      setVehicleData({ ...vehicleData, result });
      setLoading(false);
    }, 500);
  };

  const searchLeasingProducts = async () => {
    setLoading(true);
    setTimeout(() => {
      const randomProducts = getRandomLeasingProducts(2, 5);
      setLeasingProducts(randomProducts);
      setLoading(false);
    }, 500);
  };

  // Filter management
  const addFilter = () => {
    const newFilter: Filter = {
      id: Date.now(),
      parameter: '',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: number, field: string, value: string) => {
    setFilters(filters.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  // Modal and proposal handling
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendProposal = () => {
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  // Navigation handlers
  const handleCompanySearchNext = (companyIndex: number) => {
    // Set selected company when moving to next step
    if (companyData.result && companyData.result[companyIndex]) {
      setSelectedCompany(companyData.result[companyIndex].name);
    }
    setCurrentPage('leasing-subject');
  };

  const handleLeasingSubjectNext = () => {
    // Set selected vehicle when moving to next step
    if (vehicleData.result) {
      setSelectedVehicle(`${vehicleData.result.brand} ${vehicleData.result.model}`);
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
        selectedCompany={selectedCompany}
        selectedSubject={leasingSubject || null}
        selectedVehicle={selectedVehicle}
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
            showModal={showModal}
            onAddFilter={addFilter}
            onRemoveFilter={removeFilter}
            onUpdateFilter={updateFilter}
            onSearchLeasingProducts={searchLeasingProducts}
            onShowModal={handleShowModal}
            onCloseModal={handleCloseModal}
            onSendProposal={handleSendProposal}
          />
        )}
      </div>

      {/* Modal component */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSendProposal={handleSendProposal}
      />

      {/* Success notification */}
      <SuccessNotification isVisible={showSuccess} />
    </div>
  );
};

export default LeasingAggregator;