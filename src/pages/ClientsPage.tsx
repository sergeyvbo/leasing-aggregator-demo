import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { Client } from '../types/clients';
import { getAllClients } from '../data/clientsData';
import { formatCurrency } from '../components/DataGrid/utils';
import { LoadingState } from '../components/common';
import { useExcelData } from '../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

/**
 * Column configuration for clients table
 * Displays: Id, ОПФ, Полное наименование, ИНН, количество сделок, итого вознаграждение
 */
const clientsColumns: ColumnDefinition<Client>[] = [
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

interface ClientsPageProps {
  onViewClient?: (client: Client) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ onViewClient }) => {
  const [initialClients, setInitialClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<Client> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      // Проверяем обязательные поля
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
  const exportConfig: ExcelExportConfig<Client> = {
    fileName: 'clients',
    sheetName: 'Клиенты',
    transformData: (data: Client[]) => {
      return data.map(client => ({
        'ID': client.id,
        'ОПФ': client.opf,
        'Полное наименование': client.fullName,
        'ИНН': client.inn,
        'Количество сделок': client.dealsCount,
        'Итого вознаграждение': client.totalCommission,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: clients,
    isLoading: excelLoading,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
    updateData,
  } = useExcelData(initialClients, importConfig, exportConfig);

  // Simulate loading clients data
  useEffect(() => {
    const loadClients = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const clientsData = getAllClients();
      setInitialClients(clientsData);
      updateData(clientsData);
      setLoading(false);
    };

    loadClients();
  }, [updateData]);

  // Handle view client action - navigate to client details
  const handleViewClient = (client: Client) => {
    if (onViewClient) {
      onViewClient(client);
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
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Мои клиенты</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление клиентами и просмотр их информации
            </p>
          </div>
          <LoadingState 
            message={loading ? "Загрузка списка клиентов..." : "Обработка Excel файла..."} 
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Мои клиенты</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление клиентами и просмотр их информации
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
        
        {/* DataGrid component for clients list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={clients}
            columns={clientsColumns}
            onEdit={handleViewClient} // Using onEdit as "view" action since we only have view functionality
            onUploadExcel={handleUploadExcelAction}
            onDownloadExcel={handleDownloadExcelAction}
            onAdd={() => {}}
            pageSize={10}
            searchable={true}
            sortable={true}
            // No onAdd prop - disables add functionality as required
            // No onDelete prop - disables delete functionality
          />
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default ClientsPage;