import React, { useState } from 'react';
import { VersionComponent } from '../clients/VersionComponent';
import ClientBrokerBindingDataGrid from './ClientBrokerBindingDataGrid';
import ClientBrokerBindingModal from './ClientBrokerBindingModal';
import type { ClientBrokerBindingRule, ClientBrokerBindingPageProps } from '../../types/clientBrokerBinding';

const ClientBrokerBindingPage: React.FC<ClientBrokerBindingPageProps> = ({
  rules,
  onAddRule,
  onEditRule,
  onDeleteRule,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingRule, setEditingRule] = useState<ClientBrokerBindingRule | null>(null);



  const handleEditStart = () => {
    // Handle edit start if needed
  };

  const handleEditEnd = () => {
    // Handle edit end if needed
  };

  const handleAddRule = () => {
    setModalMode('add');
    setEditingRule(null);
    setIsModalOpen(true);
  };

  const handleEditRule = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      setModalMode('edit');
      setEditingRule(rule);
      setIsModalOpen(true);
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    if (onDeleteRule) {
      onDeleteRule(ruleId);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRule(null);
  };

  const handleModalSave = (ruleData: Omit<ClientBrokerBindingRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (modalMode === 'add' && onAddRule) {
      // В реальном приложении здесь был бы вызов API
      console.log('Adding rule:', ruleData);
      onAddRule();
    } else if (modalMode === 'edit' && onEditRule && editingRule) {
      // В реальном приложении здесь был бы вызов API
      console.log('Editing rule:', editingRule.id, ruleData);
      onEditRule(editingRule.id);
    }
  };

  // Handle upload from Excel action for binding rules
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload binding rules from Excel clicked');
    alert('Функция загрузки правил закрепления из Excel будет реализована');
  };

  // Handle download to Excel action for binding rules
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download binding rules to Excel clicked');
    alert('Функция выгрузки правил закрепления в Excel будет реализована');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Закрепление клиентов за брокерами в привязке к ЛК
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Управление правилами закрепления клиентов за брокерами по лизинговым компаниям
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Версионирование правила
          </h2>
          <VersionComponent
            version={{id: '1', number: 1, status: 'active', startDate: '01.09.2025', endDate: '31.12.2025'}}
            onVersionChange={()=>{}}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
          />
        </div>
      </div>


      {/* Data Grid */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Правила закрепления
          </h2>
          
          <ClientBrokerBindingDataGrid
            rules={rules}
            onAddRule={handleAddRule}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
          />
        </div>
      </div>

      {/* Modal */}
      <ClientBrokerBindingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        rule={editingRule}
        mode={modalMode}
      />
    </div>
  );
};

export default ClientBrokerBindingPage;
