import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import DealsPage from '../pages/DealsPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';
import type { RoleId } from '../types/roles';
import type { LoginData } from '../types';
import { ROLE_IDS, MENU_CONFIG } from '../types/roles';
import { getSavedRole } from '../ui/RoleSelector';

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
  };

  // Render content based on active menu item and role
  const renderContent = () => {
    // Handle broker role menu items
    if (currentRole === ROLE_IDS.BROKER) {
      switch (activeMenuItem) {
        case 'deals':
          return <DealsPage />;
        case 'clients':
          return <PlaceholderPage title="Клиенты" />;
        case 'reports':
          return <PlaceholderPage title="Отчеты" />;
        case 'organization':
          return <PlaceholderPage title="Моя организация" />;
        default:
          return <DealsPage />;
      }
    }

    // Handle business admin role menu items
    if (currentRole === ROLE_IDS.BUSINESS_ADMIN) {
      switch (activeMenuItem) {
        case 'leasing-companies':
          return <PlaceholderPage title="Лизинговые компании" />;
        case 'client-assignment':
          return <PlaceholderPage title="Закрепление клиентов за брокерами в привязке к ЛК" />;
        case 'quote-ranges':
          return <PlaceholderPage title="Диапазоны котировок" />;
        case 'org-settings':
          return <PlaceholderPage title="Настройка организаций" />;
        case 'print-forms':
          return <PlaceholderPage title="Печатные формы" />;
        case 'reports':
          return <PlaceholderPage title="Отчеты" />;
        default:
          return <PlaceholderPage title="Лизинговые компании" />;
      }
    }

    // Handle tech admin role menu items
    if (currentRole === ROLE_IDS.TECH_ADMIN) {
      switch (activeMenuItem) {
        case 'users':
          return <PlaceholderPage title="Пользователи" />;
        case 'integrations':
          return <PlaceholderPage title="Интеграции" />;
        case 'templates':
          return <PlaceholderPage title="Шаблоны" />;
        case 'settings':
          return <PlaceholderPage title="Настройки" />;
        default:
          return <PlaceholderPage title="Пользователи" />;
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