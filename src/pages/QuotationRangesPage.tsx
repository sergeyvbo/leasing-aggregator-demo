import React from 'react';
import { QuotationRangesPage } from '../components/quotationRanges';
import type { QuotationRange } from '../types/quotationRanges';

// Mock data for demonstration
const mockQuotationRanges: QuotationRange[] = [
  {
    id: '1',
    leasingCompany: 'ООО "Альфа-Лизинг"',
    term: '12-36 месяцев',
    rate: '(8.5-12.5]%',
    advance: '(15-30)%, [35-50]%',
    agentFee: '(1.5-3]%, >5%',
    scheduleType: 'Аннуитет',
    buyoutPayment: '[2-5]%, <=1%',
    version: 1,
    status: 'active',
    startDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    leasingCompany: 'ПАО "Бета-Лизинг"',
    term: '24-60 месяцев',
    rate: '7.0-11.0%',
    advance: '20-40%',
    agentFee: '2.0-4.0%',
    scheduleType: 'Дегрессия',
    buyoutPayment: '2-8%',
    version: 1,
    status: 'active',
    startDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    leasingCompany: 'ООО "Гамма-Лизинг"',
    term: '6-24 месяца',
    rate: '9.0-13.0%',
    advance: '10-25%',
    agentFee: '1.0-2.5%',
    scheduleType: 'Сезонный график',
    buyoutPayment: '0.5-3%',
    version: 1,
    status: 'active',
    startDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const QuotationRangesPageWrapper: React.FC = () => {
  const handleAddRange = () => {
    console.log('Adding new quotation range');
  };

  const handleEditRange = (id: string) => {
    console.log('Editing quotation range:', id);
  };

  const handleDeleteRange = (id: string) => {
    console.log('Deleting quotation range:', id);
  };

  return (
    <QuotationRangesPage
      ranges={mockQuotationRanges}
      onAddRange={handleAddRange}
      onEditRange={handleEditRange}
      onDeleteRange={handleDeleteRange}
    />
  );
};

export default QuotationRangesPageWrapper;
