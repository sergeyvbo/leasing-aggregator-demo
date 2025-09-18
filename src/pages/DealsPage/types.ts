/**
 * Deal model types - specific to deals functionality
 * These types are separate from DataGrid to maintain component reusability
 */

export type DealStatus = 'В обработке' | 'Одобрено' | 'Отклонено' | 'Завершено';

export interface Deal {
  id: string;
  client: string;
  amount: number;
  status: DealStatus;
  date: string;
}

export interface DealFormData {
  client: string;
  amount: number;
  status: DealStatus;
  date: string;
}