import React, { useState, useEffect } from 'react';
import type { Integration, IntegrationFormData } from '../types/integrations';
import { getAllIntegrations, createIntegration, updateIntegration, deleteIntegration } from '../data/integrationsData';
import { IntegrationsDataGrid, IntegrationModal } from '../components/integrations';
import { LoadingState } from '../components/common';

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | undefined>();

  // Load integrations data
  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const integrationsData = getAllIntegrations();
      setIntegrations(integrationsData);
      setLoading(false);
    };

    loadIntegrations();
  }, []);

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
        setIntegrations(prev => prev.filter(i => i.id !== Number(id)));
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
        setIntegrations(prev => prev.map(i => i.id === editingIntegration.id ? updatedIntegration : i));
      }
    } else {
      // Create new integration
      const newIntegration = createIntegration({
        name: formData.name,
        isActive: formData.isActive,
        description: formData.description,
        lastRunDate: null
      });
      
      setIntegrations(prev => [...prev, newIntegration]);
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
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload integrations from Excel clicked');
    alert('Функция загрузки интеграций из Excel будет реализована');
  };

  // Handle download to Excel
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download integrations to Excel clicked');
    alert('Функция выгрузки интеграций в Excel будет реализована');
  };

  // Show loading state
  if (loading) {
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
            message="Загрузка списка интеграций..." 
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
        </div>
        
        {/* DataGrid component for integrations list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <IntegrationsDataGrid
            integrations={integrations}
            onEdit={handleEditIntegration}
            onDelete={handleDeleteIntegration}
            onAdd={handleAddIntegration}
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
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
