import React from 'react';
import { DataGrid } from '../DataGrid';
import type { TemplateEditDataGridProps, Template } from '../../types/templates';

/**
 * TemplateEditDataGrid component for editing individual templates
 * Shows template name, type, key identifier, and additional attributes
 */
export const TemplateEditDataGrid: React.FC<TemplateEditDataGridProps> = ({
  templates,
  onAddTemplate,
  onEditTemplate,
  onSave,
  onCancel,
}) => {
  // Define columns for the data grid
  const columns = [
    {
      key: 'name' as keyof Template,
      title: 'Наименование',
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'type' as keyof Template,
      title: 'Тип',
      sortable: true,
      render: (value: string) => (
        <div className="text-gray-700">{value}</div>
      ),
    },
    {
      key: 'keyIdentifier' as keyof Template,
      title: 'Ключевой идентификатор',
      sortable: true,
      render: (value: string) => (
        <div className="text-gray-700 font-mono text-sm">{value}</div>
      ),
    },
    {
      key: 'additionalAttributes' as keyof Template,
      title: 'Дополнительные атрибуты',
      sortable: false,
      render: (value: string) => (
        <div className="text-gray-600">
          {value.split(';').map((attr, index) => (
            <span key={index} className="block text-sm">
              {attr.trim()}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Отмена
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Сохранить
        </button>
      </div>

      {/* Data Grid */}
      <DataGrid
        data={templates}
        columns={columns}
        onAdd={onAddTemplate}
        onEdit={onEditTemplate}
        onDelete={() => {}}
        searchable={true}
        sortable={true}
        pageSize={10}
      />
    </div>
  );
};
