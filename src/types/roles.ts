// Role identifiers as constants
export const ROLE_IDS = {
  BROKER: 'broker',
  BROKER_MANAGER: 'broker-manager',
  BUSINESS_ADMIN: 'business-admin',
  TECH_ADMIN: 'tech-admin'
} as const;

// Type for role identifiers
export type RoleId = typeof ROLE_IDS[keyof typeof ROLE_IDS];

// Interface for menu items
export interface MenuItem {
  id: string;
  label: string;
  path: string;
}

// Interface for role type
export interface RoleType {
  id: RoleId;
  name: string;
  menuItems: MenuItem[];
}

// Menu configuration for each role
export const MENU_CONFIG: Record<RoleId, MenuItem[]> = {
  [ROLE_IDS.BROKER]: [
    { id: 'deals', label: 'Сделки', path: '/deals' },
    { id: 'clients', label: 'Клиенты', path: '/clients' }
  ],
  [ROLE_IDS.BROKER_MANAGER]: [
    { id: 'deals', label: 'Сделки', path: '/deals' },
    { id: 'clients', label: 'Клиенты', path: '/clients' },
    { id: 'reports', label: 'Отчеты', path: '/reports' },
    { id: 'organization', label: 'Моя организация', path: '/organization' }
  ],
  [ROLE_IDS.BUSINESS_ADMIN]: [
    { id: 'leasing-companies', label: 'Лизинговые компании', path: '/leasing-companies' },
    { id: 'brokers', label: 'Брокеры', path: '/brokers' },
    { id: 'client-assignment', label: 'Закрепление клиентов за брокерами в привязке к ЛК', path: '/client-assignment' },
    { id: 'quote-ranges', label: 'Диапазоны котировок', path: '/quote-ranges' },
    { id: 'additional-products', label: 'Доп. продукты', path: '/additional-products' },
    { id: 'print-forms', label: 'Печатные формы', path: '/print-forms' },
    { id: 'reports', label: 'Отчеты', path: '/reports' }
  ],
  [ROLE_IDS.TECH_ADMIN]: [
    { id: 'users', label: 'Пользователи', path: '/users' },
    { id: 'integrations', label: 'Интеграции', path: '/integrations' },
    { id: 'templates', label: 'Шаблоны', path: '/templates' },
    { id: 'settings', label: 'Настройки', path: '/settings' }
  ]
};

// Available roles configuration
export const ROLES: RoleType[] = [
  {
    id: ROLE_IDS.BROKER,
    name: 'Брокер',
    menuItems: MENU_CONFIG[ROLE_IDS.BROKER]
  },
  {
    id: ROLE_IDS.BROKER_MANAGER,
    name: 'Руководитель брокера',
    menuItems: MENU_CONFIG[ROLE_IDS.BROKER_MANAGER]
  },
  {
    id: ROLE_IDS.BUSINESS_ADMIN,
    name: 'Бизнес-администратор',
    menuItems: MENU_CONFIG[ROLE_IDS.BUSINESS_ADMIN]
  },
  {
    id: ROLE_IDS.TECH_ADMIN,
    name: 'Технический администратор',
    menuItems: MENU_CONFIG[ROLE_IDS.TECH_ADMIN]
  }
];

// Default role
export const DEFAULT_ROLE: RoleId = ROLE_IDS.BROKER;