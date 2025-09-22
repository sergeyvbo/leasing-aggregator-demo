export interface QuotationRange {
  id: string;
  leasingCompany: string;
  term: string; // Единицы измерения - сроковые (дней, месяцев, лет и так далее)
  rate: string; // Единицы измерения - проценты
  advance: string; // проценты
  agentFee: string; // проценты
  scheduleType: 'Дегрессия' | 'Сезонный график' | 'Аннуитет';
  buyoutPayment: string; // проценты
  version: number;
  status: 'draft' | 'active' | 'archived';
  startDate?: string;
  endDate?: string;
  previousVersionId?: string;
  nextVersionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRangePageProps {
  ranges: QuotationRange[];
  onAddRange: () => void;
  onEditRange: (id: string) => void;
  onDeleteRange: (id: string) => void;
}
