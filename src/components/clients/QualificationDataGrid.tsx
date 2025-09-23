import React from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { ColumnDefinition, SummaryConfig } from '../DataGrid/types';
import type { ClientQualification } from '../../types/clients';
import { EmptyState } from '../common';

interface QualificationDataGridProps {
  qualifications: ClientQualification[];
  onUploadExcel?: (file: File) => Promise<void>;
  onDownloadExcel?: () => void;
}

const QualificationDataGrid: React.FC<QualificationDataGridProps> = ({ 
  qualifications, 
  onUploadExcel, 
  onDownloadExcel 
}) => {
  // Format currency values
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format loss status
  const formatLossStatus = (hasLoss: boolean): string => {
    return hasLoss ? 'Убыток' : 'Не убыток';
  };

  // Column definitions for qualification data
  const columns: ColumnDefinition<ClientQualification>[] = [
    {
      key: 'leasingCompany',
      title: 'Лизинговая компания',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'accountTurnover',
      title: 'Оборот по счету',
      sortable: true,
      width: 'w-1/4',
      render: (value: number) => formatCurrency(value),
    },
    {
      key: 'revenue',
      title: 'Выручка',
      sortable: true,
      width: 'w-1/4',
      render: (value: number) => formatCurrency(value),
    },
    {
      key: 'hasLoss',
      title: 'Убыток/не убыток в отчетном периоде',
      sortable: true,
      width: 'w-1/4',
      render: (value: boolean) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {formatLossStatus(value)}
        </span>
      ),
    },
  ];

  // Summary configuration for totals
  const summaryConfig: SummaryConfig<ClientQualification> = {
    calculate: (data: ClientQualification[]) => ({
      totalTurnover: data.reduce((sum, q) => sum + q.accountTurnover, 0),
      totalRevenue: data.reduce((sum, q) => sum + q.revenue, 0),
      companiesWithLoss: data.filter(q => q.hasLoss).length,
      totalCompanies: data.length,
    }),
    render: (summaryData: Record<string, any>) => (
      <div className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <span className="text-sm font-medium text-gray-900">Итого:</span>
          <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-8 space-y-2 sm:space-y-0 text-xs md:text-sm">
            <div className="break-words">
              <span className="text-gray-600">Общий оборот: </span>
              <span className="font-medium text-gray-900">{formatCurrency(summaryData.totalTurnover)}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Общая выручка: </span>
              <span className="font-medium text-gray-900">{formatCurrency(summaryData.totalRevenue)}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Компаний с убытком: </span>
              <span className="font-medium text-gray-900">
                {summaryData.companiesWithLoss} из {summaryData.totalCompanies}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  // Handle empty state
  if (qualifications.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        title="Нет данных о квалификации"
        description="Для данного клиента отсутствует информация о квалификации в лизинговых компаниях."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <DataGrid
        data={qualifications}
        columns={columns}
        onUploadExcel={onUploadExcel}
        onDownloadExcel={onDownloadExcel}
        searchable={true}
        sortable={true}
        pageSize={10}
        summary={summaryConfig}
        className="qualification-grid min-w-full"
      />
    </div>
  );
};

export default QualificationDataGrid;