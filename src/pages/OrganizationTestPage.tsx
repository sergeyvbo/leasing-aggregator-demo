import React from 'react';
import { OrganizationRequisitesCard, EmployeeModal, EmployeeDataGrid } from '../components/organization';
import { mockOrganization, getOrganizationByVersionId, mockEmployees } from '../data/organizationData';
import EmployeeNotification from '../components/ui/EmployeeNotification';
import { useEmployeeNotification } from '../hooks/useEmployeeNotification';
import type { EmployeeFormData, Employee } from '../types/organization';

/**
 * Test page to demonstrate OrganizationRequisitesCard functionality
 * This page shows the component working with mock data and version management
 */
export const OrganizationTestPage: React.FC = () => {
  const [currentOrganization, setCurrentOrganization] = React.useState(mockOrganization);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const { showNotification, notificationMessage, showEmployeeNotification } = useEmployeeNotification();

  const handleVersionChange = (versionId: string) => {
    const versionData = getOrganizationByVersionId(versionId);
    if (versionData) {
      setCurrentOrganization(versionData);
      console.log('Version changed to:', versionId, versionData);
    }
  };

  const handleAddEmployee = (data: EmployeeFormData) => {
    console.log('Adding employee:', data);
    setIsAddModalOpen(false);
    showEmployeeNotification('ADD');
  };

  const handleEditEmployee = (data: EmployeeFormData) => {
    console.log('Editing employee:', data);
    setIsEditModalOpen(false);
    showEmployeeNotification('EDIT');
  };

  const handleEditEmployeeFromGrid = (employee: Employee) => {
    const employeeData: EmployeeFormData = {
      fullName: employee.fullName,
      login: employee.login,
      role: employee.role
    };
    setMockEmployeeData(employeeData);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    console.log('Deleting employee:', employeeId);
    showEmployeeNotification('DELETE');
  };

  const [mockEmployeeData, setMockEmployeeData] = React.useState<EmployeeFormData>({
    fullName: 'Петров Петр Петрович',
    login: 'petrov',
    role: 'Брокер'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organization Requisites Card Test</h1>
          <p className="mt-2 text-gray-600">
            Testing the OrganizationRequisitesCard component with mock data and version management.
          </p>
        </div>
        
        <div className="space-y-6">
          <OrganizationRequisitesCard
            organization={currentOrganization}
            version={currentOrganization.version}
            onVersionChange={handleVersionChange}
          />
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Current Version Info</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Version ID:</strong> {currentOrganization.version.id}</p>
              <p><strong>Version Number:</strong> {currentOrganization.version.number}</p>
              <p><strong>Status:</strong> {currentOrganization.version.status}</p>
              <p><strong>Start Date:</strong> {currentOrganization.version.startDate || 'N/A'}</p>
              <p><strong>End Date:</strong> {currentOrganization.version.endDate || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Modal Test</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Test Add Employee Modal
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Test Edit Employee Modal
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Employee DataGrid</h3>
            <EmployeeDataGrid
              employees={mockEmployees}
              onAddEmployee={() => setIsAddModalOpen(true)}
              onEditEmployee={handleEditEmployeeFromGrid}
              onDeleteEmployee={handleDeleteEmployee}
            />
          </div>
        </div>

        {/* Employee Modals */}
        <EmployeeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEmployee}
          title="Добавить нового сотрудника"
        />

        <EmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditEmployee}
          initialData={mockEmployeeData}
          title="Редактировать сотрудника"
        />

        {/* Employee Notification */}
        <EmployeeNotification 
          isVisible={showNotification} 
          message={notificationMessage}
        />
      </div>
    </div>
  );
};

export default OrganizationTestPage;