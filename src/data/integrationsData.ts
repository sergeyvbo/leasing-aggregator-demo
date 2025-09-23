import type { Integration } from '../types/integrations';

// Mock integrations data
const integrationsData: Integration[] = [
  {
    id: 1,
    name: 'Автоданные API v2.1',
    isActive: true,
    lastRunDate: '2024-01-15T10:30:00Z',
    description: 'Интеграция с сервисом Автоданные для получения информации об автомобилях по VIN-коду',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'ФНС ЕГРЮЛ/ЕГРИП',
    isActive: true,
    lastRunDate: '2024-01-14T15:45:00Z',
    description: 'Интеграция с сервисом ФНС для получения данных об организациях по ИНН',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    name: 'Контур.Фокус API',
    isActive: false,
    lastRunDate: '2024-01-10T09:20:00Z',
    description: 'Комбинированная интеграция для получения данных об автомобилях и организациях',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-10T09:20:00Z'
  },
  {
    id: 4,
    name: 'Сбербанк Бизнес Онлайн',
    isActive: true,
    lastRunDate: '2024-01-13T14:15:00Z',
    description: 'Интеграция с банковским сервисом для проверки данных организации',
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-13T14:15:00Z'
  },
  {
    id: 5,
    name: 'Dadata.ru API',
    isActive: false,
    lastRunDate: null,
    description: 'Тестовая интеграция для разработки и отладки',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 6,
    name: 'ГИБДД Проверка ТС',
    isActive: true,
    lastRunDate: '2024-01-16T08:20:00Z',
    description: 'Интеграция с базой данных ГИБДД для проверки транспортных средств',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-16T08:20:00Z'
  },
  {
    id: 7,
    name: 'Росреестр API',
    isActive: true,
    lastRunDate: '2024-01-12T11:30:00Z',
    description: 'Интеграция с Росреестром для получения данных о недвижимости',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-12T11:30:00Z'
  },
  {
    id: 8,
    name: '1C:Предприятие 8.3',
    isActive: false,
    lastRunDate: '2024-01-08T16:45:00Z',
    description: 'Интеграция с системой 1C для синхронизации данных',
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-08T16:45:00Z'
  }
];

// CRUD operations
export const getAllIntegrations = (): Integration[] => {
  return [...integrationsData];
};

export const getIntegrationById = (id: number): Integration | undefined => {
  return integrationsData.find(integration => integration.id === id);
};

export const createIntegration = (integrationData: Omit<Integration, 'id' | 'createdAt' | 'updatedAt'>): Integration => {
  const newIntegration: Integration = {
    ...integrationData,
    id: Math.max(...integrationsData.map(i => i.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  integrationsData.push(newIntegration);
  return newIntegration;
};

export const updateIntegration = (id: number, integrationData: Partial<Integration>): Integration | null => {
  const index = integrationsData.findIndex(integration => integration.id === id);
  if (index === -1) return null;
  
  const updatedIntegration: Integration = {
    ...integrationsData[index],
    ...integrationData,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  integrationsData[index] = updatedIntegration;
  return updatedIntegration;
};

export const deleteIntegration = (id: number): boolean => {
  const index = integrationsData.findIndex(integration => integration.id === id);
  if (index === -1) return false;
  
  integrationsData.splice(index, 1);
  return true;
};
