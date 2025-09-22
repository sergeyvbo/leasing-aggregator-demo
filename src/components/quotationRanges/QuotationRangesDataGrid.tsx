import React from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { QuotationRange } from '../../types/quotationRanges';
import type { ColumnDefinition } from '../DataGrid/types';

interface QuotationRangesDataGridProps {
  ranges: QuotationRange[];
  onAddRange: () => void;
  onEditRange: (id: string) => void;
  onDeleteRange: (id: string) => void;
}

const QuotationRangesDataGrid: React.FC<QuotationRangesDataGridProps> = ({
  ranges,
  onAddRange,
  onEditRange,
  onDeleteRange,
}) => {
  const columns: ColumnDefinition<QuotationRange>[] = [
    {
      key: 'leasingCompany',
      title: 'Лизинговая компания',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'term',
      title: 'Срок',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'rate',
      title: 'Ставка',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'advance',
      title: 'Аванс',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'agentFee',
      title: 'Агентское вознаграждение',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'scheduleType',
      title: 'Тип графика',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'buyoutPayment',
      title: 'Выкупной платеж',
      sortable: true,
      width: 'w-1/6',
    },
  ];

  const handleEdit = (item: QuotationRange) => {
    onEditRange(item.id);
  };

  const handleDelete = (id: string | number) => {
    onDeleteRange(String(id));
  };

  return (
    <DataGrid
      data={ranges}
      columns={columns}
      onAdd={onAddRange}
      onEdit={handleEdit}
      onDelete={handleDelete}
      pageSize={10}
    />
  );
};

export default QuotationRangesDataGrid;
