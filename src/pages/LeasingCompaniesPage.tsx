import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { LeasingCompany } from '../types/leasingCompanies';
import { getAllLeasingCompanies, createEmptyLeasingCompany } from '../data/leasingCompaniesData';
import { formatCurrency } from '../components/DataGrid/utils';
import { LoadingState } from '../components/common';
import { useExcelData } from '../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

/**
 * Column configuration for leasing companies table
 * Displays: Id, ОПФ, Полное наименование, ИНН, количество сделок, итого вознаграждение
 */
const leasingCompaniesColumns: ColumnDefinition<LeasingCompany>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 'w-20',
  },
  {
    key: 'opf',
    title: 'ОПФ',
    sortable: true,
    width: 'w-24',
  },
  {
    key: 'fullName',
    title: 'Полное наименование',
    sortable: true,
  },
  {
    key: 'inn',
    title: 'ИНН',
    sortable: true,
    width: 'w-32',
  },
  {
    key: 'dealsCount',
    title: 'Количество сделок',
    sortable: true,
    width: 'w-36',
    render: (value: number) => (
      <span className="text-gray-900">
        {value}
      </span>
    ),
  },
  {
    key: 'totalCommission',
    title: 'Итого вознаграждение',
    sortable: true,
    width: 'w-40',
    render: (value: number) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(value)}
      </span>
    ),
  },
];

interface LeasingCompaniesPageProps {
  onViewLeasingCompany?: (leasingCompany: LeasingCompany) => void;
}

const LeasingCompaniesPage: React.FC<LeasingCompaniesPageProps> = ({ onViewLeasingCompany }) => {
  const [initialLeasingCompanies, setInitialLeasingCompanies] = useState<LeasingCompany[]>([]);
  const [loading, setLoading] = useState(true);

  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<LeasingCompany> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      data.forEach((item, index) => {
        if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
        if (!item.fullName) errors.push(`Строка ${index + 2}: отсутствует полное наименование`);
        if (!item.inn) errors.push(`Строка ${index + 2}: отсутствует ИНН`);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },
    transformData: (data: any[]) => {
      return data.map(item => ({
        ...item,
        dealsCount: Number(item.dealsCount) || 0,
        totalCommission: Number(item.totalCommission) || 0,
      }));
    }
  };

  // Конфигурация для экспорта Excel
  const exportConfig: ExcelExportConfig<LeasingCompany> = {
    fileName: 'leasing-companies',
    sheetName: 'Лизинговые компании',
    transformData: (data: LeasingCompany[]) => {
      return data.map(company => ({
        'ID': company.id,
        'ОПФ': company.opf,
        'Полное наименование': company.fullName,
        'ИНН': company.inn,
        'Количество сделок': company.dealsCount,
        'Итого вознаграждение': company.totalCommission,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: leasingCompanies,
    isLoading: excelLoading,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
    updateData,
  } = useExcelData(initialLeasingCompanies, importConfig, exportConfig);

  // Simulate loading leasing companies data
  useEffect(() => {
    const loadLeasingCompanies = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const companiesData = getAllLeasingCompanies();
      setInitialLeasingCompanies(companiesData);
      updateData(companiesData);
      setLoading(false);
    };

    loadLeasingCompanies();
  }, [updateData]);

  // Handle view leasing company action - navigate to company details
  const handleViewLeasingCompany = (leasingCompany: LeasingCompany) => {
    if (onViewLeasingCompany) {
      onViewLeasingCompany(leasingCompany);
    }
  };

  // Handle add leasing company action
  const handleAddLeasingCompany = () => {
    // Create empty leasing company and navigate to details page
    const emptyLeasingCompany = createEmptyLeasingCompany();
    if (onViewLeasingCompany) {
      onViewLeasingCompany(emptyLeasingCompany);
    }
  };

  // Handle upload from Excel action
  const handleUploadExcelAction = async (file: File) => {
    await handleUploadExcel(file);
  };

  // Handle download to Excel action
  const handleDownloadExcelAction = () => {
    handleDownloadExcel();
  };

  // Show loading state
  if (loading || excelLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Лизинговые компании</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление лизинговыми компаниями и просмотр их информации
            </p>
          </div>
          <LoadingState 
            message={loading ? "Загрузка списка лизинговых компаний..." : "Обработка Excel файла..."} 
            size="lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with consistent responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Лизинговые компании</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление лизинговыми компаниями и просмотр их информации
          </p>
          {excelError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Ошибка при работе с Excel
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {excelError}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* DataGrid component for leasing companies list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={leasingCompanies}
            columns={leasingCompaniesColumns}
            onAdd={handleAddLeasingCompany}
            onEdit={handleViewLeasingCompany} 
            onDelete={() => {}}
            onUploadExcel={handleUploadExcelAction}
            onDownloadExcel={handleDownloadExcelAction}
            pageSize={10}
            searchable={true}
            sortable={true}
            // No onDelete prop - disables delete functionality
          />
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default LeasingCompaniesPage;
