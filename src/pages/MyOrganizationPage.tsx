import React, { useState } from 'react';
import { OrganizationRequisitesCard } from '../components/organization/OrganizationRequisitesCard';
import { OrganizationAttachmentsSection } from '../components/organization/OrganizationAttachmentsSection';
import EmployeeDataGrid from '../components/organization/EmployeeDataGrid';
import EmployeeModal from '../components/organization/EmployeeModal';
import EmployeeNotification from '../components/ui/EmployeeNotification';
import type { 
  Organization, 
  Employee, 
  EmployeeFormData, 
  MyOrganizationPageProps 
} from '../types/organization';
import type { EntityVersion } from '../types/clients';
import { 
  getOrganization, 
  getOrganizationByVersionId, 
  getAllEmployees
} from '../data/organizationData';

/**
 * MyOrganizationPage - Main component for organization management
 * 
 * Combines OrganizationRequisitesCard and employee management sections
 * Implements modal state management for add/edit employee functionality
 * Includes notification state management for user actions
 * Ensures proper responsive layout with organization card above employee grid
 * 
 * Requirements: 1.1, 2.1, 5.1, 5.2
 */
const MyOrganizationPage: React.FC<MyOrganizationPageProps> = () => {
  // Organization state
  const [organization, setOrganization] = useState<Organization>(getOrganization());
  const [currentVersion, setCurrentVersion] = useState<EntityVersion>(organization.version);
  
  // Employee state
  const [employees] = useState<Employee[]>(getAllEmployees());
  
  // Modal state management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  // Notification state management
  const [showNotification, setShowNotification] = useState(false);

  // Handle version changes for organization
  const handleVersionChange = (versionId: string) => {
    const versionOrganization = getOrganizationByVersionId(versionId);
    if (versionOrganization) {
      setOrganization(versionOrganization);
      setCurrentVersion(versionOrganization.version);
    }
  };

  // Handle add employee modal
  const handleAddEmployee = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddEmployeeSubmit = (_formData: EmployeeFormData) => {
    // In a real application, this would make an API call
    // For now, we just show the notification and close the modal
    setIsAddModalOpen(false);
    setShowNotification(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Handle edit employee modal
  const handleEditEmployee = (employee: Employee) => {
    console.log('Editing employee:', employee);
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  const handleEditEmployeeSubmit = (_formData: EmployeeFormData) => {
    // In a real application, this would make an API call
    // For now, we just show the notification and close the modal
    setIsEditModalOpen(false);
    setEditingEmployee(null);
    setShowNotification(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Handle delete employee
  const handleDeleteEmployee = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    // In a real application, this would make an API call
    // For now, we just show the notification
    setShowNotification(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
    
  };

  // Prepare initial data for edit modal
  const getEditModalInitialData = (): EmployeeFormData | undefined => {
    if (!editingEmployee) return undefined;
    
    return {
      fullName: editingEmployee.fullName,
      login: editingEmployee.login,
      role: editingEmployee.role
    };
  };

  // Handle upload from Excel action for employees
  const handleUploadEmployeesExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload employees from Excel clicked');
    alert('Функция загрузки сотрудников из Excel будет реализована');
  };

  // Handle download to Excel action for employees
  const handleDownloadEmployeesExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download employees to Excel clicked');
    alert('Функция выгрузки сотрудников в Excel будет реализована');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Container with proper responsive layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Моя организация
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Управление информацией об организации и сотрудниках
          </p>
        </div>

        {/* Organization Card Section */}
        <div className="mb-6 md:mb-8">
          <OrganizationRequisitesCard
            organization={organization}
            version={currentVersion}
            onVersionChange={handleVersionChange}
          />
        </div>

        {/* Organization Attachments Section */}
        <div className="mb-6 md:mb-8">
          <OrganizationAttachmentsSection
            attachments={organization.attachments}
            onAddAttachment={() => {
              // Mock implementation - in real app would open file picker
              console.log('Add attachment clicked');
            }}
            onDeleteAttachment={(attachmentId) => {
              // Mock implementation - in real app would delete attachment
              console.log('Delete attachment:', attachmentId);
            }}
          />
        </div>

        {/* Employee Management Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Сотрудники организации
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Управление доступом сотрудников к системе
              </p>
            </div>
          </div>

          {/* Employee Data Grid */}
          <div className="p-4 md:p-6">
            <EmployeeDataGrid
              employees={employees}
              onAddEmployee={handleAddEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              onUploadExcel={handleUploadEmployeesExcel}
              onDownloadExcel={handleDownloadEmployeesExcel}
            />
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAddEmployeeSubmit}
        title="Добавить нового сотрудника"
      />

      {/* Edit Employee Modal */}
      <EmployeeModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditEmployeeSubmit}
        initialData={getEditModalInitialData()}
        title="Редактировать сотрудника"
      />

      {/* Employee Action Notification */}
      <EmployeeNotification isVisible={showNotification} />
    </div>
  );
};

export default MyOrganizationPage;