import type { Broker } from '../types/brokers';

// Mock brokers data with realistic broker company information and version data
export const mockBrokers: Broker[] = [
  {
    id: 'br-1',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Альфа-Брокер"',
    inn: '7701234567',
    dealsCount: 127,
    totalCommission: 2850000,
    successRate: 94.5,
    averageDealSize: 2500000,
    version: {
      id: 'br-1-v2',
      number: 2,
      startDate: '2024-01-01',
      endDate: undefined, // Current active version
      status: 'active',
      previousVersionId: 'br-1-v1',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Альфа-Брокер"',
      inn: '7701234567',
      kpp: '770101001',
      ogrn: '1027700123456',
      address: 'г. Москва, ул. Тверская, д. 15, оф. 201',
      phone: '+7 (495) 123-45-67',
      email: 'info@alfa-broker.ru',
      directorName: 'Петров Петр Петрович',
      foundationDate: '2018-03-15',
      licenseNumber: 'БР-001234',
      licenseDate: '2018-04-01',
      licenseExpiryDate: '2028-04-01',
      specialization: 'Автомобильный лизинг',
      experience: 6,
      rating: 4.8
    },
    documents: [
      {
        id: 'doc-1',
        type: 'broker_license',
        title: 'Лицензия на осуществление брокерской деятельности',
        fields: {
          number: 'БР-001234',
          issueDate: '2018-04-01',
          expiryDate: '2028-04-01',
          issuer: 'Центральный банк Российской Федерации',
          activityType: 'Лизинговый брокер'
        },
        issueDate: '2018-04-01',
        expiryDate: '2028-04-01'
      },
      {
        id: 'doc-2',
        type: 'charter',
        title: 'Устав общества',
        fields: {
          version: '1.3',
          registrationDate: '2018-03-15',
          changesDate: '2023-09-10'
        },
        issueDate: '2018-03-15'
      },
      {
        id: 'doc-3',
        type: 'certificate',
        title: 'Сертификат соответствия стандартам качества',
        fields: {
          certificateNumber: 'СЕРТ-2023-001',
          standard: 'ISO 9001:2015',
          issueDate: '2023-06-15',
          expiryDate: '2026-06-15'
        },
        issueDate: '2023-06-15',
        expiryDate: '2026-06-15'
      }
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'Лицензия брокера.pdf',
        type: 'application/pdf',
        size: 1024768,
        uploadDate: '2024-01-15T10:30:00Z',
        url: '/mock-files/alfa-broker-license.pdf'
      },
      {
        id: 'att-2',
        name: 'Устав ООО Альфа-Брокер.pdf',
        type: 'application/pdf',
        size: 2048576,
        uploadDate: '2024-01-15T10:35:00Z',
        url: '/mock-files/alfa-broker-charter.pdf'
      },
      {
        id: 'att-3',
        name: 'Сертификат ISO 9001.pdf',
        type: 'application/pdf',
        size: 1536000,
        uploadDate: '2024-02-01T14:20:00Z',
        url: '/mock-files/alfa-broker-certificate.pdf'
      }
    ]
  },
  {
    id: 'br-2',
    opf: 'АО',
    fullName: 'Акционерное общество "Бета-Консалт"',
    inn: '7702345678',
    dealsCount: 89,
    totalCommission: 1980000,
    successRate: 91.2,
    averageDealSize: 3200000,
    version: {
      id: 'br-2-v1',
      number: 1,
      startDate: '2023-06-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Акционерное общество "Бета-Консалт"',
      inn: '7702345678',
      kpp: '770201001',
      ogrn: '1027700234567',
      address: 'г. Москва, ул. Арбат, д. 25, оф. 150',
      phone: '+7 (495) 234-56-78',
      email: 'contact@beta-consult.ru',
      directorName: 'Сидорова Анна Владимировна',
      foundationDate: '2020-08-20',
      licenseNumber: 'БР-002345',
      licenseDate: '2020-09-01',
      licenseExpiryDate: '2025-09-01',
      specialization: 'Оборудование и недвижимость',
      experience: 4,
      rating: 4.6
    },
    documents: [
      {
        id: 'doc-4',
        type: 'broker_license',
        title: 'Лицензия на осуществление брокерской деятельности',
        fields: {
          number: 'БР-002345',
          issueDate: '2020-09-01',
          expiryDate: '2025-09-01',
          issuer: 'Центральный банк Российской Федерации',
          activityType: 'Лизинговый брокер'
        },
        issueDate: '2020-09-01',
        expiryDate: '2025-09-01'
      },
      {
        id: 'doc-5',
        type: 'financial_report',
        title: 'Финансовая отчетность за 2023 год',
        fields: {
          revenue: 15000000,
          profit: 3200000,
          reportDate: '2024-03-31',
          auditor: 'ООО "Аудиторская фирма Бета"'
        },
        issueDate: '2024-03-31'
      }
    ],
    attachments: [
      {
        id: 'att-4',
        name: 'Лицензия Бета-Консалт.pdf',
        type: 'application/pdf',
        size: 987654,
        uploadDate: '2024-01-20T11:15:00Z',
        url: '/mock-files/beta-consult-license.pdf'
      },
      {
        id: 'att-5',
        name: 'Устав АО Бета-Консалт.pdf',
        type: 'application/pdf',
        size: 1876543,
        uploadDate: '2024-01-20T11:20:00Z',
        url: '/mock-files/beta-consult-charter.pdf'
      },
      {
        id: 'att-6',
        name: 'Финансовая отчетность 2023.pdf',
        type: 'application/pdf',
        size: 2345678,
        uploadDate: '2024-04-01T09:00:00Z',
        url: '/mock-files/beta-consult-financial-2023.pdf'
      }
    ]
  },
  {
    id: 'br-3',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Гамма-Финанс"',
    inn: '7703456789',
    dealsCount: 156,
    totalCommission: 4200000,
    successRate: 96.8,
    averageDealSize: 1800000,
    version: {
      id: 'br-3-v3',
      number: 3,
      startDate: '2024-03-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: 'br-3-v2',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Гамма-Финанс"',
      inn: '7703456789',
      kpp: '770301001',
      ogrn: '1027700345678',
      address: 'г. Москва, ул. Красная Площадь, д. 1, оф. 300',
      phone: '+7 (495) 345-67-89',
      email: 'info@gamma-finance.ru',
      directorName: 'Козлов Михаил Александрович',
      foundationDate: '2015-12-01',
      licenseNumber: 'БР-003456',
      licenseDate: '2016-01-15',
      licenseExpiryDate: '2031-01-15',
      specialization: 'Универсальный лизинг',
      experience: 8,
      rating: 4.9
    },
    documents: [
      {
        id: 'doc-6',
        type: 'broker_license',
        title: 'Лицензия на осуществление брокерской деятельности',
        fields: {
          number: 'БР-003456',
          issueDate: '2016-01-15',
          expiryDate: '2031-01-15',
          issuer: 'Центральный банк Российской Федерации',
          activityType: 'Лизинговый брокер'
        },
        issueDate: '2016-01-15',
        expiryDate: '2031-01-15'
      },
      {
        id: 'doc-7',
        type: 'certificate',
        title: 'Сертификат профессионального участника рынка',
        fields: {
          certificateNumber: 'ПРОФ-2024-003',
          issueDate: '2024-01-15',
          expiryDate: '2027-01-15',
          issuingOrganization: 'Национальная ассоциация лизинговых компаний'
        },
        issueDate: '2024-01-15',
        expiryDate: '2027-01-15'
      }
    ],
    attachments: [
      {
        id: 'att-7',
        name: 'Лицензия Гамма-Финанс.pdf',
        type: 'application/pdf',
        size: 1234567,
        uploadDate: '2024-03-01T09:00:00Z',
        url: '/mock-files/gamma-finance-license.pdf'
      },
      {
        id: 'att-8',
        name: 'Устав ООО Гамма-Финанс.pdf',
        type: 'application/pdf',
        size: 2567890,
        uploadDate: '2024-03-01T09:05:00Z',
        url: '/mock-files/gamma-finance-charter.pdf'
      },
      {
        id: 'att-9',
        name: 'Сертификат профессионального участника.pdf',
        type: 'application/pdf',
        size: 987654,
        uploadDate: '2024-01-15T14:30:00Z',
        url: '/mock-files/gamma-finance-certificate.pdf'
      }
    ]
  },
  {
    id: 'br-4',
    opf: 'ИП',
    fullName: 'Индивидуальный предприниматель Дельта-Лизинг',
    inn: '7704567890',
    dealsCount: 34,
    totalCommission: 680000,
    successRate: 88.2,
    averageDealSize: 1200000,
    version: {
      id: 'br-4-v1',
      number: 1,
      startDate: '2024-01-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Индивидуальный предприниматель Дельта-Лизинг',
      inn: '7704567890',
      kpp: '770401001',
      ogrn: '1027700456789',
      address: 'г. Санкт-Петербург, Невский проспект, д. 50, оф. 25',
      phone: '+7 (812) 456-78-90',
      email: 'info@delta-leasing.ru',
      directorName: 'Новикова Елена Игоревна',
      foundationDate: '2022-05-10',
      licenseNumber: 'БР-004567',
      licenseDate: '2022-06-01',
      licenseExpiryDate: '2027-06-01',
      specialization: 'Малый и средний бизнес',
      experience: 2,
      rating: 4.2
    },
    documents: [
      {
        id: 'doc-8',
        type: 'broker_license',
        title: 'Лицензия на осуществление брокерской деятельности',
        fields: {
          number: 'БР-004567',
          issueDate: '2022-06-01',
          expiryDate: '2027-06-01',
          issuer: 'Центральный банк Российской Федерации',
          activityType: 'Лизинговый брокер'
        },
        issueDate: '2022-06-01',
        expiryDate: '2027-06-01'
      },
      {
        id: 'doc-9',
        type: 'registration',
        title: 'Свидетельство о государственной регистрации ИП',
        fields: {
          registrationNumber: '770456789012345',
          registrationDate: '2022-05-10',
          registrationAuthority: 'Инспекция ФНС России'
        },
        issueDate: '2022-05-10'
      }
    ],
    attachments: [
      {
        id: 'att-10',
        name: 'Лицензия Дельта-Лизинг.pdf',
        type: 'application/pdf',
        size: 876543,
        uploadDate: '2024-01-25T13:45:00Z',
        url: '/mock-files/delta-leasing-license.pdf'
      },
      {
        id: 'att-11',
        name: 'Свидетельство ИП.pdf',
        type: 'application/pdf',
        size: 654321,
        uploadDate: '2024-01-25T13:50:00Z',
        url: '/mock-files/delta-leasing-registration.pdf'
      }
    ]
  },
  {
    id: 'br-5',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Эпсилон-Партнер"',
    inn: '7705678901',
    dealsCount: 203,
    totalCommission: 5200000,
    successRate: 95.1,
    averageDealSize: 2100000,
    version: {
      id: 'br-5-v2',
      number: 2,
      startDate: '2023-11-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: 'br-5-v1',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Эпсилон-Партнер"',
      inn: '7705678901',
      kpp: '770501001',
      ogrn: '1027700567890',
      address: 'г. Москва, ул. Ленинский проспект, д. 100, оф. 500',
      phone: '+7 (495) 567-89-01',
      email: 'contact@epsilon-partner.ru',
      directorName: 'Смирнов Алексей Викторович',
      foundationDate: '2017-09-12',
      licenseNumber: 'БР-005678',
      licenseDate: '2017-10-01',
      licenseExpiryDate: '2027-10-01',
      specialization: 'Крупный бизнес и корпорации',
      experience: 7,
      rating: 4.7
    },
    documents: [
      {
        id: 'doc-10',
        type: 'broker_license',
        title: 'Лицензия на осуществление брокерской деятельности',
        fields: {
          number: 'БР-005678',
          issueDate: '2017-10-01',
          expiryDate: '2027-10-01',
          issuer: 'Центральный банк Российской Федерации',
          activityType: 'Лизинговый брокер'
        },
        issueDate: '2017-10-01',
        expiryDate: '2027-10-01'
      },
      {
        id: 'doc-11',
        type: 'bank_statement',
        title: 'Справка о состоянии расчетного счета',
        fields: {
          bank: 'ПАО "ВТБ"',
          accountNumber: '40702810123456789012',
          balance: 25000000,
          currency: 'RUB'
        },
        issueDate: '2024-01-01'
      }
    ],
    attachments: [
      {
        id: 'att-12',
        name: 'Лицензия Эпсилон-Партнер.pdf',
        type: 'application/pdf',
        size: 1123456,
        uploadDate: '2024-02-10T10:20:00Z',
        url: '/mock-files/epsilon-partner-license.pdf'
      },
      {
        id: 'att-13',
        name: 'Устав ООО Эпсилон-Партнер.pdf',
        type: 'application/pdf',
        size: 2234567,
        uploadDate: '2024-02-10T10:25:00Z',
        url: '/mock-files/epsilon-partner-charter.pdf'
      },
      {
        id: 'att-14',
        name: 'Справка банка ВТБ.pdf',
        type: 'application/pdf',
        size: 456789,
        uploadDate: '2024-02-15T16:00:00Z',
        url: '/mock-files/epsilon-partner-bank-statement.pdf'
      }
    ]
  }
];

// Previous versions for version navigation
export const brokerVersions: Record<string, Broker> = {
  'br-1-v1': {
    ...mockBrokers[0],
    version: {
      id: 'br-1-v1',
      number: 1,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'archived',
      previousVersionId: undefined,
      nextVersionId: 'br-1-v2'
    },
    requisites: {
      ...mockBrokers[0].requisites,
      phone: '+7 (495) 111-22-33', // Different phone in previous version
      email: 'old@alfa-broker.ru', // Different email in previous version
      address: 'г. Москва, ул. Старая, д. 1' // Different address in previous version
    }
  },
  'br-3-v2': {
    ...mockBrokers[2],
    version: {
      id: 'br-3-v2',
      number: 2,
      startDate: '2023-01-01',
      endDate: '2024-02-29',
      status: 'archived',
      previousVersionId: 'br-3-v1',
      nextVersionId: 'br-3-v3'
    },
    requisites: {
      ...mockBrokers[2].requisites,
      phone: '+7 (495) 333-44-55', // Different phone in previous version
      email: 'old@gamma-finance.ru' // Different email in previous version
    }
  },
  'br-5-v1': {
    ...mockBrokers[4],
    version: {
      id: 'br-5-v1',
      number: 1,
      startDate: '2023-01-01',
      endDate: '2023-10-31',
      status: 'archived',
      previousVersionId: undefined,
      nextVersionId: 'br-5-v2'
    },
    requisites: {
      ...mockBrokers[4].requisites,
      phone: '+7 (495) 555-66-77', // Different phone in previous version
      email: 'old@epsilon-partner.ru' // Different email in previous version
    }
  }
};

// Utility functions for brokers data access
export const getAllBrokers = (): Broker[] => {
  return mockBrokers;
};

export const getBrokerById = (id: string): Broker | undefined => {
  return mockBrokers.find(broker => broker.id === id);
};

export const getBrokerWithVersion = (id: string, versionId: string): Broker | undefined => {
  const broker = getBrokerById(id);
  if (!broker) return undefined;
  
  // If requesting current version, return the broker as is
  if (broker.version.id === versionId) {
    return broker;
  }
  
  // If requesting a specific version, return from versions
  return brokerVersions[versionId];
};

export const getBrokersByOpf = (opf: string): Broker[] => {
  return mockBrokers.filter(broker => broker.opf === opf);
};

export const getTotalDealsCount = (): number => {
  return mockBrokers.reduce((total, broker) => total + broker.dealsCount, 0);
};

export const getTotalCommission = (): number => {
  return mockBrokers.reduce((total, broker) => total + broker.totalCommission, 0);
};

export const getAverageSuccessRate = (): number => {
  const totalRate = mockBrokers.reduce((total, broker) => total + broker.successRate, 0);
  return totalRate / mockBrokers.length;
};

export const createEmptyBroker = (): Broker => {
  const now = new Date().toISOString().split('T')[0];
  const id = `br-new-${Date.now()}`;

  return {
    id,
    opf: '',
    fullName: '',
    inn: '',
    dealsCount: 0,
    totalCommission: 0,
    successRate: 0,
    averageDealSize: 0,
    version: {
      id: `${id}-v1`,
      number: 1,
      startDate: now,
      endDate: undefined,
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: '',
      inn: '',
      kpp: '',
      ogrn: '',
      address: '',
      phone: '',
      email: '',
      directorName: '',
      foundationDate: '',
      licenseNumber: '',
      licenseDate: '',
      licenseExpiryDate: '',
      specialization: '',
      experience: 0,
      rating: 0
    },
    documents: [],
    attachments: []
  };
};