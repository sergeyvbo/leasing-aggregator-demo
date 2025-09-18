// Core application types
export type PageType = 'login' | 'company-search' | 'leasing-subject' | 'leasing-search';

// Authentication interfaces
export interface LoginData {
  username: string;
  password: string;
}

// Company search interfaces
export interface CompanyData {
  inn: string;
  result: CompanyResult | null;
}

export interface CompanyResult {
  name: string;
  inn: string;
  kpp: string;
  okato: string;
  opf: string;
  address: string;
}

// Vehicle search interfaces
export interface VehicleData {
  vin: string;
  result: VehicleResult | null;
}

export interface VehicleResult {
  brand: string;
  model: string;
  year: string;
  power: string;
  engineNumber: string;
}

// Filter interfaces
export interface Filter {
  id: number;
  parameter: string;
  value: string;
}

// Leasing product interfaces
export interface LeasingProduct {
  id: number;
  company: string;
  term: string;
  monthlyPayment: string;
  buyoutRequired: string;
  initialPayment: string;
  rate: string;
}

// Icon component props
export interface IconProps {
  size?: number;
  className?: string;
}

// Re-export role types
export * from './roles';