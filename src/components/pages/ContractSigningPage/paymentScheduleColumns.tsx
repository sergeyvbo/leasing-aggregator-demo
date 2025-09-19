import type { ColumnDefinition } from '../../DataGrid/types';
import type { PaymentScheduleItem } from './types';

/**
 * Column configuration for payment schedule table
 */
export const paymentScheduleColumns: ColumnDefinition<PaymentScheduleItem>[] = [
  {
    key: 'number',
    title: '№',
    sortable: true,
    width: 'w-16',
  },
  {
    key: 'date',
    title: 'Дата платежа',
    sortable: true,
    width: 'w-32',
  },
  {
    key: 'amount',
    title: 'Сумма платежа, ₽',
    sortable: true,
    width: 'w-36',
    render: (value: number) => (
      <span className="font-medium text-gray-900 text-right block">
        {value.toLocaleString('ru-RU')}
      </span>
    ),
  },
  {
    key: 'principal',
    title: 'Основной долг, ₽',
    sortable: true,
    width: 'w-36',
    render: (value: number) => (
      <span className="text-gray-700 text-right block">
        {value.toLocaleString('ru-RU')}
      </span>
    ),
  },
  {
    key: 'interest',
    title: 'Проценты, ₽',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="text-gray-600 text-right block">
        {value.toLocaleString('ru-RU')}
      </span>
    ),
  },
];