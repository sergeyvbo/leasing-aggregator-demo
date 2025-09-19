import type { Report, GeneratedReport } from '../types/reports';

// Mock reports data with realistic leasing broker reports
export const mockReports: Report[] = [
  {
    id: 'commission-income',
    name: 'Комиссионные доходы',
    description: 'Отчет по комиссионным доходам за выбранный период с детализацией по клиентам и лизинговым компаниям',
    category: 'financial',
    lastGenerated: new Date('2025-01-15T10:30:00'),
    parameters: [
      {
        key: 'startDate',
        label: 'Дата начала',
        type: 'date',
        required: true,
        defaultValue: '2025-01-01'
      },
      {
        key: 'endDate',
        label: 'Дата окончания',
        type: 'date',
        required: true,
        defaultValue: '2025-01-31'
      },
      {
        key: 'clientFilter',
        label: 'Фильтр по клиентам',
        type: 'select',
        required: false,
        options: ['Все клиенты', 'ООО "Рога и копыта"', 'АО "Северная звезда"', 'ИП Сидоров П.И.'],
        defaultValue: 'Все клиенты'
      }
    ]
  },
  {
    id: 'client-activity',
    name: 'Активность клиентов',
    description: 'Анализ активности клиентов: количество обращений, заключенных сделок и общий объем операций',
    category: 'operational',
    lastGenerated: new Date('2025-01-14T14:20:00'),
    parameters: [
      {
        key: 'startDate',
        label: 'Дата начала',
        type: 'date',
        required: true,
        defaultValue: '2025-01-01'
      },
      {
        key: 'endDate',
        label: 'Дата окончания',
        type: 'date',
        required: true,
        defaultValue: '2025-01-31'
      },
      {
        key: 'activityType',
        label: 'Тип активности',
        type: 'select',
        required: false,
        options: ['Все типы', 'Обращения', 'Заключенные сделки', 'Консультации'],
        defaultValue: 'Все типы'
      },
      {
        key: 'minDeals',
        label: 'Минимальное количество сделок',
        type: 'number',
        required: false,
        defaultValue: 0
      }
    ]
  },
  {
    id: 'deal-analysis',
    name: 'Анализ сделок',
    description: 'Подробный анализ заключенных сделок с группировкой по статусам, суммам и лизинговым компаниям',
    category: 'analytical',
    lastGenerated: new Date('2025-01-13T16:45:00'),
    parameters: [
      {
        key: 'startDate',
        label: 'Дата начала',
        type: 'date',
        required: true,
        defaultValue: '2025-01-01'
      },
      {
        key: 'endDate',
        label: 'Дата окончания',
        type: 'date',
        required: true,
        defaultValue: '2025-01-31'
      },
      {
        key: 'dealStatus',
        label: 'Статус сделки',
        type: 'select',
        required: false,
        options: ['Все статусы', 'Активные', 'Завершенные', 'Приостановленные', 'Расторгнутые'],
        defaultValue: 'Все статусы'
      },
      {
        key: 'minAmount',
        label: 'Минимальная сумма сделки (руб.)',
        type: 'number',
        required: false,
        defaultValue: 0
      },
      {
        key: 'maxAmount',
        label: 'Максимальная сумма сделки (руб.)',
        type: 'number',
        required: false,
        defaultValue: 50000000
      }
    ]
  },
  {
    id: 'leasing-companies',
    name: 'Отчет по лизинговым компаниям',
    description: 'Сравнительный анализ работы с различными лизинговыми компаниями: объемы, комиссии, сроки',
    category: 'operational',
    lastGenerated: new Date('2025-01-12T09:15:00'),
    parameters: [
      {
        key: 'startDate',
        label: 'Дата начала',
        type: 'date',
        required: true,
        defaultValue: '2025-01-01'
      },
      {
        key: 'endDate',
        label: 'Дата окончания',
        type: 'date',
        required: true,
        defaultValue: '2025-01-31'
      },
      {
        key: 'companyFilter',
        label: 'Лизинговая компания',
        type: 'select',
        required: false,
        options: [
          'Все компании',
          'Сбер Лизинг',
          'ВТБ Лизинг',
          'Альфа-Лизинг',
          'Газпромбанк Лизинг',
          'Райффайзен Лизинг'
        ],
        defaultValue: 'Все компании'
      }
    ]
  },
  {
    id: 'monthly-performance',
    name: 'Ежемесячная эффективность',
    description: 'Помесячный анализ эффективности работы брокера: количество сделок, доходы, конверсия',
    category: 'analytical',
    lastGenerated: new Date('2025-01-10T11:00:00'),
    parameters: [
      {
        key: 'year',
        label: 'Год',
        type: 'select',
        required: true,
        options: ['2025', '2024', '2023'],
        defaultValue: '2025'
      },
      {
        key: 'includeForecasts',
        label: 'Включить прогнозы',
        type: 'select',
        required: false,
        options: ['Да', 'Нет'],
        defaultValue: 'Нет'
      }
    ]
  },
  {
    id: 'client-portfolio',
    name: 'Портфель клиентов',
    description: 'Анализ клиентского портфеля: сегментация по объемам, активности и потенциалу развития',
    category: 'financial',
    lastGenerated: new Date('2025-01-08T13:30:00'),
    parameters: [
      {
        key: 'startDate',
        label: 'Дата начала',
        type: 'date',
        required: true,
        defaultValue: '2025-01-01'
      },
      {
        key: 'endDate',
        label: 'Дата окончания',
        type: 'date',
        required: true,
        defaultValue: '2025-01-31'
      },
      {
        key: 'segmentation',
        label: 'Тип сегментации',
        type: 'select',
        required: false,
        options: ['По объему сделок', 'По активности', 'По потенциалу', 'По регионам'],
        defaultValue: 'По объему сделок'
      }
    ]
  }
];

// Mock generated report data for demonstration
export const mockGeneratedReports: Record<string, any[]> = {
  'commission-income': [
    {
      clientName: 'ООО "Рога и копыта"',
      leasingCompany: 'Сбер Лизинг',
      dealAmount: 3200000,
      commissionRate: 2.5,
      commissionAmount: 80000,
      dealDate: '2025-01-15',
      status: 'Выплачено'
    },
    {
      clientName: 'АО "Северная звезда"',
      leasingCompany: 'ВТБ Лизинг',
      dealAmount: 6800000,
      commissionRate: 3.0,
      commissionAmount: 204000,
      dealDate: '2025-01-12',
      status: 'К выплате'
    },
    {
      clientName: 'ИП Сидоров П.И.',
      leasingCompany: 'Альфа-Лизинг',
      dealAmount: 1450000,
      commissionRate: 2.0,
      commissionAmount: 29000,
      dealDate: '2025-01-08',
      status: 'Выплачено'
    }
  ],
  'client-activity': [
    {
      clientName: 'ООО "Рога и копыта"',
      inquiries: 8,
      consultations: 5,
      dealsCompleted: 3,
      totalVolume: 9650000,
      lastActivity: '2025-01-15',
      activityScore: 'Высокая'
    },
    {
      clientName: 'АО "Северная звезда"',
      inquiries: 12,
      consultations: 8,
      dealsCompleted: 2,
      totalVolume: 12300000,
      lastActivity: '2025-01-14',
      activityScore: 'Высокая'
    },
    {
      clientName: 'ИП Сидоров П.И.',
      inquiries: 3,
      consultations: 2,
      dealsCompleted: 1,
      totalVolume: 1450000,
      lastActivity: '2025-01-10',
      activityScore: 'Средняя'
    }
  ],
  'deal-analysis': [
    {
      dealId: 'D-2025-001',
      clientName: 'ООО "Рога и копыта"',
      leasingCompany: 'Сбер Лизинг',
      objectType: 'Автотранспорт',
      dealAmount: 3200000,
      leaseTerm: 36,
      status: 'Активная',
      startDate: '2025-01-15',
      commission: 80000
    },
    {
      dealId: 'D-2025-002',
      clientName: 'АО "Северная звезда"',
      leasingCompany: 'ВТБ Лизинг',
      objectType: 'Оборудование',
      dealAmount: 6800000,
      leaseTerm: 48,
      status: 'Активная',
      startDate: '2025-01-12',
      commission: 204000
    },
    {
      dealId: 'D-2024-156',
      clientName: 'ООО "ТехноПарк"',
      leasingCompany: 'Газпромбанк Лизинг',
      objectType: 'Недвижимость',
      dealAmount: 15000000,
      leaseTerm: 60,
      status: 'Завершенная',
      startDate: '2024-12-20',
      commission: 450000
    }
  ],
  'leasing-companies': [
    {
      companyName: 'Сбер Лизинг',
      dealsCount: 15,
      totalVolume: 48500000,
      avgDealSize: 3233333,
      totalCommission: 1212500,
      avgCommissionRate: 2.5,
      avgProcessingTime: 12
    },
    {
      companyName: 'ВТБ Лизинг',
      dealsCount: 12,
      totalVolume: 42300000,
      avgDealSize: 3525000,
      totalCommission: 1269000,
      avgCommissionRate: 3.0,
      avgProcessingTime: 14
    },
    {
      companyName: 'Альфа-Лизинг',
      dealsCount: 8,
      totalVolume: 28700000,
      avgDealSize: 3587500,
      totalCommission: 717500,
      avgCommissionRate: 2.5,
      avgProcessingTime: 10
    },
    {
      companyName: 'Газпромбанк Лизинг',
      dealsCount: 6,
      totalVolume: 35200000,
      avgDealSize: 5866667,
      totalCommission: 1232000,
      avgCommissionRate: 3.5,
      avgProcessingTime: 16
    }
  ],
  'monthly-performance': [
    {
      month: 'Январь 2025',
      dealsCount: 8,
      totalVolume: 25600000,
      totalCommission: 640000,
      conversionRate: 65,
      avgDealSize: 3200000,
      newClients: 3
    },
    {
      month: 'Декабрь 2024',
      dealsCount: 12,
      totalVolume: 38400000,
      totalCommission: 960000,
      conversionRate: 72,
      avgDealSize: 3200000,
      newClients: 5
    },
    {
      month: 'Ноябрь 2024',
      dealsCount: 10,
      totalVolume: 32000000,
      totalCommission: 800000,
      conversionRate: 68,
      avgDealSize: 3200000,
      newClients: 2
    },
    {
      month: 'Октябрь 2024',
      dealsCount: 15,
      totalVolume: 48000000,
      totalCommission: 1200000,
      conversionRate: 75,
      avgDealSize: 3200000,
      newClients: 4
    }
  ],
  'client-portfolio': [
    {
      segment: 'Крупные клиенты',
      clientsCount: 5,
      totalVolume: 85600000,
      avgDealSize: 5706667,
      totalCommission: 2568000,
      growthPotential: 'Высокий',
      riskLevel: 'Низкий'
    },
    {
      segment: 'Средние клиенты',
      clientsCount: 12,
      totalVolume: 48300000,
      avgDealSize: 2012500,
      totalCommission: 1207500,
      growthPotential: 'Средний',
      riskLevel: 'Средний'
    },
    {
      segment: 'Малые клиенты',
      clientsCount: 18,
      totalVolume: 21700000,
      avgDealSize: 602778,
      totalCommission: 434000,
      growthPotential: 'Средний',
      riskLevel: 'Высокий'
    }
  ]
};

// Utility functions for report data management
export const getReportById = (id: string): Report | undefined => {
  return mockReports.find(report => report.id === id);
};

export const getAllReports = (): Report[] => {
  return mockReports;
};

export const getReportsByCategory = (category: 'financial' | 'operational' | 'analytical'): Report[] => {
  return mockReports.filter(report => report.category === category);
};

export const generateReportData = (reportId: string, _parameters: Record<string, any>): any[] => {
  // Return mock data based on report ID
  return mockGeneratedReports[reportId] || [];
};

export const generateReport = (reportId: string, parameters: Record<string, any>): GeneratedReport => {
  const report = getReportById(reportId);
  if (!report) {
    throw new Error(`Report with id ${reportId} not found`);
  }

  const data = generateReportData(reportId, parameters);
  
  // Generate summary statistics based on the data
  let summary: Record<string, any> = {};
  
  switch (reportId) {
    case 'commission-income':
      summary = {
        totalCommission: data.reduce((sum, item) => sum + item.commissionAmount, 0),
        dealsCount: data.length,
        avgCommissionRate: data.reduce((sum, item) => sum + item.commissionRate, 0) / data.length
      };
      break;
    case 'client-activity':
      summary = {
        totalClients: data.length,
        totalInquiries: data.reduce((sum, item) => sum + item.inquiries, 0),
        totalDeals: data.reduce((sum, item) => sum + item.dealsCompleted, 0),
        totalVolume: data.reduce((sum, item) => sum + item.totalVolume, 0)
      };
      break;
    case 'deal-analysis':
      summary = {
        totalDeals: data.length,
        totalVolume: data.reduce((sum, item) => sum + item.dealAmount, 0),
        totalCommission: data.reduce((sum, item) => sum + item.commission, 0),
        avgDealSize: data.reduce((sum, item) => sum + item.dealAmount, 0) / data.length
      };
      break;
    case 'leasing-companies':
      summary = {
        companiesCount: data.length,
        totalVolume: data.reduce((sum, item) => sum + item.totalVolume, 0),
        totalCommission: data.reduce((sum, item) => sum + item.totalCommission, 0),
        avgProcessingTime: data.reduce((sum, item) => sum + item.avgProcessingTime, 0) / data.length
      };
      break;
    default:
      summary = {
        recordsCount: data.length
      };
  }

  return {
    id: `generated-${Date.now()}`,
    reportId,
    generatedAt: new Date(),
    parameters,
    data,
    summary
  };
};

export const searchReports = (query: string): Report[] => {
  if (!query || query.trim().length === 0) {
    return mockReports;
  }

  const searchTerm = query.toLowerCase().trim();
  return mockReports.filter(report => 
    report.name.toLowerCase().includes(searchTerm) ||
    report.description.toLowerCase().includes(searchTerm) ||
    report.category.toLowerCase().includes(searchTerm)
  );
};