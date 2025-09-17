import type { CompanyResult, VehicleResult, LeasingProduct } from '../types';

// Mock company data for INN search
export const mockCompanyData: CompanyResult[] = [
  {
    name: 'ООО "Ромашка"',
    inn: '7707049388',
    kpp: '770701001',
    okato: '45286585000',
    opf: 'Общество с ограниченной ответственностью',
    address: 'г. Москва, ул. Тверская, д. 15, стр. 1'
  },
  {
    name: 'ООО "Альтаир"',
    inn: '7805123456',
    kpp: '780501001',
    okato: '40265565000',
    opf: 'Общество с ограниченной ответственностью',
    address: 'г. Санкт-Петербург, Невский проспект, д. 10'
  },
  {
    name: 'ЗАО "Протон"',
    inn: '5402123456',
    kpp: '540201001',
    okato: '50465565000',
    opf: 'Закрытое акционерное общество',
    address: 'г. Новосибирск, ул. Красный проспект, д. 22'
  },
  {
    name: 'АО "СтройИнвест"',
    inn: '2310123456',
    kpp: '231001001',
    okato: '30265565000',
    opf: 'Акционерное общество',
    address: 'г. Краснодар, ул. Северная, д. 5'
  },
  {
    name: 'ООО "ТехноПарк"',
    inn: '5023123456',
    kpp: '502301001',
    okato: '60265565000',
    opf: 'Общество с ограниченной ответственностью',
    address: 'г. Подольск, ул. Кирова, д. 8'
  },
  {
    name: 'ООО "ФинансГрупп"',
    inn: '7705123000',
    kpp: '770501001',
    okato: '45286586000',
    opf: 'Общество с ограниченной ответственностью',
    address: 'г. Москва, ул. Арбат, д. 20'
  },
  {
    name: 'АО "Энергия"',
    inn: '5001123456',
    kpp: '500101001',
    okato: '45265565000',
    opf: 'Акционерное общество',
    address: 'г. Жуковский, ул. Ленина, д. 3'
  },
  {
    name: 'ООО "Север"',
    inn: '2902123456',
    kpp: '290201001',
    okato: '40285565000',
    opf: 'Общество с ограниченной ответственностью',
    address: 'г. Архангельск, проспект Троицкий, д. 15'
  },
  {
    name: 'ЗАО "ЮгСтрой"',
    inn: '6103123456',
    kpp: '610301001',
    okato: '60285565000',
    opf: 'Закрытое акционерное общество',
    address: 'г. Ростов-на-Дону, ул. Большая Садовая, д. 12'
  },
  {
    name: 'АО "ВостокТранс"',
    inn: '2704123456',
    kpp: '270401001',
    okato: '70285565000',
    opf: 'Акционерное общество',
    address: 'г. Хабаровск, ул. Муравьева-Амурского, д. 7'
  }
];

// Mock vehicle data for VIN search
export const mockVehicleData: VehicleResult[] = [
  { brand: 'Toyota', model: 'Camry', year: '2023', power: '249 л.с.', engineNumber: 'A25AFKS123456' },
  { brand: 'BMW', model: 'X5', year: '2022', power: '340 л.с.', engineNumber: 'B58B30M123456' },
  { brand: 'Mercedes-Benz', model: 'E200', year: '2021', power: '197 л.с.', engineNumber: 'M264E20DE123456' },
  { brand: 'Lada', model: 'Vesta', year: '2020', power: '122 л.с.', engineNumber: 'VAZ21179A123456' },
  { brand: 'Hyundai', model: 'Solaris', year: '2023', power: '123 л.с.', engineNumber: 'G4LC123456' },
  { brand: 'Kia', model: 'Sportage', year: '2022', power: '150 л.с.', engineNumber: 'G4FS123456' },
  { brand: 'Audi', model: 'A6', year: '2021', power: '249 л.с.', engineNumber: 'DNAA123456' },
  { brand: 'Volkswagen', model: 'Tiguan', year: '2020', power: '180 л.с.', engineNumber: 'CZEA123456' },
  { brand: 'Nissan', model: 'X-Trail', year: '2019', power: '171 л.с.', engineNumber: 'QR2534567' },
  { brand: 'Mazda', model: 'CX-5', year: '2023', power: '194 л.с.', engineNumber: 'PYR813456' }
];

export const mockWatercraftData: VehicleResult[] = [
  { brand: 'Yamaha', model: '242X', year: '2022', power: '360 л.с.', engineNumber: 'YAMWTR123456' },
  { brand: 'Sea Ray', model: 'SLX 280', year: '2021', power: '380 л.с.', engineNumber: 'SRWTR123456' },
  { brand: 'Bayliner', model: 'Element E18', year: '2020', power: '125 л.с.', engineNumber: 'BLWTR123456' },
  { brand: 'Azimut', model: 'Grande 27', year: '2023', power: '1900 л.с.', engineNumber: 'AZWTR123456' },
  { brand: 'Princess', model: 'V50', year: '2022', power: '1200 л.с.', engineNumber: 'PRWTR123456' },
  { brand: 'Sunseeker', model: 'Predator 55', year: '2021', power: '1450 л.с.', engineNumber: 'SSWTR123456' },
  { brand: 'Chaparral', model: '19 SSI', year: '2020', power: '200 л.с.', engineNumber: 'CHWTR123456' },
  { brand: 'MasterCraft', model: 'XT23', year: '2022', power: '430 л.с.', engineNumber: 'MCWTR123456' },
  { brand: 'Boston Whaler', model: '280 Vantage', year: '2021', power: '600 л.с.', engineNumber: 'BWWTR123456' },
  { brand: 'Regal', model: 'LS4', year: '2023', power: '350 л.с.', engineNumber: 'RGWTR123456' }
];

// Mock aircraft data
export const mockAircraftData: VehicleResult[] = [
  { brand: 'Airbus', model: 'A320', year: '2020', power: '27 000 л.с.', engineNumber: 'AIRCRAFT123001' },
  { brand: 'Boeing', model: '737 MAX', year: '2021', power: '28 000 л.с.', engineNumber: 'AIRCRAFT123002' },
  { brand: 'Sukhoi', model: 'Superjet 100', year: '2019', power: '18 000 л.с.', engineNumber: 'AIRCRAFT123003' },
  { brand: 'Cessna', model: '172 Skyhawk', year: '2022', power: '180 л.с.', engineNumber: 'AIRCRAFT123004' },
  { brand: 'Gulfstream', model: 'G650', year: '2023', power: '33 000 л.с.', engineNumber: 'AIRCRAFT123005' },
  { brand: 'Bombardier', model: 'Challenger 350', year: '2021', power: '31 000 л.с.', engineNumber: 'AIRCRAFT123006' },
  { brand: 'Dassault', model: 'Falcon 8X', year: '2020', power: '31 500 л.с.', engineNumber: 'AIRCRAFT123007' },
  { brand: 'Embraer', model: 'Phenom 300E', year: '2022', power: '20 000 л.с.', engineNumber: 'AIRCRAFT123008' },
  { brand: 'Antonov', model: 'An-148', year: '2019', power: '26 000 л.с.', engineNumber: 'AIRCRAFT123009' },
  { brand: 'Pilatus', model: 'PC-12', year: '2023', power: '1 200 л.с.', engineNumber: 'AIRCRAFT123010' }
];

// Mock leasing products for search results
export const mockLeasingProducts: LeasingProduct[] = [
  { id: 1, company: 'Сбер Лизинг', term: '36 месяцев', monthlyPayment: '45 000 ₽', buyoutRequired: 'Да', initialPayment: '20%', rate: '8.5%' },
  { id: 2, company: 'ВЭБ Лизинг', term: '48 месяцев', monthlyPayment: '38 500 ₽', buyoutRequired: 'Нет', initialPayment: '15%', rate: '9.2%' },
  { id: 3, company: 'Альфа-Лизинг', term: '60 месяцев', monthlyPayment: '33 200 ₽', buyoutRequired: 'Да', initialPayment: '25%', rate: '7.8%' },
  { id: 4, company: 'Газпромбанк Лизинг', term: '24 месяца', monthlyPayment: '52 000 ₽', buyoutRequired: 'Нет', initialPayment: '30%', rate: '10.0%' },
  { id: 5, company: 'ВТБ Лизинг', term: '36 месяцев', monthlyPayment: '41 500 ₽', buyoutRequired: 'Да', initialPayment: '20%', rate: '8.9%' },
  { id: 6, company: 'Райффайзен Лизинг', term: '48 месяцев', monthlyPayment: '39 000 ₽', buyoutRequired: 'Нет', initialPayment: '25%', rate: '9.1%' },
  { id: 7, company: 'Юникредит Лизинг', term: '60 месяцев', monthlyPayment: '34 800 ₽', buyoutRequired: 'Да', initialPayment: '10%', rate: '7.5%' },
  { id: 8, company: 'Росбанк Лизинг', term: '36 месяцев', monthlyPayment: '43 200 ₽', buyoutRequired: 'Нет', initialPayment: '15%', rate: '8.7%' },
  { id: 9, company: 'Открытие Лизинг', term: '48 месяцев', monthlyPayment: '37 900 ₽', buyoutRequired: 'Да', initialPayment: '20%', rate: '9.0%' },
  { id: 10, company: 'Тинькофф Лизинг', term: '24 месяца', monthlyPayment: '55 000 ₽', buyoutRequired: 'Нет', initialPayment: '30%', rate: '10.2%' },
  { id: 11, company: 'Сбер Лизинг', term: '60 месяцев', monthlyPayment: '32 700 ₽', buyoutRequired: 'Да', initialPayment: '25%', rate: '7.9%' },
  { id: 12, company: 'ВЭБ Лизинг', term: '36 месяцев', monthlyPayment: '42 100 ₽', buyoutRequired: 'Нет', initialPayment: '15%', rate: '8.8%' },
  { id: 13, company: 'Альфа-Лизинг', term: '48 месяцев', monthlyPayment: '36 500 ₽', buyoutRequired: 'Да', initialPayment: '20%', rate: '9.3%' },
  { id: 14, company: 'Газпромбанк Лизинг', term: '60 месяцев', monthlyPayment: '33 800 ₽', buyoutRequired: 'Нет', initialPayment: '25%', rate: '7.6%' },
  { id: 15, company: 'ВТБ Лизинг', term: '24 месяца', monthlyPayment: '54 200 ₽', buyoutRequired: 'Да', initialPayment: '30%', rate: '10.1%' },
  { id: 16, company: 'Райффайзен Лизинг', term: '36 месяцев', monthlyPayment: '40 000 ₽', buyoutRequired: 'Нет', initialPayment: '20%', rate: '8.6%' },
  { id: 17, company: 'Юникредит Лизинг', term: '48 месяцев', monthlyPayment: '37 200 ₽', buyoutRequired: 'Да', initialPayment: '15%', rate: '9.4%' },
  { id: 18, company: 'Росбанк Лизинг', term: '60 месяцев', monthlyPayment: '35 500 ₽', buyoutRequired: 'Нет', initialPayment: '25%', rate: '7.7%' },
  { id: 19, company: 'Открытие Лизинг', term: '36 месяцев', monthlyPayment: '44 000 ₽', buyoutRequired: 'Да', initialPayment: '20%', rate: '8.4%' },
  { id: 20, company: 'Тинькофф Лизинг', term: '48 месяцев', monthlyPayment: '38 800 ₽', buyoutRequired: 'Нет', initialPayment: '10%', rate: '9.5%' }
];

// Utility functions for random data selection
export const getRandomCompanies = (count: number = 3): CompanyResult[] => {
  const shuffled = [...mockCompanyData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, mockCompanyData.length));
};

export const getRandomVehicle = (): VehicleResult => {
  const randomIndex = Math.floor(Math.random() * mockVehicleData.length);
  return mockVehicleData[randomIndex];
};

export const getRandomWatercraft = (): VehicleResult => {
  const randomIndex = Math.floor(Math.random() * mockWatercraftData.length);
  return mockWatercraftData[randomIndex];
};

export const getRandomAircraft = (): VehicleResult => {
  const randomIndex = Math.floor(Math.random() * mockAircraftData.length);
  return mockAircraftData[randomIndex];
};

export const getRandomLeasingProducts = (min: number = 2, max: number = 5): LeasingProduct[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...mockLeasingProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const searchCompaniesByInn = (inn: string): CompanyResult[] => {
  if (!inn || inn.length < 3) return [];

  // Simulate search by returning 1-3 random companies
  const count = Math.floor(Math.random() * 3) + 1;
  return getRandomCompanies(count);
};

export const searchVehicleByVin = (vin: string): VehicleResult => {
  if (!vin || vin.length < 10) {
    // Return a random vehicle even for invalid VIN to ensure result
    return getRandomVehicle();
  }

  // Always return a random vehicle for any VIN (guaranteed result)
  return getRandomVehicle();
};

export const searchWatercraftByName = (name: string): VehicleResult => {
  if (!name || name.length < 2) {
    // Return a random watercraft even for short names to ensure result
    return getRandomWatercraft();
  }

  // Always return a random watercraft for any name (guaranteed result)
  return getRandomWatercraft();
};

export const searchAircraftByName = (name: string): VehicleResult => {
  if (!name || name.length < 2) {
    // Return a random aircraft even for short names to ensure result
    return getRandomAircraft();
  }

  // Always return a random aircraft for any name (guaranteed result)
  return getRandomAircraft();
};
// Filter application function
export const applyFiltersToProducts = (products: LeasingProduct[], filters: any[]): LeasingProduct[] => {
  if (!filters || filters.length === 0) {
    return products;
  }

  return products.filter(product => {
    return filters.every(filter => {
      if (!filter.parameter || !filter.operator || (filter.value === '' && !['empty', 'not_empty'].includes(filter.operator))) {
        return true; // Skip incomplete filters
      }

      const productValue = getProductValue(product, filter.parameter);
      return applyFilterOperator(productValue, filter.operator, filter.value);
    });
  });
};

// Helper function to get product value by parameter
const getProductValue = (product: LeasingProduct, parameter: string): any => {
  switch (parameter) {
    case 'term':
      return parseInt(product.term.replace(/\D/g, '')) || 0;
    case 'payment':
      return parseInt(product.monthlyPayment.replace(/\D/g, '')) || 0;
    case 'buyout':
      return product.buyoutRequired.toLowerCase() === 'да' ? 'yes' : 'no';
    case 'initial':
      return parseInt(product.initialPayment.replace(/\D/g, '')) || 0;
    case 'rate':
      return parseFloat(product.rate.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    case 'company_type':
      // Mock company type based on company name
      if (product.company.includes('Банк')) return 'bank';
      if (product.company.includes('Лизинг')) return 'independent';
      return 'captive';
    default:
      return '';
  }
};

// Helper function to apply filter operator
const applyFilterOperator = (productValue: any, operator: string, filterValue: string): boolean => {
  switch (operator) {
    case 'eq':
      return productValue == filterValue;
    case 'ne':
      return productValue != filterValue;
    case 'gt':
      return Number(productValue) > Number(filterValue);
    case 'gte':
      return Number(productValue) >= Number(filterValue);
    case 'lt':
      return Number(productValue) < Number(filterValue);
    case 'lte':
      return Number(productValue) <= Number(filterValue);
    case 'between':
      const [min, max] = filterValue.split(',').map(v => Number(v.trim()));
      return Number(productValue) >= min && Number(productValue) <= max;
    case 'not_between':
      const [notMin, notMax] = filterValue.split(',').map(v => Number(v.trim()));
      return Number(productValue) < notMin || Number(productValue) > notMax;
    case 'in':
      const inValues = filterValue.split(',').map(v => v.trim());
      return inValues.includes(String(productValue));
    case 'not_in':
      const notInValues = filterValue.split(',').map(v => v.trim());
      return !notInValues.includes(String(productValue));
    case 'contains':
      return String(productValue).toLowerCase().includes(filterValue.toLowerCase());
    case 'not_contains':
      return !String(productValue).toLowerCase().includes(filterValue.toLowerCase());
    case 'starts':
      return String(productValue).toLowerCase().startsWith(filterValue.toLowerCase());
    case 'ends':
      return String(productValue).toLowerCase().endsWith(filterValue.toLowerCase());
    case 'empty':
      return !productValue || String(productValue).trim() === '';
    case 'not_empty':
      return productValue && String(productValue).trim() !== '';
    default:
      return true;
  }
};