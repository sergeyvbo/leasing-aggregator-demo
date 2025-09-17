import React, { useState } from 'react';
import type { 
  PageType, 
  LoginData, 
  CompanyData, 
  VehicleData, 
  Filter, 
  LeasingProduct 
} from '../types';
import { mockCompanyData, mockVehicleData, mockLeasingProducts } from '../data/mockData';

// Import page components
import LoginPage from './pages/LoginPage';
import CompanySearchPage from './pages/CompanySearchPage';
import LeasingSubjectPage from './pages/LeasingSubjectPage';
import LeasingSearchPage from './pages/LeasingSearchPage';

// Import UI components
import Header from './ui/Header';
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
  
  const [leasingSubject, setLeasingSubject] = useState('');
  
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    vin: '',
    result: null
  });
  
  const [filters, setFilters] = useState<Filter[]>([]);
  const [leasingProducts, setLeasingProducts] = useState<LeasingProduct[]>([]);

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
    setLeasingSubject('');
    setVehicleData({ vin: '', result: null });
    setFilters([]);
    setLeasingProducts([]);
    setShowModal(false);
    setShowSuccess(false);
  };

  const searchCompany = async () => {
    if (!companyData.inn) return;
    setLoading(true);
    setTimeout(() => {
      setCompanyData({ ...companyData, result: mockCompanyData });
      setLoading(false);
    }, 500);
  };

  const searchVehicle = async () => {
    if (!vehicleData.vin) return;
    setLoading(true);
    setTimeout(() => {
      setVehicleData({ ...vehicleData, result: mockVehicleData });
      setLoading(false);
    }, 500);
  };

  const searchLeasingProducts = async () => {
    setLoading(true);
    setTimeout(() => {
      setLeasingProducts(mockLeasingProducts);
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
  const handleCompanySearchNext = () => {
    setCurrentPage('leasing-subject');
  };

  const handleLeasingSubjectNext = () => {
    setCurrentPage('leasing-search');
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