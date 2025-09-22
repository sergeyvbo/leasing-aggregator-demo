import React, { useState } from 'react';
import type { Broker, BrokerEmployee, BrokerEmployeeFormData } from '../types/brokers';
import { BrokerRequisitesCard, BrokerAttachmentsSection, BrokerDocumentsSection, BrokerEmployeeDataGrid, BrokerEmployeeModal } from '../components/brokers';
import { getBrokerEmployees, approveBrokerEmployee, rejectBrokerEmployee } from '../data/brokerEmployeesData';

interface BrokerDetailsPageProps {
  broker: Broker;
  onBack: () => void;
  onVersionChange?: (versionId: string) => void;
}

const BrokerDetailsPage: React.FC<BrokerDetailsPageProps> = ({
  broker,
  onBack,
  onVersionChange
}) => {
  // Employee state management
  const [employees, setEmployees] = useState<BrokerEmployee[]>(getBrokerEmployees(broker.id));
  
  // Modal state management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<BrokerEmployee | null>(null);

  // Handle version change - this will update the broker data when version navigation occurs
  const handleVersionChange = (versionId: string) => {
    if (onVersionChange) {
      onVersionChange(versionId);
    }
  };

  // Handle employee approval
  const handleApproveEmployee = (employeeId: string) => {
    const success = approveBrokerEmployee(broker.id, employeeId);
    if (success) {
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.id === employeeId 
            ? { ...emp, status: 'Активен' as const }
            : emp
        )
      );
    }
  };

  // Handle employee rejection
  const handleRejectEmployee = (employeeId: string) => {
    const success = rejectBrokerEmployee(broker.id, employeeId);
    if (success) {
      setEmployees(prevEmployees => 
        prevEmployees.filter(emp => emp.id !== employeeId)
      );
    }
  };

  // Handle employee edit
  const handleEditEmployee = (employee: BrokerEmployee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  // Handle employee delete
  const handleDeleteEmployee = (employeeId: string) => {
    // TODO: Implement delete employee functionality
    console.log('Delete employee:', employeeId);
  };

  // Handle add employee
  const handleAddEmployee = () => {
    setIsAddModalOpen(true);
  };

  // Modal handlers
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  // Handle add employee submit
  const handleAddEmployeeSubmit = (data: BrokerEmployeeFormData) => {
    // TODO: Implement add employee functionality
    console.log('Add employee:', data);
    setIsAddModalOpen(false);
  };

  // Handle edit employee submit
  const handleEditEmployeeSubmit = (data: BrokerEmployeeFormData) => {
    // TODO: Implement edit employee functionality
    console.log('Edit employee:', data);
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  // Get initial data for edit modal
  const getEditModalInitialData = (): BrokerEmployeeFormData | undefined => {
    if (!editingEmployee) return undefined;
    return {
      fullName: editingEmployee.fullName,
      login: editingEmployee.login,
      role: editingEmployee.role
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with proper responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Header with back button and broker name - Enhanced for mobile */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:gap-4">
            {/* Back button - Enhanced for touch */}
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2 -mx-3 -my-2 transition-colors duration-200 font-medium min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm md:text-base">Назад к списку брокеров</span>
            </button>
            
            {/* Broker info - Responsive layout */}
            <div className="text-left md:text-right">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words leading-tight">
                {broker.fullName}
              </h1>
              <p className="text-sm text-gray-600 mt-1 break-words">
                {broker.opf} • ИНН: {broker.inn}
              </p>
              {/* Additional broker info */}
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                <span>Сделок: <span className="font-medium text-gray-900">{broker.dealsCount}</span></span>
                <span>Успешность: <span className="font-medium text-green-600">{broker.successRate}%</span></span>
                <span>Рейтинг: <span className="font-medium text-yellow-600">{broker.requisites.rating || '—'}/5 ⭐</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content sections with responsive spacing */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {/* Broker Requisites Section */}
          <section className="scroll-mt-6" id="requisites">
            <BrokerRequisitesCard
              broker={broker}
              version={broker.version}
              onVersionChange={handleVersionChange}
            />
          </section>

          {/* Attachments Section - Enhanced responsive layout */}
          <section className="scroll-mt-6" id="attachments">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 px-1">Сканы документов</h2>
              <BrokerAttachmentsSection 
                attachments={broker.attachments}
                onAddAttachment={() => {
                  // TODO: Implement add attachment functionality
                }}
                onDeleteAttachment={(_attachmentId: string) => {
                  // TODO: Implement delete attachment functionality
                }}
              />
            </div>
          </section>

          {/* Documents Section */}
          <section className="scroll-mt-6" id="documents">
            <BrokerDocumentsSection 
              documents={broker.documents}
              version={broker.version}
              onVersionChange={handleVersionChange}
              onAddDocument={() => {
                // TODO: Implement add document functionality
              }}
              onEditDocument={(_documentId: string) => {
                // TODO: Implement edit document functionality
              }}
              onDeleteDocument={(_documentId: string) => {
                // TODO: Implement delete document functionality
              }}
            />
          </section>

          {/* Employees Section */}
          <section className="scroll-mt-6" id="employees">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Section Header */}
              <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Сотрудники организации
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Управление сотрудниками брокерской организации
                  </p>
                </div>
              </div>

              {/* Employee Data Grid */}
              <div className="p-4 md:p-6">
                <BrokerEmployeeDataGrid
                  employees={employees}
                  onAddEmployee={handleAddEmployee}
                  onApproveEmployee={handleApproveEmployee}
                  onRejectEmployee={handleRejectEmployee}
                  onEditEmployee={handleEditEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Bottom spacing for better UX - Responsive */}
        <div className="h-6 md:h-8"></div>
      </div>

      {/* Add Employee Modal */}
      <BrokerEmployeeModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAddEmployeeSubmit}
        title="Добавить нового сотрудника"
      />

      {/* Edit Employee Modal */}
      <BrokerEmployeeModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditEmployeeSubmit}
        initialData={getEditModalInitialData()}
        title="Редактировать сотрудника"
      />
    </div>
  );
};

export default BrokerDetailsPage;