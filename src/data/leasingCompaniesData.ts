import type { LeasingCompany } from '../types/leasingCompanies';

// Mock leasing companies data with realistic company information and version data
export const mockLeasingCompanies: LeasingCompany[] = [
  {
    id: 'lc-1',
    opf: 'АО',
    fullName: 'Акционерное общество "Альфа-Лизинг"',
    inn: '7701234567',
    dealsCount: 45,
    totalCommission: 1250000,
    version: {
      id: 'lc-1-v2',
      number: 2,
      startDate: '2024-01-01',
      endDate: undefined, // Current active version
      status: 'active',
      previousVersionId: 'lc-1-v1',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Акционерное общество "Альфа-Лизинг"',
      inn: '7701234567',
      kpp: '770101001',
      ogrn: '1027700123456',
      address: 'г. Москва, ул. Тверская, д. 1, стр. 1',
      phone: '+7 (495) 123-45-67',
      email: 'info@alfa-leasing.ru',
      directorName: 'Петров Петр Петрович',
      foundationDate: '2015-03-15',
      licenseNumber: 'ЛЗ-001234',
      licenseDate: '2015-04-01',
      licenseExpiryDate: '2030-04-01'
    },
    documents: [
      {
        id: 'doc-1',
        type: 'license',
        title: 'Лицензия на осуществление лизинговой деятельности',
        fields: {
          number: 'ЛЗ-001234',
          issueDate: '2015-04-01',
          expiryDate: '2030-04-01',
          issuer: 'Центральный банк Российской Федерации'
        },
        issueDate: '2015-04-01',
        expiryDate: '2030-04-01'
      },
      {
        id: 'doc-2',
        type: 'charter',
        title: 'Устав общества',
        fields: {
          version: '2.1',
          registrationDate: '2020-01-15',
          changesDate: '2023-06-10'
        },
        issueDate: '2020-01-15'
      }
    ],
    attachments: [
      {
        id: 'att-1',
        name: 'Лицензия на лизинговую деятельность.pdf',
        type: 'application/pdf',
        size: 1024768,
        uploadDate: '2024-01-15T10:30:00Z',
        url: '/mock-files/alfa-license.pdf'
      },
      {
        id: 'att-2',
        name: 'Устав АО Альфа-Лизинг.pdf',
        type: 'application/pdf',
        size: 2048576,
        uploadDate: '2024-01-15T10:35:00Z',
        url: '/mock-files/alfa-charter.pdf'
      },
      {
        id: 'att-3',
        name: 'Финансовая отчетность 2023.pdf',
        type: 'application/pdf',
        size: 1536000,
        uploadDate: '2024-02-01T14:20:00Z',
        url: '/mock-files/alfa-financial-2023.pdf'
      }
    ]
  },
  {
    id: 'lc-2',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Бета-Лизинг"',
    inn: '7702345678',
    dealsCount: 32,
    totalCommission: 890000,
    version: {
      id: 'lc-2-v1',
      number: 1,
      startDate: '2023-06-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Бета-Лизинг"',
      inn: '7702345678',
      kpp: '770201001',
      ogrn: '1027700234567',
      address: 'г. Москва, ул. Арбат, д. 25, оф. 100',
      phone: '+7 (495) 234-56-78',
      email: 'contact@beta-leasing.ru',
      directorName: 'Сидорова Анна Владимировна',
      foundationDate: '2020-08-20',
      licenseNumber: 'ЛЗ-002345',
      licenseDate: '2020-09-01',
      licenseExpiryDate: '2025-09-01'
    },
    documents: [
      {
        id: 'doc-3',
        type: 'license',
        title: 'Лицензия на осуществление лизинговой деятельности',
        fields: {
          number: 'ЛЗ-002345',
          issueDate: '2020-09-01',
          expiryDate: '2025-09-01',
          issuer: 'Центральный банк Российской Федерации'
        },
        issueDate: '2020-09-01',
        expiryDate: '2025-09-01'
      }
    ],
    attachments: [
      {
        id: 'att-4',
        name: 'Лицензия Бета-Лизинг.pdf',
        type: 'application/pdf',
        size: 987654,
        uploadDate: '2024-01-20T11:15:00Z',
        url: '/mock-files/beta-license.pdf'
      },
      {
        id: 'att-5',
        name: 'Устав ООО Бета-Лизинг.pdf',
        type: 'application/pdf',
        size: 1876543,
        uploadDate: '2024-01-20T11:20:00Z',
        url: '/mock-files/beta-charter.pdf'
      }
    ]
  },
  {
    id: 'lc-3',
    opf: 'ПАО',
    fullName: 'Публичное акционерное общество "Гамма-Лизинг"',
    inn: '7703456789',
    dealsCount: 78,
    totalCommission: 2100000,
    version: {
      id: 'lc-3-v3',
      number: 3,
      startDate: '2024-03-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: 'lc-3-v2',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Публичное акционерное общество "Гамма-Лизинг"',
      inn: '7703456789',
      kpp: '770301001',
      ogrn: '1027700345678',
      address: 'г. Москва, ул. Красная Площадь, д. 1',
      phone: '+7 (495) 345-67-89',
      email: 'info@gamma-leasing.ru',
      directorName: 'Козлов Михаил Александрович',
      foundationDate: '2010-12-01',
      licenseNumber: 'ЛЗ-003456',
      licenseDate: '2011-01-15',
      licenseExpiryDate: '2031-01-15'
    },
    documents: [
      {
        id: 'doc-4',
        type: 'license',
        title: 'Лицензия на осуществление лизинговой деятельности',
        fields: {
          number: 'ЛЗ-003456',
          issueDate: '2011-01-15',
          expiryDate: '2031-01-15',
          issuer: 'Центральный банк Российской Федерации'
        },
        issueDate: '2011-01-15',
        expiryDate: '2031-01-15'
      },
      {
        id: 'doc-5',
        type: 'financial_report',
        title: 'Аудиторское заключение за 2023 год',
        fields: {
          auditor: 'ООО "Аудиторская фирма Альфа"',
          reportDate: '2024-03-15',
          opinion: 'Безоговорочно положительное'
        },
        issueDate: '2024-03-15'
      }
    ],
    attachments: [
      {
        id: 'att-6',
        name: 'Лицензия Гамма-Лизинг.pdf',
        type: 'application/pdf',
        size: 1234567,
        uploadDate: '2024-03-01T09:00:00Z',
        url: '/mock-files/gamma-license.pdf'
      },
      {
        id: 'att-7',
        name: 'Устав ПАО Гамма-Лизинг.pdf',
        type: 'application/pdf',
        size: 2567890,
        uploadDate: '2024-03-01T09:05:00Z',
        url: '/mock-files/gamma-charter.pdf'
      },
      {
        id: 'att-8',
        name: 'Аудиторское заключение 2023.pdf',
        type: 'application/pdf',
        size: 3456789,
        uploadDate: '2024-03-15T14:30:00Z',
        url: '/mock-files/gamma-audit-2023.pdf'
      }
    ]
  },
  {
    id: 'lc-4',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Дельта-Лизинг"',
    inn: '7704567890',
    dealsCount: 15,
    totalCommission: 420000,
    version: {
      id: 'lc-4-v1',
      number: 1,
      startDate: '2024-01-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Дельта-Лизинг"',
      inn: '7704567890',
      kpp: '770401001',
      ogrn: '1027700456789',
      address: 'г. Санкт-Петербург, Невский проспект, д. 50',
      phone: '+7 (812) 456-78-90',
      email: 'info@delta-leasing.ru',
      directorName: 'Новикова Елена Игоревна',
      foundationDate: '2022-05-10',
      licenseNumber: 'ЛЗ-004567',
      licenseDate: '2022-06-01',
      licenseExpiryDate: '2027-06-01'
    },
    documents: [
      {
        id: 'doc-6',
        type: 'license',
        title: 'Лицензия на осуществление лизинговой деятельности',
        fields: {
          number: 'ЛЗ-004567',
          issueDate: '2022-06-01',
          expiryDate: '2027-06-01',
          issuer: 'Центральный банк Российской Федерации'
        },
        issueDate: '2022-06-01',
        expiryDate: '2027-06-01'
      }
    ],
    attachments: [
      {
        id: 'att-9',
        name: 'Лицензия Дельта-Лизинг.pdf',
        type: 'application/pdf',
        size: 876543,
        uploadDate: '2024-01-25T13:45:00Z',
        url: '/mock-files/delta-license.pdf'
      },
      {
        id: 'att-10',
        name: 'Устав ООО Дельта-Лизинг.pdf',
        type: 'application/pdf',
        size: 1654321,
        uploadDate: '2024-01-25T13:50:00Z',
        url: '/mock-files/delta-charter.pdf'
      }
    ]
  },
  {
    id: 'lc-5',
    opf: 'АО',
    fullName: 'Акционерное общество "Эпсилон-Лизинг"',
    inn: '7705678901',
    dealsCount: 56,
    totalCommission: 1680000,
    version: {
      id: 'lc-5-v2',
      number: 2,
      startDate: '2023-11-01',
      endDate: undefined,
      status: 'active',
      previousVersionId: 'lc-5-v1',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Акционерное общество "Эпсилон-Лизинг"',
      inn: '7705678901',
      kpp: '770501001',
      ogrn: '1027700567890',
      address: 'г. Москва, ул. Ленинский проспект, д. 100',
      phone: '+7 (495) 567-89-01',
      email: 'contact@epsilon-leasing.ru',
      directorName: 'Смирнов Алексей Викторович',
      foundationDate: '2018-09-12',
      licenseNumber: 'ЛЗ-005678',
      licenseDate: '2018-10-01',
      licenseExpiryDate: '2028-10-01'
    },
    documents: [
      {
        id: 'doc-7',
        type: 'license',
        title: 'Лицензия на осуществление лизинговой деятельности',
        fields: {
          number: 'ЛЗ-005678',
          issueDate: '2018-10-01',
          expiryDate: '2028-10-01',
          issuer: 'Центральный банк Российской Федерации'
        },
        issueDate: '2018-10-01',
        expiryDate: '2028-10-01'
      },
      {
        id: 'doc-8',
        type: 'bank_statement',
        title: 'Справка о состоянии расчетного счета',
        fields: {
          bank: 'ПАО "Сбербанк"',
          accountNumber: '40702810123456789012',
          balance: 50000000,
          currency: 'RUB'
        },
        issueDate: '2024-01-01'
      }
    ],
    attachments: [
      {
        id: 'att-11',
        name: 'Лицензия Эпсилон-Лизинг.pdf',
        type: 'application/pdf',
        size: 1123456,
        uploadDate: '2024-02-10T10:20:00Z',
        url: '/mock-files/epsilon-license.pdf'
      },
      {
        id: 'att-12',
        name: 'Устав АО Эпсилон-Лизинг.pdf',
        type: 'application/pdf',
        size: 2234567,
        uploadDate: '2024-02-10T10:25:00Z',
        url: '/mock-files/epsilon-charter.pdf'
      },
      {
        id: 'att-13',
        name: 'Справка банка Сбербанк.pdf',
        type: 'application/pdf',
        size: 456789,
        uploadDate: '2024-02-15T16:00:00Z',
        url: '/mock-files/epsilon-bank-statement.pdf'
      }
    ]
  }
];

// Previous versions for version navigation
export const leasingCompanyVersions: Record<string, LeasingCompany> = {
  'lc-1-v1': {
    ...mockLeasingCompanies[0],
    version: {
      id: 'lc-1-v1',
      number: 1,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'archived',
      previousVersionId: undefined,
      nextVersionId: 'lc-1-v2'
    },
    requisites: {
      ...mockLeasingCompanies[0].requisites,
      phone: '+7 (495) 111-22-33', // Different phone in previous version
      email: 'old@alfa-leasing.ru', // Different email in previous version
      address: 'г. Москва, ул. Старая, д. 1' // Different address in previous version
    }
  },
  'lc-3-v2': {
    ...mockLeasingCompanies[2],
    version: {
      id: 'lc-3-v2',
      number: 2,
      startDate: '2023-01-01',
      endDate: '2024-02-29',
      status: 'archived',
      previousVersionId: 'lc-3-v1',
      nextVersionId: 'lc-3-v3'
    },
    requisites: {
      ...mockLeasingCompanies[2].requisites,
      phone: '+7 (495) 333-44-55', // Different phone in previous version
      email: 'old@gamma-leasing.ru' // Different email in previous version
    }
  },
  'lc-5-v1': {
    ...mockLeasingCompanies[4],
    version: {
      id: 'lc-5-v1',
      number: 1,
      startDate: '2023-01-01',
      endDate: '2023-10-31',
      status: 'archived',
      previousVersionId: undefined,
      nextVersionId: 'lc-5-v2'
    },
    requisites: {
      ...mockLeasingCompanies[4].requisites,
      phone: '+7 (495) 555-66-77', // Different phone in previous version
      email: 'old@epsilon-leasing.ru' // Different email in previous version
    }
  }
};

// Utility functions for leasing companies data access
export const getAllLeasingCompanies = (): LeasingCompany[] => {
  return mockLeasingCompanies;
};

export const getLeasingCompanyById = (id: string): LeasingCompany | undefined => {
  return mockLeasingCompanies.find(company => company.id === id);
};

export const getLeasingCompanyWithVersion = (id: string, versionId: string): LeasingCompany | undefined => {
  const company = getLeasingCompanyById(id);
  if (!company) return undefined;
  
  // If requesting current version, return the company as is
  if (company.version.id === versionId) {
    return company;
  }
  
  // If requesting a specific version, return from versions
  return leasingCompanyVersions[versionId];
};

export const getLeasingCompaniesByOpf = (opf: string): LeasingCompany[] => {
  return mockLeasingCompanies.filter(company => company.opf === opf);
};

export const getTotalDealsCount = (): number => {
  return mockLeasingCompanies.reduce((total, company) => total + company.dealsCount, 0);
};

export const getTotalCommission = (): number => {
  return mockLeasingCompanies.reduce((total, company) => total + company.totalCommission, 0);
};

// Create empty leasing company for new company creation
export const createEmptyLeasingCompany = (): LeasingCompany => {
  const now = new Date().toISOString().split('T')[0];
  const id = `lc-new-${Date.now()}`;
  
  return {
    id,
    opf: '',
    fullName: '',
    inn: '',
    dealsCount: 0,
    totalCommission: 0,
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
      licenseExpiryDate: ''
    },
    documents: [],
    attachments: []
  };
};