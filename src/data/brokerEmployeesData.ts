import type { BrokerEmployee } from '../types/brokers';

// Mock broker employees data
export const mockBrokerEmployees: BrokerEmployee[] = [
  {
    id: 'emp-1',
    fullName: 'Иванов Иван Иванович',
    login: 'i.ivanov',
    role: 'Руководитель брокера',
    status: 'Активен',
    activeDealsCount: 15
  },
  {
    id: 'emp-2',
    fullName: 'Петрова Анна Сергеевна',
    login: 'a.petrova',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 8
  },
  {
    id: 'emp-3',
    fullName: 'Сидоров Михаил Александрович',
    login: 'm.sidorov',
    role: 'Брокер',
    status: 'Ожидает активации',
    activeDealsCount: 0
  },
  {
    id: 'emp-4',
    fullName: 'Козлова Елена Владимировна',
    login: 'e.kozlova',
    role: 'Бизнес-администратор',
    status: 'Активен',
    activeDealsCount: 3
  },
  {
    id: 'emp-5',
    fullName: 'Новиков Дмитрий Петрович',
    login: 'd.novikov',
    role: 'Брокер',
    status: 'Ожидает активации',
    activeDealsCount: 0
  },
  {
    id: 'emp-6',
    fullName: 'Морозова Ольга Игоревна',
    login: 'o.morozova',
    role: 'Технический администратор',
    status: 'Активен',
    activeDealsCount: 1
  },
  {
    id: 'emp-7',
    fullName: 'Волков Алексей Николаевич',
    login: 'a.volkov',
    role: 'Брокер',
    status: 'Активен',
    activeDealsCount: 12
  },
  {
    id: 'emp-8',
    fullName: 'Соколова Мария Дмитриевна',
    login: 'm.sokolova',
    role: 'Брокер',
    status: 'Ожидает активации',
    activeDealsCount: 0
  }
];

// Utility functions for broker employees data access
export const getBrokerEmployees = (brokerId: string): BrokerEmployee[] => {
  // In a real application, this would filter by brokerId
  // For now, return all employees
  console.log(`Getting employees for broker ${brokerId}`);
  return mockBrokerEmployees;
};

export const getBrokerEmployeeById = (brokerId: string, employeeId: string): BrokerEmployee | undefined => {
  const employees = getBrokerEmployees(brokerId);
  return employees.find(emp => emp.id === employeeId);
};

export const approveBrokerEmployee = (brokerId: string, employeeId: string): boolean => {
  // In a real application, this would make an API call
  // For now, just return true to simulate success
  console.log(`Approving employee ${employeeId} for broker ${brokerId}`);
  return true;
};

export const rejectBrokerEmployee = (brokerId: string, employeeId: string): boolean => {
  // In a real application, this would make an API call
  // For now, just return true to simulate success
  console.log(`Rejecting employee ${employeeId} for broker ${brokerId}`);
  return true;
};
