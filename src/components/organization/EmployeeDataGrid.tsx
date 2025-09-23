import React from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { ColumnDefinition, SummaryConfig } from '../DataGrid/types';
import type { Employee } from '../../types/organization';
import { EmptyState } from '../common';

interface EmployeeDataGridProps {
  employees: Employee[];
  onAddEmployee?: () => void;
  onEditEmployee?: (employee: Employee) => void;
  onDeleteEmployee?: (employeeId: string) => void;
  onUploadExcel?: () => void;
  onDownloadExcel?: () => void;
}

const EmployeeDataGrid: React.FC<EmployeeDataGridProps> = ({ 
  employees, 
  onAddEmployee, 
  onEditEmployee, 
  onDeleteEmployee,
  onUploadExcel,
  onDownloadExcel
}) => {
  // Format role with color coding
  const formatRole = (role: string): React.ReactNode => {
    const roleColors: Record<string, string> = {
      'Брокер': 'bg-blue-100 text-blue-800',
      'Руководитель брокера': 'bg-purple-100 text-purple-800',
      'Бизнес-администратор': 'bg-green-100 text-green-800',
      'Технический администратор': 'bg-orange-100 text-orange-800'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        roleColors[role] || 'bg-gray-100 text-gray-800'
      }`}>
        {role}
      </span>
    );
  };

  // Format status with color coding
  const formatStatus = (status: string): React.ReactNode => {
    const statusColors: Record<string, string> = {
      'Активен': 'bg-green-100 text-green-800',
      'Ожидает активации': 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        statusColors[status] || 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    );
  };

  // Format full name with current user indicator
  const formatFullName = (fullName: string, employee: Employee): React.ReactNode => {
    return (
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-900">{fullName}</span>
        {employee.isCurrentUser && (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
            Вы
          </span>
        )}
      </div>
    );
  };

  // Column definitions for employee data
  const columns: ColumnDefinition<Employee>[] = [
    {
      key: 'fullName',
      title: 'Полное имя',
      sortable: true,
      width: 'w-1/4',
      render: (value: string, employee: Employee) => formatFullName(value, employee),
    },
    {
      key: 'login',
      title: 'Логин',
      sortable: true,
      width: 'w-1/6',
      render: (value: string) => (
        <span className="font-mono text-sm text-gray-700">{value}</span>
      ),
    },
    {
      key: 'role',
      title: 'Роль',
      sortable: true,
      width: 'w-1/4',
      render: (value: string) => formatRole(value),
    },
    {
      key: 'status',
      title: 'Статус',
      sortable: true,
      width: 'w-1/6',
      render: (value: string) => formatStatus(value),
    },
    {
      key: 'activeDealsCount',
      title: 'Активные сделки',
      sortable: true,
      width: 'w-1/6',
      render: (value: number) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
  ];

  // Summary configuration for employee statistics
  const summaryConfig: SummaryConfig<Employee> = {
    calculate: (data: Employee[]) => ({
      totalEmployees: data.length,
      activeEmployees: data.filter(emp => emp.status === 'Активен').length,
      pendingEmployees: data.filter(emp => emp.status === 'Ожидает активации').length,
      totalActiveDeals: data.reduce((sum, emp) => sum + emp.activeDealsCount, 0),
    }),
    render: (summaryData: Record<string, any>) => (
      <div className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <span className="text-sm font-medium text-gray-900">Итого сотрудников:</span>
          <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 space-y-2 sm:space-y-0 text-xs md:text-sm">
            <div className="break-words">
              <span className="text-gray-600">Всего: </span>
              <span className="font-medium text-gray-900">{summaryData.totalEmployees}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Активных: </span>
              <span className="font-medium text-green-700">{summaryData.activeEmployees}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Ожидают активации: </span>
              <span className="font-medium text-yellow-700">{summaryData.pendingEmployees}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Активных сделок: </span>
              <span className="font-medium text-blue-700">{summaryData.totalActiveDeals}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  // Custom edit handler that only allows editing current user
  const handleEdit = (employee: Employee) => {
    if (onEditEmployee) {
      onEditEmployee(employee);
    }
  };

  // Custom delete handler that only allows deleting current user
  const handleDelete = (employeeId: string | number) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee && onDeleteEmployee) {
      onDeleteEmployee(String(employeeId));
    }
  };

  // Handle empty state
  if (employees.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        }
        title="Нет сотрудников"
        description="В организации пока нет зарегистрированных сотрудников."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <DataGrid
        data={employees}
        columns={columns}
        onAdd={onAddEmployee}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUploadExcel={onUploadExcel}
        onDownloadExcel={onDownloadExcel}
        searchable={true}
        sortable={true}
        pageSize={10}
        summary={summaryConfig}
        className="employee-grid min-w-full"
      />
    </div>
  );
};

export default EmployeeDataGrid;