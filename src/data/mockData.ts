import type { CompanyResult, VehicleResult, LeasingProduct } from '../types';

// Mock company data for INN search
export const mockCompanyData: CompanyResult = {
  name: 'ООО "Ромашка"',
  inn: '7707049388',
  kpp: '770701001',
  okato: '45286585000',
  opf: 'Общество с ограниченной ответственностью',
  address: 'г. Москва, ул. Тверская, д. 15, стр. 1'
};

// Mock vehicle data for VIN search
export const mockVehicleData: VehicleResult = {
  brand: 'Toyota',
  model: 'Camry',
  year: '2023',
  power: '249 л.с.',
  engineNumber: 'A25AFKS123456'
};

// Mock leasing products for search results
export const mockLeasingProducts: LeasingProduct[] = [
  {
    id: 1,
    company: 'Сбер Лизинг',
    term: '36 месяцев',
    monthlyPayment: '45 000 ₽',
    buyoutRequired: 'Да',
    initialPayment: '20%',
    rate: '8.5%'
  },
  {
    id: 2,
    company: 'ВЭБ Лизинг',
    term: '48 месяцев',
    monthlyPayment: '38 500 ₽',
    buyoutRequired: 'Нет',
    initialPayment: '15%',
    rate: '9.2%'
  },
  {
    id: 3,
    company: 'Альфа-Лизинг',
    term: '60 месяцев',
    monthlyPayment: '33 200 ₽',
    buyoutRequired: 'Да',
    initialPayment: '25%',
    rate: '7.8%'
  }
];