// Page navigation types
export type PageType = 'login' | 'company-search' | 'leasing-subject' | 'leasing-search' | 'commercial-proposal' | 'contract-signing';

// Login data
export interface LoginData {
  username: string;
  password: string;
}

// Company search types
export interface CompanyResult {
  name: string;
  inn: string;
  kpp: string;
  okato: string;
  opf: string;
  address: string;
}

export interface CompanyData {
  inn: string;
  result: CompanyResult[] | null;
}

// Vehicle search types
export interface VehicleResult {
  brand: string;
  model: string;
  year: string;
  power: string;
  engineNumber: string;
  cost: string;
  customCost?: string; // Пользовательская стоимость
}

export interface VehicleData {
  searchQuery: string; // Универсальное поле для поиска (VIN, название и т.д.)
  result: VehicleResult | null;
}

// Filter types
export interface Filter {
  id: number;
  parameter: string;
  operator: string;
  value: string;
}

// Leasing product types
export interface LeasingProduct {
  id: number;
  company: string;
  term: string;
  advance: string;
  paymentSchedule: string;
  rate: string;
  agentFee: string;
  buyoutPayment: string;
}

// Payment schedule types
export interface PaymentScheduleItem {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface PaymentSchedule {
  totalAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  advanceAmount: number;
  loanAmount: number;
  schedule: PaymentScheduleItem[];
}



// Filter configuration types
export interface FilterSelectOption {
  value: string;
  label: string;
}

export interface FilterParameter {
  value: string;
  label: string;
  type: 'number' | 'select' | 'text';
  unit?: string;
  options?: FilterSelectOption[];
}

export interface ComparisonOperator {
  value: string;
  label: string;
}

export interface FilterConfig {
  filterParameters: FilterParameter[];
  comparisonOperators: {
    number: ComparisonOperator[];
    select: ComparisonOperator[];
    text: ComparisonOperator[];
  };
}

// Re-export report types for consistency
export type { Report, ReportParameter, GeneratedReport } from './types/reports';