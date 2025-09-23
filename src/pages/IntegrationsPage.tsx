import React, { useState, useEffect } from 'react';
import type { Integration, IntegrationFormData } from '../types/integrations';
import { getAllIntegrations, createIntegration, updateIntegration, deleteIntegration } from '../data/integrationsData';
import { IntegrationsDataGrid, IntegrationModal } from '../components/integrations';
import { LoadingState } from '../components/common';
import { useExcelData } from '../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

const IntegrationsPage: React.FC = () => {
  const [initialIntegrations, setInitialIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | undefined>();

  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<Integration> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      data.forEach((item, index) => {
        if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
        if (!item.name) errors.push(`Строка ${index + 2}: отсутствует название`);
        if (!item.description) errors.push(`Строка ${index + 2}: отсутствует описание`);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },
    transformData: (data: any[]) => {
      return data.map(item => ({
        ...item,
        id: Number(item.id) || 0,
        isActive: Boolean(item.isActive),
        lastRunDate: item.lastRunDate || null,
      }));
    }
  };

  // Конфигурация для экспорта Excel
  const exportConfig: ExcelExportConfig<Integration> = {
    fileName: 'integrations',
    sheetName: 'Интеграции',
    transformData: (data: Integration[]) => {
      return data.map(integration => ({
        'ID': integration.id,
        'Название': integration.name,
        'Активна': integration.isActive ? 'Да' : 'Нет',
        'Описание': integration.description || '',
        'Последний запуск': integration.lastRunDate || 'Никогда',
        'Дата создания': integration.createdAt,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: integrations,
    isLoading: excelLoading,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
    updateData,
  } = useExcelData(initialIntegrations, importConfig, exportConfig);

  // Load integrations data
  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const integrationsData = getAllIntegrations();
      setInitialIntegrations(integrationsData);
      updateData(integrationsData);
      setLoading(false);
    };

    loadIntegrations();
  }, [updateData]);

  // Handle add integration
  const handleAddIntegration = () => {
    setEditingIntegration(undefined);
    setIsModalOpen(true);
  };

  // Handle edit integration
  const handleEditIntegration = (integration: Integration) => {
    setEditingIntegration(integration);
    setIsModalOpen(true);
  };

  // Handle delete integration
  const handleDeleteIntegration = (id: string | number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту интеграцию?')) {
      const success = deleteIntegration(Number(id));
      if (success) {
        updateData(integrations.filter(i => i.id !== Number(id)));
      }
    }
  };

  // Handle save integration
  const handleSaveIntegration = (formData: IntegrationFormData) => {
    if (editingIntegration) {
      // Update existing integration
      const updatedIntegration = updateIntegration(editingIntegration.id, {
        name: formData.name,
        isActive: formData.isActive,
        description: formData.description
      });
      
      if (updatedIntegration) {
        updateData(integrations.map(i => i.id === editingIntegration.id ? updatedIntegration : i));
      }
    } else {
      // Create new integration
      const newIntegration = createIntegration({
        name: formData.name,
        isActive: formData.isActive,
        description: formData.description,
        lastRunDate: null
      });
      
      updateData([...integrations, newIntegration]);
    }
    
    setIsModalOpen(false);
    setEditingIntegration(undefined);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIntegration(undefined);
  };

  // Handle upload from Excel
  const handleUploadExcelAction = async (file: File) => {
    await handleUploadExcel(file);
  };

  // Handle download to Excel
  const handleDownloadExcelAction = () => {
    handleDownloadExcel();
  };

  // Show loading state
  if (loading || excelLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Интеграции</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление интеграциями с внешними сервисами
            </p>
          </div>
          <LoadingState 
            message={loading ? "Загрузка списка интеграций..." : "Обработка Excel файла..."} 
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Интеграции</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление интеграциями с внешними сервисами для получения данных об автомобилях и организациях
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
        
        {/* DataGrid component for integrations list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <IntegrationsDataGrid
            integrations={integrations}
            onEdit={handleEditIntegration}
            onDelete={handleDeleteIntegration}
            onAdd={handleAddIntegration}
            onUploadExcel={handleUploadExcelAction}
            onDownloadExcel={handleDownloadExcelAction}
            loading={loading}
          />
        </div>

        {/* Integration Modal */}
        <IntegrationModal
          integration={editingIntegration}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveIntegration}
        />

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
