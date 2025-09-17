// Page navigation types
export type PageType = 'login' | 'company-search' | 'leasing-subject' | 'leasing-search';

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
}

export interface VehicleData {
  searchQuery: string; // Универсальное поле для поиска (VIN, название и т.д.)
  result: VehicleResult | null;
}

// Filter types
export interface Filter {
  id: number;
  parameter: string;
  value: string;
}

// Leasing product types
export interface LeasingProduct {
  id: number;
  company: string;
  term: string;
  monthlyPayment: string;
  buyoutRequired: string;
  initialPayment: string;
  rate: string;
}