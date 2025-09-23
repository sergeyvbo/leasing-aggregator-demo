import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import DealsPage from '../pages/DealsPage';
import ClientsPage from '../pages/ClientsPage';
import ClientDetailsPage from '../pages/ClientDetailsPage';
import LeasingCompaniesPage from '../pages/LeasingCompaniesPage';
import LeasingCompanyDetailsPage from '../pages/LeasingCompanyDetailsPage';
import BrokersPage from '../pages/BrokersPage';
import BrokerDetailsPage from '../pages/BrokerDetailsPage';
import ReportsPage from '../pages/ReportsPage';
import ReportDetailsPage from '../pages/ReportDetailsPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import MyOrganizationPage from '../pages/MyOrganizationPage';
import ClientBrokerBindingPageWrapper from '../pages/ClientBrokerBindingPage';
import QuotationRangesPageWrapper from '../pages/QuotationRangesPage';
import LeasingObjectsSettingsPageWrapper from '../pages/LeasingObjectsSettingsPageWrapper';
import UsersPage from '../pages/UsersPage';
import IntegrationsPage from '../pages/IntegrationsPage';
import TemplatesPage from '../pages/TemplatesPage';
import TemplateEditPage from '../pages/TemplateEditPage';
import LoginPage from './pages/LoginPage';
import type { RoleId } from '../types/roles';
import type { LoginData } from '../types';
import type { Client } from '../types/clients';
import type { LeasingCompany } from '../types/leasingCompanies';
import type { Broker } from '../types/brokers';
import type { Report } from '../types/reports';
import type { TemplateCollection, Template } from '../types/templates';
import { ROLE_IDS, MENU_CONFIG } from '../types/roles';
import { getSavedRole } from '../ui/RoleSelector';
import { getClientWithVersion } from '../data/clientsData';
import { getLeasingCompanyWithVersion } from '../data/leasingCompaniesData';
import { getBrokerWithVersion } from '../data/brokersData';
import { templateCollectionsData, templatesData } from '../data/templatesData';

const RoleBasedApp: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // State management for roles and navigation
  const [currentRole, setCurrentRole] = useState<RoleId>(getSavedRole());
  const [activeMenuItem, setActiveMenuItem] = useState<string>('');
  
  // Client navigation state
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'create-deal'>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [dealCreationClient, setDealCreationClient] = useState<{
    inn: string;
    name: string;
    kpp?: string;
    okato?: string;
    opf?: string;
    address?: string;
  } | null>(null);

  // Leasing company navigation state
  const [leasingCompanyView, setLeasingCompanyView] = useState<'list' | 'details'>('list');
  const [selectedLeasingCompany, setSelectedLeasingCompany] = useState<LeasingCompany | null>(null);

  // Broker navigation state
  const [brokerView, setBrokerView] = useState<'list' | 'details'>('list');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  // Reports navigation state
  const [reportsView, setReportsView] = useState<'list' | 'details'>('list');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Templates navigation state
  const [templatesView, setTemplatesView] = useState<'list' | 'edit'>('list');
  const [selectedTemplateCollection, setSelectedTemplateCollection] = useState<TemplateCollection | null>(null);
  const [templates, setTemplates] = useState<Template[]>(templatesData);

  // Initialize active menu item when role changes
  useEffect(() => {
    const menuItems = MENU_CONFIG[currentRole];
    if (menuItems && menuItems.length > 0) {
      setActiveMenuItem(menuItems[0].id);
    }
  }, [currentRole]);

  // Handle login
  const handleLogin = async () => {
    if (loginData.username && loginData.password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsAuthenticated(true);
      }, 500);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  // Handle role change
  const handleRoleChange = (roleId: RoleId) => {
    setCurrentRole(roleId);
  };

  // Handle menu item selection
  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
    // Reset client navigation when switching menu items
    setCurrentView('list');
    setSelectedClient(null);
    setDealCreationClient(null);
    // Reset leasing company navigation when switching menu items
    setLeasingCompanyView('list');
    setSelectedLeasingCompany(null);
    // Reset broker navigation when switching menu items
    setBrokerView('list');
    setSelectedBroker(null);
    // Reset reports navigation when switching menu items
    setReportsView('list');
    setSelectedReport(null);
    // Reset templates navigation when switching menu items
    setTemplatesView('list');
    setSelectedTemplateCollection(null);
  };

  // Handle client navigation
  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setCurrentView('details');
  };

  const handleBackToClientsList = () => {
    setCurrentView('list');
    setSelectedClient(null);
    setDealCreationClient(null);
  };

  const handleClientVersionChange = (versionId: string) => {
    if (selectedClient) {
      const clientWithVersion = getClientWithVersion(selectedClient.id, versionId);
      if (clientWithVersion) {
        setSelectedClient(clientWithVersion);
      }
    }
  };

  // Handle deal creation from client page
  const handleCreateDealFromClient = () => {
    if (selectedClient) {
      setDealCreationClient({
        inn: selectedClient.inn,
        name: selectedClient.fullName,
        kpp: selectedClient.requisites.kpp,
        okato: '', // This might need to be added to Client type if needed
        opf: selectedClient.opf,
        address: selectedClient.requisites.address
      });
      setCurrentView('create-deal');
    }
  };

  // Handle back to client from deal creation
  const handleBackToClientFromDeal = () => {
    setCurrentView('details');
    setDealCreationClient(null);
  };

  // Handle leasing company navigation
  const handleViewLeasingCompany = (leasingCompany: LeasingCompany) => {
    setSelectedLeasingCompany(leasingCompany);
    setLeasingCompanyView('details');
  };

  const handleBackToLeasingCompaniesList = () => {
    setLeasingCompanyView('list');
    setSelectedLeasingCompany(null);
  };

  const handleLeasingCompanyVersionChange = (versionId: string) => {
    if (selectedLeasingCompany) {
      const leasingCompanyWithVersion = getLeasingCompanyWithVersion(selectedLeasingCompany.id, versionId);
      if (leasingCompanyWithVersion) {
        setSelectedLeasingCompany(leasingCompanyWithVersion);
      }
    }
  };

  // Handle broker navigation
  const handleViewBroker = (broker: Broker) => {
    setSelectedBroker(broker);
    setBrokerView('details');
  };

  const handleBackToBrokersList = () => {
    setBrokerView('list');
    setSelectedBroker(null);
  };

  const handleBrokerVersionChange = (versionId: string) => {
    if (selectedBroker) {
      const brokerWithVersion = getBrokerWithVersion(selectedBroker.id, versionId);
      if (brokerWithVersion) {
        setSelectedBroker(brokerWithVersion);
      }
    }
  };

  // Handle reports navigation
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setReportsView('details');
  };

  const handleBackToReportsList = () => {
    setReportsView('list');
    setSelectedReport(null);
  };

  // Handle templates navigation
  const handleViewTemplateCollection = (collection: TemplateCollection) => {
    setSelectedTemplateCollection(collection);
    setTemplatesView('edit');
  };


  const handleAddTemplateCollection = () => {
    // Create empty template collection for adding new one
    const emptyCollection: TemplateCollection = {
      id: 'new',
      leasingCompanyId: '',
      leasingCompanyName: '',
      leasingObjectType: '',
      templateNames: '',
      version: {
        id: 'v1',
        number: 1,
        status: 'draft',
        startDate: undefined,
        endDate: undefined,
        previousVersionId: undefined,
        nextVersionId: undefined,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setSelectedTemplateCollection(emptyCollection);
    setTemplatesView('edit');
  };

  const handleEditTemplateCollection = (collection: TemplateCollection) => {
    handleViewTemplateCollection(collection);
  };

  const handleDeleteTemplateCollection = (collection: TemplateCollection) => {
    if (window.confirm(`Удалить коллекцию шаблонов для ${collection.leasingCompanyName} - ${collection.leasingObjectType}?`)) {
      console.log('Delete template collection:', collection);
      alert('Функция удаления коллекции шаблонов будет реализована');
    }
  };

  const handleSaveTemplates = (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
    console.log('Templates saved:', updatedTemplates);
    
    // If this was a new collection, we should add it to the collections list
    if (selectedTemplateCollection?.id === 'new') {
      console.log('New collection would be created with templates:', updatedTemplates);
      // In a real application, this would call an API to create the collection
    }
    
    // Return to templates list after saving
    setTemplatesView('list');
    setSelectedTemplateCollection(null);
  };

  const handleCancelTemplates = () => {
    console.log('Templates edit cancelled');
    setTemplatesView('list');
    setSelectedTemplateCollection(null);
  };

  // Render content based on active menu item and role
  const renderContent = () => {
    // Handle broker role menu items
    if (currentRole === ROLE_IDS.BROKER) {
      switch (activeMenuItem) {
        case 'deals':
          return <DealsPage />;
        case 'clients':
          // Handle client navigation
          if (currentView === 'create-deal' && dealCreationClient) {
            return (
              <DealsPage
                prefilledClient={dealCreationClient}
                onBackToClient={handleBackToClientFromDeal}
              />
            );
          }
          if (currentView === 'details' && selectedClient) {
            return (
              <ClientDetailsPage
                client={selectedClient}
                onBack={handleBackToClientsList}
                onVersionChange={handleClientVersionChange}
                onCreateDeal={handleCreateDealFromClient}
              />
            );
          }
          return <ClientsPage onViewClient={handleViewClient} />;
        default:
          return <DealsPage />;
      }
    }

    // Handle broker manager role menu items
    if (currentRole === ROLE_IDS.BROKER_MANAGER) {
      switch (activeMenuItem) {
        case 'deals':
          return <DealsPage />;
        case 'clients':
          // Handle client navigation
          if (currentView === 'create-deal' && dealCreationClient) {
            return (
              <DealsPage
                prefilledClient={dealCreationClient}
                onBackToClient={handleBackToClientFromDeal}
              />
            );
          }
          if (currentView === 'details' && selectedClient) {
            return (
              <ClientDetailsPage
                client={selectedClient}
                onBack={handleBackToClientsList}
                onVersionChange={handleClientVersionChange}
                onCreateDeal={handleCreateDealFromClient}
              />
            );
          }
          return <ClientsPage onViewClient={handleViewClient} />;
        case 'reports':
          // Handle reports navigation
          if (reportsView === 'details' && selectedReport) {
            return (
              <ReportDetailsPage
                report={selectedReport}
                onBack={handleBackToReportsList}
              />
            );
          }
          return <ReportsPage onViewReport={handleViewReport} />;
        case 'organization':
          return <MyOrganizationPage />;
        default:
          return <DealsPage />;
      }
    }

    // Handle business admin role menu items
    if (currentRole === ROLE_IDS.BUSINESS_ADMIN) {
      switch (activeMenuItem) {
        case 'leasing-companies':
          // Handle leasing company navigation
          if (leasingCompanyView === 'details' && selectedLeasingCompany) {
            return (
              <LeasingCompanyDetailsPage
                leasingCompany={selectedLeasingCompany}
                onBack={handleBackToLeasingCompaniesList}
                onVersionChange={handleLeasingCompanyVersionChange}
              />
            );
          }
          return <LeasingCompaniesPage onViewLeasingCompany={handleViewLeasingCompany} />;
        case 'brokers':
          // Handle broker navigation
          if (brokerView === 'details' && selectedBroker) {
            return (
              <BrokerDetailsPage
                broker={selectedBroker}
                onBack={handleBackToBrokersList}
                onVersionChange={handleBrokerVersionChange}
              />
            );
          }
          return <BrokersPage onViewBroker={handleViewBroker} />;
        case 'client-assignment':
          return <ClientBrokerBindingPageWrapper />;
        case 'quote-ranges':
          return <QuotationRangesPageWrapper />;
        case 'leasing-objects-settings':
          return <LeasingObjectsSettingsPageWrapper />;
        case 'additional-products':
          return <PlaceholderPage title="Доп. продукты" />;
        case 'print-forms':
          return <PlaceholderPage title="Печатные формы" />;
        case 'reports':
          return <PlaceholderPage title="Отчеты" />;
        default:
          return <LeasingCompaniesPage onViewLeasingCompany={handleViewLeasingCompany} />;
      }
    }

    // Handle tech admin role menu items
    if (currentRole === ROLE_IDS.TECH_ADMIN) {
      switch (activeMenuItem) {
        case 'users':
          return <UsersPage />;
        case 'integrations':
          return <IntegrationsPage />;
        case 'templates':
          // Handle templates navigation
          if (templatesView === 'edit' && selectedTemplateCollection) {
            return (
              <TemplateEditPage
                collection={selectedTemplateCollection}
                templates={selectedTemplateCollection.id === 'new' ? [] : templates}
                onSave={handleSaveTemplates}
                onCancel={handleCancelTemplates}
              />
            );
          }
          return (
            <TemplatesPage
              collections={templateCollectionsData}
              onAddCollection={handleAddTemplateCollection}
              onEditCollection={handleEditTemplateCollection}
              onDeleteCollection={handleDeleteTemplateCollection}
            />
          );
        case 'settings':
          return <PlaceholderPage title="Настройки" />;
        default:
          return <UsersPage />;
      }
    }

    // Fallback
    return <PlaceholderPage title="Неизвестный раздел" />;
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <LoginPage
        loginData={loginData}
        loading={loading}
        onLoginDataChange={setLoginData}
        onLogin={handleLogin}
      />
    );
  }

  // Render with layout
  return (
    <Layout
      currentRole={currentRole}
      activeMenuItem={activeMenuItem}
      username={loginData.username}
      onRoleChange={handleRoleChange}
      onMenuItemClick={handleMenuItemClick}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default RoleBasedApp;