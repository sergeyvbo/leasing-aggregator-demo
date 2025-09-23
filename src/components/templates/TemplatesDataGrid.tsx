import React from 'react';
import { DataGrid } from '../DataGrid';
import type { TemplatesDataGridProps, TemplateCollection } from '../../types/templates';

/**
 * TemplatesDataGrid component for displaying template collections
 * Shows leasing company, leasing object type, and template names
 */
export const TemplatesDataGrid: React.FC<TemplatesDataGridProps> = ({
  collections,
  onAddCollection,
  onEditCollection,
  onUploadExcel,
  onDownloadExcel,
}) => {
  // Define columns for the data grid
  const columns = [
    {
      key: 'leasingCompanyName' as keyof TemplateCollection,
      title: 'Лизинговая компания',
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'leasingObjectType' as keyof TemplateCollection,
      title: 'Предмет лизинга',
      sortable: true,
      render: (value: string) => (
        <div className="text-gray-700">{value}</div>
      ),
    },
    {
      key: 'templateNames' as keyof TemplateCollection,
      title: 'Коллекция шаблонов',
      sortable: false,
      render: (value: string) => (
        <div className="text-gray-600">
          {value.split(';').map((name, index) => (
            <span key={index} className="block text-sm">
              {name.trim()}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      data={collections}
      columns={columns}
      onAdd={onAddCollection}
      onEdit={onEditCollection}
      onDelete={()=>{}}
      onUploadExcel={onUploadExcel}
      onDownloadExcel={onDownloadExcel}
      searchable={true}
      sortable={true}
      pageSize={10}
    />
  );
};
