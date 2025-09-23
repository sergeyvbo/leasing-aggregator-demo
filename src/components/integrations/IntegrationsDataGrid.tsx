import React from 'react';
import type { IntegrationsDataGridProps, Integration } from '../../types/integrations';
import { DataGrid } from '../DataGrid';
import type { ColumnDefinition } from '../DataGrid/types';

// Status badge component
const StatusBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isActive
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {isActive ? 'Активен' : 'Неактивен'}
    </span>
  );
};

// Date formatter
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Никогда';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const IntegrationsDataGrid: React.FC<IntegrationsDataGridProps> = ({
  integrations,
  onEdit,
  onDelete,
  onAdd,
  onUploadExcel,
  onDownloadExcel,
  loading = false
}) => {
  // Wrapper function to convert DataGrid's onEdit signature to our expected signature
  const handleEdit = (integration: Integration) => {
    onEdit(integration);
  };

  // Wrapper function to convert DataGrid's onDelete signature to our expected signature
  const handleDelete = (id: string | number) => {
    onDelete(id);
  };
  // Define columns for the data grid
  const columns: ColumnDefinition<Integration>[] = [
    {
      key: 'name',
      title: 'Наименование',
      sortable: true,
      render: (_, integration) => (
        <div className="font-medium text-gray-900">
          {integration.name}
        </div>
      )
    },
    {
      key: 'isActive',
      title: 'Активность',
      sortable: true,
      render: (_, integration) => (
        <StatusBadge isActive={integration.isActive} />
      )
    },
    {
      key: 'lastRunDate',
      title: 'Дата последнего запуска',
      sortable: true,
      render: (_, integration) => (
        <div className="text-sm text-gray-600">
          {integration ? formatDate(integration.lastRunDate) : 'Никогда'}
        </div>
      )
    }
  ];

  return (
    <DataGrid
      data={integrations}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={onAdd}
      onUploadExcel={onUploadExcel}
      onDownloadExcel={onDownloadExcel}
      loading={loading}
      pageSize={10}
      searchable={true}
      sortable={true}
    />
  );
};

export default IntegrationsDataGrid;
