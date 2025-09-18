import type { ColumnDefinition } from '../../components/DataGrid/types';
import { formatCurrency, formatDate } from '../../components/DataGrid/utils';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { Deal } from './types';

/**
 * Column configuration for deals table
 * This configuration is specific to deals but uses the reusable DataGrid component
 * Custom renderers use reusable utilities and components
 */
export const dealsColumns: ColumnDefinition<Deal>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 'w-20',
  },
  {
    key: 'client',
    title: 'Клиент',
    sortable: true,
  },
  {
    key: 'amount',
    title: 'Сумма',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(value)}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Статус',
    sortable: true,
    width: 'w-36',
    render: (value: string) => (
      <StatusBadge status={value} />
    ),
  },
  {
    key: 'date',
    title: 'Дата',
    sortable: true,
    width: 'w-28',
    render: (value: string) => (
      <span className="text-gray-600">
        {formatDate(value)}
      </span>
    ),
  },
];