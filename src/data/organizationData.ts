import type { Organization, Employee, EmployeeRole, EmployeeStatus } from '../types/organization';

// Mock organization data with realistic company information and version data
export const mockOrganization: Organization = {
  id: 'org-1',
  opf: 'ООО',
  fullName: 'Общество с ограниченной ответственностью "БрокерЛизинг"',
  inn: '7701234567',
  version: {
    id: 'org-v1-2',
    number: 2,
    startDate: '2024-09-01',
    endDate: undefined, // Current active version
    status: 'active',
    previousVersionId: 'org-v1-1',
    nextVersionId: undefined
  },
  requisites: {
    fullName: 'Общество с ограниченной ответственностью "БрокерЛизинг"',
    inn: '7701234567',
    kpp: '770101001',
    ogrn: '1027700123456',
    address: 'г. Москва, ул. Тверская, д. 1, оф. 100',
    phone: '+7 (495) 123-45-67',
    email: 'info@brokerleasing.ru',
    directorName: 'Иванов Иван Иванович',
    foundationDate: '2020-03-15'
  },
  attachments: [
    {
      id: 'att-1',
      name: 'Устав организации.pdf',
      type: 'application/pdf',
      size: 2048576,
      uploadDate: '2024-01-15T10:30:00Z',
      url: '/mock-files/charter.pdf'
    },
    {
      id: 'att-2',
      name: 'Свидетельство о регистрации.pdf',
      type: 'application/pdf',
      size: 1024768,
      uploadDate: '2024-01-15T10:35:00Z',
      url: '/mock-files/registration.pdf'
    },
    {
      id: 'att-3',
      name: 'Справка из налоговой.pdf',
      type: 'application/pdf',
      size: 512384,
      uploadDate: '2024-02-01T14:20:00Z',
      url: '/mock-files/tax-certificate.pdf'
    },
    {
      id: 'att-4',
      name: 'Лицензия на деятельность.pdf',
      type: 'application/pdf',
      size: 768432,
      uploadDate: '2024-03-10T09:15:00Z',
      url: '/mock-files/license.pdf'
    },
    {
      id: 'att-5',
      name: 'Банковские реквизиты.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 245760,
      uploadDate: '2024-04-05T16:45:00Z',
      url: '/mock-files/bank-details.docx'
    }
  ]
};

// Mock employee data array including current user identification
export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    fullName: 'Петров Петр Петрович',
    login: 'petrov',
    role: 'Руководитель брокера',
    status: 'Активен',
    activeDealsCount: 15,
    isCurrentUser: true // Current logged-in user
  },
  {
    id: 'emp-2',
    fullName: 'Сидорова Анна Владимировна',
    login: 'sidorova',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 8
  },
  {
    id: 'emp-3',
    fullName: 'Козлов Михаил Александрович',
    login: 'kozlov',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 3
  },
  {
    id: 'emp-4',
    fullName: 'Новикова Елена Игоревна',
    login: 'novikova',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 0
  },
  {
    id: 'emp-5',
    fullName: 'Смирнов Алексей Викторович',
    login: 'smirnov',
    role: 'Брокер',
    status: 'Ожидает активации',
    activeDealsCount: 0
  },
  {
    id: 'emp-6',
    fullName: 'Васильева Ольга Дмитриевна',
    login: 'vasilieva',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 12
  },
  {
    id: 'emp-7',
    fullName: 'Морозов Сергей Николаевич',
    login: 'morozov',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 5
  },
  {
    id: 'emp-8',
    fullName: 'Федорова Мария Андреевна',
    login: 'fedorova',
    role: 'Брокер',
    status: 'Ожидает активации',
    activeDealsCount: 0
  }
];

// Previous version of organization for version navigation
export const organizationVersions: Record<string, Organization> = {
  'org-v1-1': {
    ...mockOrganization,
    version: {
      id: 'org-v1-1',
      number: 1,
      startDate: '2024-01-01',
      endDate: '2024-08-31', // Archived version
      status: 'archived',
      previousVersionId: undefined,
      nextVersionId: 'org-v1-2'
    },
    requisites: {
      ...mockOrganization.requisites,
      phone: '+7 (495) 111-22-33', // Different phone in previous version
      email: 'contact@brokerleasing.ru', // Different email in previous version
      address: 'г. Москва, ул. Арбат, д. 25, оф. 50' // Different address in previous version
    },
    attachments: [
      {
        id: 'att-1',
        name: 'Устав организации.pdf',
        type: 'application/pdf',
        size: 2048576,
        uploadDate: '2024-01-15T10:30:00Z',
        url: '/mock-files/charter.pdf'
      },
      {
        id: 'att-2',
        name: 'Свидетельство о регистрации.pdf',
        type: 'application/pdf',
        size: 1024768,
        uploadDate: '2024-01-15T10:35:00Z',
        url: '/mock-files/registration.pdf'
      }
    ]
  },
  'org-v1-2': mockOrganization // Current version
};

// Utility functions for organization data access
export const getOrganization = (): Organization => {
  return mockOrganization;
};

export const getOrganizationByVersionId = (versionId: string): Organization | undefined => {
  return organizationVersions[versionId];
};

export const getAllEmployees = (): Employee[] => {
  return mockEmployees;
};

export const getCurrentUser = (): Employee | undefined => {
  return mockEmployees.find(employee => employee.isCurrentUser);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === id);
};

// Function to get employees by role
export const getEmployeesByRole = (role: EmployeeRole): Employee[] => {
  return mockEmployees.filter(employee => employee.role === role);
};

// Function to get employees by status
export const getEmployeesByStatus = (status: EmployeeStatus): Employee[] => {
  return mockEmployees.filter(employee => employee.status === status);
};

// Function to get active employees count
export const getActiveEmployeesCount = (): number => {
  return mockEmployees.filter(employee => employee.status === 'Активен').length;
};

// Function to get total active deals count across all employees
export const getTotalActiveDealsCount = (): number => {
  return mockEmployees.reduce((total, employee) => total + employee.activeDealsCount, 0);
};