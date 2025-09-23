import React, { useState } from 'react';
import { TemplatesDataGrid } from '../components/templates';
import { VersionComponent } from '../components/clients/VersionComponent';
import type { TemplatesPageProps, TemplateCollection } from '../types/templates';
import { useExcelData } from '../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

const TemplatesPage: React.FC<TemplatesPageProps> = ({
  collections,
  onAddCollection,
  onEditCollection,
  onDeleteCollection,
}) => {
  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<TemplateCollection> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      data.forEach((item, index) => {
        if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
        if (!item.leasingCompanyName) errors.push(`Строка ${index + 2}: отсутствует название лизинговой компании`);
        if (!item.leasingObjectType) errors.push(`Строка ${index + 2}: отсутствует предмет лизинга`);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },
    transformData: (data: any[]) => {
      return data.map(item => ({
        ...item,
        leasingCompanyId: item.leasingCompanyId || '',
        version: item.version || { id: '1', number: 1, status: 'active', createdAt: new Date().toISOString(), isActive: true },
      }));
    }
  };

  // Конфигурация для экспорта Excel
  const exportConfig: ExcelExportConfig<TemplateCollection> = {
    fileName: 'templates',
    sheetName: 'Шаблоны',
    transformData: (data: TemplateCollection[]) => {
      return data.map(collection => ({
        'ID': collection.id,
        'Лизинговая компания': collection.leasingCompanyName,
        'Предмет лизинга': collection.leasingObjectType,
        'Наименования шаблонов': collection.templateNames,
        'Дата создания': collection.createdAt,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: templateCollections,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
  } = useExcelData(collections, importConfig, exportConfig);

  // Mock version data for the page
  const [currentVersion] = useState({
    id: 'v1',
    number: 1,
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    status: 'active' as const,
    startDate: '2024-01-01',
    endDate: undefined,
    previousVersionId: undefined,
    nextVersionId: undefined,
  });

  const handleVersionChange = (versionId: string) => {
    console.log('Version changed to:', versionId);
  };

  const handleEditStart = () => {
    console.log('Edit started');
  };

  const handleEditEnd = () => {
    console.log('Edit ended');
  };

  const handleAddClick = () => {
    onAddCollection();
  };

  const handleEditClick = (collection: TemplateCollection) => {
    onEditCollection(collection);
  };

  // Handle upload from Excel action
  const handleUploadExcelAction = async (file: File) => {
    await handleUploadExcel(file);
  };

  // Handle download to Excel action
  const handleDownloadExcelAction = () => {
    handleDownloadExcel();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Шаблоны
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Управление шаблонами для различных предметов лизинга
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
          </div>
          
          {/* Version Component */}
          <div className="mt-4">
            <VersionComponent
              version={currentVersion}
              onVersionChange={handleVersionChange}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
            />
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <TemplatesDataGrid
        collections={templateCollections}
        onAddCollection={handleAddClick}
        onEditCollection={handleEditClick}
        onDeleteCollection={onDeleteCollection}
        onUploadExcel={handleUploadExcelAction}
        onDownloadExcel={handleDownloadExcelAction}
      />
    </div>
  );
};

export default TemplatesPage;
