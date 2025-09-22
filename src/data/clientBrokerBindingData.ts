import type { ClientBrokerBindingRule } from '../types/clientBrokerBinding';

// Mock data for client-broker binding rules
export const clientBrokerBindingRules: ClientBrokerBindingRule[] = [
  {
    id: '1',
    leasingCompanyId: 'lc-1',
    leasingCompanyName: 'ООО "Альфа-Лизинг"',
    clientInn: '7701234567',
    brokerId: 'broker-1',
    brokerName: 'ООО "Бета-Брокер"',
    restriction: 'allow',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-15',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    leasingCompanyId: 'lc-2',
    leasingCompanyName: 'ООО "Гамма-Лизинг"',
    clientInn: '7702345678',
    brokerId: 'broker-2',
    brokerName: 'ООО "Дельта-Брокер"',
    restriction: 'deny',
    version: {
      id: 'v2',
      number: 1,
      status: 'active',
      startDate: '2024-01-20',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    leasingCompanyId: 'lc-1',
    leasingCompanyName: 'ООО "Альфа-Лизинг"',
    clientInn: '7703456789',
    brokerId: 'broker-3',
    brokerName: 'ООО "Эпсилон-Брокер"',
    restriction: 'allow',
    version: {
      id: 'v3',
      number: 1,
      status: 'active',
      startDate: '2024-02-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    leasingCompanyId: 'lc-3',
    leasingCompanyName: 'ООО "Омега-Лизинг"',
    clientInn: '7704567890',
    brokerId: 'broker-1',
    brokerName: 'ООО "Бета-Брокер"',
    restriction: 'deny',
    version: {
      id: 'v4',
      number: 1,
      status: 'active',
      startDate: '2024-02-10',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    leasingCompanyId: 'lc-2',
    leasingCompanyName: 'ООО "Гамма-Лизинг"',
    clientInn: '7705678901',
    brokerId: 'broker-4',
    brokerName: 'ООО "Зета-Брокер"',
    restriction: 'allow',
    version: {
      id: 'v5',
      number: 1,
      status: 'active',
      startDate: '2024-02-15',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    createdAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-15T11:20:00Z'
  }
];
