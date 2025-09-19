import React from 'react';
import type { GeneratedReport } from '../types/reports';
import { DataGrid } from './DataGrid/DataGrid';
import type { ColumnDefinition } from './DataGrid/types';

interface ReportResultsProps {
  generatedReport: GeneratedReport;
}

const ReportResults: React.FC<ReportResultsProps> = ({ generatedReport }) => {
  // Define columns based on report type
  const getColumnsForReport = (reportId: string, data: any[]): ColumnDefinition<any>[] => {
    if (!data || data.length === 0) return [];

    switch (reportId) {
      case 'commission-income':
        return [
          {
            key: 'clientName',
            title: 'Клиент',
            sortable: true,
            width: 'w-1/4'
          },
          {
            key: 'leasingCompany',
            title: 'Лизинговая компания',
            sortable: true,
            width: 'w-1/5'
          },
          {
            key: 'dealAmount',
            title: 'Сумма сделки',
            sortable: true,
            width: 'w-1/6',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'commissionRate',
            title: 'Ставка (%)',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => `${value}%`
          },
          {
            key: 'commissionAmount',
            title: 'Комиссия',
            sortable: true,
            width: 'w-1/6',
            render: (value: number) => (
              <span className="font-semibold text-green-600">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'dealDate',
            title: 'Дата сделки',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => new Date(value).toLocaleDateString('ru-RU')
          },
          {
            key: 'status',
            title: 'Статус',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => (
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                value === 'Выплачено' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {value}
              </span>
            )
          }
        ];

      case 'client-activity':
        return [
          {
            key: 'clientName',
            title: 'Клиент',
            sortable: true,
            width: 'w-1/4'
          },
          {
            key: 'inquiries',
            title: 'Обращения',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium">{value}</span>
          },
          {
            key: 'consultations',
            title: 'Консультации',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium">{value}</span>
          },
          {
            key: 'dealsCompleted',
            title: 'Сделки',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-semibold text-blue-600">{value}</span>
          },
          {
            key: 'totalVolume',
            title: 'Общий объем',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'lastActivity',
            title: 'Последняя активность',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => new Date(value).toLocaleDateString('ru-RU')
          },
          {
            key: 'activityScore',
            title: 'Оценка активности',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => (
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                value === 'Высокая' 
                  ? 'bg-green-100 text-green-800' 
                  : value === 'Средняя'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {value}
              </span>
            )
          }
        ];

      case 'deal-analysis':
        return [
          {
            key: 'dealId',
            title: 'ID сделки',
            sortable: true,
            width: 'w-1/8'
          },
          {
            key: 'clientName',
            title: 'Клиент',
            sortable: true,
            width: 'w-1/5'
          },
          {
            key: 'leasingCompany',
            title: 'Лизинговая компания',
            sortable: true,
            width: 'w-1/6'
          },
          {
            key: 'objectType',
            title: 'Тип объекта',
            sortable: true,
            width: 'w-1/8'
          },
          {
            key: 'dealAmount',
            title: 'Сумма',
            sortable: true,
            width: 'w-1/6',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'leaseTerm',
            title: 'Срок (мес.)',
            sortable: true,
            width: 'w-1/12',
            render: (value: number) => `${value} мес.`
          },
          {
            key: 'status',
            title: 'Статус',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => (
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                value === 'Активная' 
                  ? 'bg-green-100 text-green-800' 
                  : value === 'Завершенная'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {value}
              </span>
            )
          }
        ];

      case 'leasing-companies':
        return [
          {
            key: 'companyName',
            title: 'Компания',
            sortable: true,
            width: 'w-1/4'
          },
          {
            key: 'dealsCount',
            title: 'Количество сделок',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium">{value}</span>
          },
          {
            key: 'totalVolume',
            title: 'Общий объем',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'avgDealSize',
            title: 'Средний размер сделки',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'totalCommission',
            title: 'Общая комиссия',
            sortable: true,
            width: 'w-1/6',
            render: (value: number) => (
              <span className="font-semibold text-green-600">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'avgCommissionRate',
            title: 'Средняя ставка (%)',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => `${value.toFixed(1)}%`
          },
          {
            key: 'avgProcessingTime',
            title: 'Среднее время обработки (дни)',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => `${value} дн.`
          }
        ];

      case 'monthly-performance':
        return [
          {
            key: 'month',
            title: 'Месяц',
            sortable: true,
            width: 'w-1/6'
          },
          {
            key: 'dealsCount',
            title: 'Количество сделок',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium">{value}</span>
          },
          {
            key: 'totalVolume',
            title: 'Общий объем',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'totalCommission',
            title: 'Общая комиссия',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-semibold text-green-600">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'conversionRate',
            title: 'Конверсия (%)',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => `${value}%`
          },
          {
            key: 'avgDealSize',
            title: 'Средний размер сделки',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'newClients',
            title: 'Новые клиенты',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium text-blue-600">{value}</span>
          }
        ];

      case 'client-portfolio':
        return [
          {
            key: 'segment',
            title: 'Сегмент',
            sortable: true,
            width: 'w-1/6'
          },
          {
            key: 'clientsCount',
            title: 'Количество клиентов',
            sortable: true,
            width: 'w-1/8',
            render: (value: number) => <span className="font-medium">{value}</span>
          },
          {
            key: 'totalVolume',
            title: 'Общий объем',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'avgDealSize',
            title: 'Средний размер сделки',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-medium">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'totalCommission',
            title: 'Общая комиссия',
            sortable: true,
            width: 'w-1/5',
            render: (value: number) => (
              <span className="font-semibold text-green-600">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0
                }).format(value)}
              </span>
            )
          },
          {
            key: 'growthPotential',
            title: 'Потенциал роста',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => (
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                value === 'Высокий' 
                  ? 'bg-green-100 text-green-800' 
                  : value === 'Средний'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {value}
              </span>
            )
          },
          {
            key: 'riskLevel',
            title: 'Уровень риска',
            sortable: true,
            width: 'w-1/8',
            render: (value: string) => (
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                value === 'Низкий' 
                  ? 'bg-green-100 text-green-800' 
                  : value === 'Средний'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {value}
              </span>
            )
          }
        ];

      default:
        // Generic columns for unknown report types
        const firstItem = data[0];
        return Object.keys(firstItem).map(key => ({
          key: key as keyof typeof firstItem,
          title: key.charAt(0).toUpperCase() + key.slice(1),
          sortable: true
        }));
    }
  };

  const columns = getColumnsForReport(generatedReport.reportId, generatedReport.data);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Report Generation Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 md:gap-4">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-medium text-green-800 mb-1">
              Отчет успешно сгенерирован
            </h3>
            <p className="text-xs md:text-sm text-green-600">
              Время генерации: {generatedReport.generatedAt.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {/* Parameters Used */}
          <div className="text-xs md:text-sm text-green-700 lg:max-w-md">
            <div className="font-medium mb-2">Параметры:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1 md:gap-2">
              {Object.entries(generatedReport.parameters).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium text-green-800">{key}:</span>
                  <span className="break-words">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      {generatedReport.summary && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <h3 className="text-sm md:text-base font-medium text-blue-800 mb-3 md:mb-4">Сводная статистика</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(generatedReport.summary).map(([key, value]) => (
              <div key={key} className="text-center p-2 md:p-3 bg-white rounded-md">
                <div className="text-base md:text-lg lg:text-xl font-semibold text-blue-900 break-words">
                  {typeof value === 'number' && key.toLowerCase().includes('amount') || key.toLowerCase().includes('volume') || key.toLowerCase().includes('commission') 
                    ? new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        minimumFractionDigits: 0
                      }).format(value)
                    : typeof value === 'number' && key.toLowerCase().includes('rate')
                    ? `${value.toFixed(1)}%`
                    : String(value)
                  }
                </div>
                <div className="text-xs md:text-sm text-blue-600 capitalize mt-1">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Data */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
          <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-900">
            Данные отчета
          </h3>
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            {generatedReport.data.length} записей
          </span>
        </div>
        
        {generatedReport.data.length > 0 ? (
          <div className="overflow-hidden">
            <DataGrid
              data={generatedReport.data}
              columns={columns}
              searchable={true}
              sortable={true}
              pageSize={10}
              className="shadow-sm"
            />
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8 text-center">
            <div className="text-gray-500">
              <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-base md:text-lg font-medium text-gray-900 mb-2">Нет данных для отображения</p>
              <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
                Отчет был сгенерирован, но не содержит данных для выбранного периода и параметров.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportResults;