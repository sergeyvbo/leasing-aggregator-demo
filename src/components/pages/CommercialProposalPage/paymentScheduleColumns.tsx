import type { ColumnDefinition } from '../../DataGrid/types';
import type { PaymentScheduleItem } from './types';

/**
 * Column configuration for payment schedule table in commercial proposal
 */
export const paymentScheduleColumns: ColumnDefinition<PaymentScheduleItem>[] = [
  {
    key: 'month',
    title: 'Месяц',
    sortable: true,
    width: 'w-20',
    render: (value: number) => (
      <span className="font-medium text-gray-900">
        {value}
      </span>
    ),
  },
  {
    key: 'date',
    title: 'Дата',
    sortable: true,
    width: 'w-28',
    render: (value: string) => (
      <span className="text-gray-600">
        {value}
      </span>
    ),
  },
  {
    key: 'payment',
    title: 'Платеж',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="font-medium text-right block">
        {value.toLocaleString('ru-RU')} ₽
      </span>
    ),
  },
  {
    key: 'principal',
    title: 'Основной долг',
    sortable: true,
    width: 'w-36',
    render: (value: number) => (
      <span className="text-right block">
        {value.toLocaleString('ru-RU')} ₽
      </span>
    ),
  },
  {
    key: 'interest',
    title: 'Проценты',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="text-right block">
        {value.toLocaleString('ru-RU')} ₽
      </span>
    ),
  },
  {
    key: 'balance',
    title: 'Остаток',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="text-right block">
        {value.toLocaleString('ru-RU')} ₽
      </span>
    ),
  },
];