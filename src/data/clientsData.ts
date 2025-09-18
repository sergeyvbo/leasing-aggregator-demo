import type { Client } from '../types/clients';

// Mock client versions for version navigation
export const clientVersions: Record<string, Client> = {};

// Mock clients data
export const mockClients: Client[] = [
  {
    id: '1',
    opf: 'ООО',
    fullName: 'Общество с ограниченной ответственностью "Рога и копыта"',
    inn: '7707083893',
    dealsCount: 15,
    totalCommission: 2500000,
    version: {
      id: 'v1-3',
      number: 3,
      date: '2025-09-01',
      status: 'active',
      previousVersionId: 'v1-2',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Общество с ограниченной ответственностью "Рога и копыта"',
      inn: '7707083893',
      kpp: '770701001',
      ogrn: '1027700132195',
      address: 'г. Москва, ул. Тверская, д. 15, стр. 1',
      phone: '+7 (495) 123-45-67',
      email: 'info@rogaikopyta.ru',
      directorName: 'Иванов Иван Иванович',
      foundationDate: '2002-03-15'
    },
    documents: [
      {
        id: 'd1-1',
        type: 'registration',
        title: 'Свидетельство о государственной регистрации',
        fields: {
          registrationNumber: '77 №007132195',
          issueDate: '2002-03-15',
          issuingAuthority: 'Межрайонная ИФНС России №46 по г. Москве',
          registrationAddress: 'г. Москва, ул. Тверская, д. 15, стр. 1'
        }
      },
      {
        id: 'd1-2',
        type: 'license',
        title: 'Лицензия на осуществление деятельности',
        fields: {
          licenseNumber: 'ЛО-77-01-012345',
          issueDate: '2020-05-10',
          expiryDate: '2025-05-10',
          issuingAuthority: 'Департамент здравоохранения г. Москвы',
          scope: 'Медицинская деятельность',
          licenseType: 'Бессрочная'
        }
      }
    ],
    attachments: [
      {
        id: 'a1-1',
        name: 'Устав организации.pdf',
        type: 'application/pdf',
        size: 2048576,
        url: '/attachments/ustav-1.pdf',
        previewUrl: '/previews/ustav-1-thumb.jpg',
        canPreview: true
      },
      {
        id: 'a1-2',
        name: 'Справка из банка.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 524288,
        url: '/attachments/bank-statement-1.xlsx',
        canPreview: false
      },
      {
        id: 'a1-3',
        name: 'Фото офиса.jpg',
        type: 'image/jpeg',
        size: 1048576,
        url: '/attachments/office-photo-1.jpg',
        previewUrl: '/attachments/office-photo-1.jpg',
        canPreview: true
      }
    ],
    qualifications: [
      {
        id: 'q1-1',
        leasingCompany: 'Сбер Лизинг',
        accountTurnover: 15000000,
        revenue: 12000000,
        hasLoss: false,
        reportingPeriod: '2024'
      },
      {
        id: 'q1-2',
        leasingCompany: 'ВТБ Лизинг',
        accountTurnover: 8500000,
        revenue: 7200000,
        hasLoss: false,
        reportingPeriod: '2024'
      },
      {
        id: 'q1-3',
        leasingCompany: 'Альфа-Лизинг',
        accountTurnover: 5200000,
        revenue: 4800000,
        hasLoss: true,
        reportingPeriod: '2023'
      }
    ],
    leasingObjects: [
      {
        id: 'lo1-1',
        name: 'Автомобиль Toyota Camry',
        identifiers: ['VIN: JT2BF22K123456789', 'Гос. номер: А123БВ777'],
        contractPeriod: {
          from: '2024-01-15',
          to: '2027-01-15'
        },
        status: 'Активный'
      },
      {
        id: 'lo1-2',
        name: 'Офисное оборудование (комплект)',
        identifiers: ['Инв. №12345', 'Серийный №ABC-789'],
        contractPeriod: {
          from: '2023-06-01',
          to: '2026-06-01'
        },
        status: 'Активный'
      }
    ]
  },
  {
    id: '2',
    opf: 'АО',
    fullName: 'Акционерное общество "Северная звезда"',
    inn: '7805123456',
    dealsCount: 8,
    totalCommission: 1800000,
    version: {
      id: 'v2-1',
      number: 1,
      date: '2025-08-15',
      status: 'active',
      previousVersionId: undefined,
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Акционерное общество "Северная звезда"',
      inn: '7805123456',
      kpp: '780501001',
      ogrn: '1027805123456',
      address: 'г. Санкт-Петербург, Невский проспект, д. 10',
      phone: '+7 (812) 987-65-43',
      email: 'contact@northstar.ru',
      directorName: 'Петрова Анна Сергеевна',
      foundationDate: '1998-11-20'
    },
    documents: [
      {
        id: 'd2-1',
        type: 'registration',
        title: 'Свидетельство о государственной регистрации',
        fields: {
          registrationNumber: '78 №005123456',
          issueDate: '1998-11-20',
          issuingAuthority: 'Регистрационная палата Санкт-Петербурга',
          registrationAddress: 'г. Санкт-Петербург, Невский проспект, д. 10'
        }
      }
    ],
    attachments: [
      {
        id: 'a2-1',
        name: 'Годовой отчет 2024.pdf',
        type: 'application/pdf',
        size: 3145728,
        url: '/attachments/annual-report-2.pdf',
        previewUrl: '/previews/annual-report-2-thumb.jpg',
        canPreview: true
      }
    ],
    qualifications: [
      {
        id: 'q2-1',
        leasingCompany: 'Газпромбанк Лизинг',
        accountTurnover: 22000000,
        revenue: 18500000,
        hasLoss: false,
        reportingPeriod: '2024'
      }
    ],
    leasingObjects: [
      {
        id: 'lo2-1',
        name: 'Производственное оборудование',
        identifiers: ['Инв. №54321', 'Модель: XYZ-2024'],
        contractPeriod: {
          from: '2024-03-01',
          to: '2029-03-01'
        },
        status: 'Активный'
      }
    ]
  },
  {
    id: '3',
    opf: 'ИП',
    fullName: 'Индивидуальный предприниматель Сидоров Петр Иванович',
    inn: '540212345678',
    dealsCount: 3,
    totalCommission: 450000,
    version: {
      id: 'v3-2',
      number: 2,
      date: '2025-07-20',
      status: 'draft',
      previousVersionId: 'v3-1',
      nextVersionId: undefined
    },
    requisites: {
      fullName: 'Индивидуальный предприниматель Сидоров Петр Иванович',
      inn: '540212345678',
      address: 'г. Новосибирск, ул. Красный проспект, д. 22, кв. 15',
      phone: '+7 (383) 555-12-34',
      email: 'sidorov.ip@mail.ru',
      ogrnip: '304540212345678',
      registrationDate: '2015-04-10'
    },
    documents: [
      {
        id: 'd3-1',
        type: 'registration',
        title: 'Свидетельство о регистрации ИП',
        fields: {
          registrationNumber: '304540212345678',
          issueDate: '2015-04-10',
          issuingAuthority: 'ИФНС России по Центральному району г. Новосибирска',
          registrationAddress: 'г. Новосибирск, ул. Красный проспект, д. 22, кв. 15'
        }
      },
      {
        id: 'd3-2',
        type: 'permit',
        title: 'Разрешение на торговлю',
        fields: {
          permitNumber: 'РТ-54-2020-001234',
          issueDate: '2020-01-15',
          expiryDate: '2025-01-15',
          purpose: 'Розничная торговля продовольственными товарами',
          issuingAuthority: 'Администрация Центрального района г. Новосибирска',
          territory: 'г. Новосибирск, Центральный район'
        }
      }
    ],
    attachments: [],
    qualifications: [
      {
        id: 'q3-1',
        leasingCompany: 'Райффайзен Лизинг',
        accountTurnover: 2500000,
        revenue: 2200000,
        hasLoss: false,
        reportingPeriod: '2024'
      }
    ],
    leasingObjects: [
      {
        id: 'lo3-1',
        name: 'Торговое оборудование',
        identifiers: ['Инв. №98765'],
        contractPeriod: {
          from: '2024-05-01',
          to: '2026-05-01'
        },
        status: 'Активный'
      }
    ]
  }
];

// Previous versions of clients for version navigation
clientVersions['v1-2'] = {
  ...mockClients[0],
  version: {
    id: 'v1-2',
    number: 2,
    date: '2025-06-15',
    status: 'archived',
    previousVersionId: 'v1-1',
    nextVersionId: 'v1-3'
  },
  requisites: {
    ...mockClients[0].requisites,
    phone: '+7 (495) 123-45-66', // Different phone number in previous version
    email: 'old@rogaikopyta.ru'
  },
  dealsCount: 12, // Different deal count in previous version
  totalCommission: 2200000
};

clientVersions['v1-1'] = {
  ...mockClients[0],
  version: {
    id: 'v1-1',
    number: 1,
    date: '2025-03-01',
    status: 'archived',
    previousVersionId: undefined,
    nextVersionId: 'v1-2'
  },
  requisites: {
    ...mockClients[0].requisites,
    phone: '+7 (495) 111-22-33',
    email: 'contact@rogaikopyta.ru',
    address: 'г. Москва, ул. Арбат, д. 20' // Different address in first version
  },
  dealsCount: 8,
  totalCommission: 1500000,
  documents: [mockClients[0].documents[0]], // Only registration document in first version
  attachments: [mockClients[0].attachments[0]] // Only one attachment in first version
};

clientVersions['v3-1'] = {
  ...mockClients[2],
  version: {
    id: 'v3-1',
    number: 1,
    date: '2025-05-10',
    status: 'archived',
    previousVersionId: undefined,
    nextVersionId: 'v3-2'
  },
  dealsCount: 2,
  totalCommission: 300000,
  documents: [mockClients[2].documents[0]] // Only registration document in first version
};

// Add current versions to the versions map
mockClients.forEach(client => {
  clientVersions[client.version.id] = client;
});

// Utility functions for client data access
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getClientByVersionId = (versionId: string): Client | undefined => {
  return clientVersions[versionId];
};

export const getAllClients = (): Client[] => {
  return mockClients;
};

// Function to get client with specific version
export const getClientWithVersion = (clientId: string, versionId?: string): Client | undefined => {
  if (versionId) {
    return clientVersions[versionId];
  }
  return getClientById(clientId);
};