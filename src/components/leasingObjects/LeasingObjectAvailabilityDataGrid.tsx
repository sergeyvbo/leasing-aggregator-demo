import React from 'react';
import { DataGrid } from '../DataGrid';
import type { LeasingObjectAvailabilityDataGridProps } from '../../types/leasingObjects';

const LeasingObjectAvailabilityDataGrid: React.FC<LeasingObjectAvailabilityDataGridProps> = ({
  rules,
  onAddRule,
  onEditRule,
  onDeleteRule
}) => {
  const columns = [
    {
      key: 'leasingCompanyName' as keyof typeof rules[0],
      title: 'Лизинговая компания',
      sortable: true,
      width: 'w-1/2',
    },
    {
      key: 'objectTypeName' as keyof typeof rules[0],
      title: 'Предмет лизинга',
      sortable: true,
      width: 'w-1/2',
    },
  ];

  const handleEdit = (rule: typeof rules[0]) => {
    onEditRule(rule);
  };

  const handleDelete = (id: string | number) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      onDeleteRule(rule);
    }
  };

  return (
    <DataGrid
      data={rules}
      columns={columns}
      onAdd={onAddRule}
      onEdit={handleEdit}
      onDelete={handleDelete}
      pageSize={10}
      searchable={true}
      sortable={true}
    />
  );
};

export default LeasingObjectAvailabilityDataGrid;
