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
  { brand: 'Toyota', model: 'Camry', year: '2023', power: '249 л.с.', engineNumber: 'A25AFKS123456', cost: '3 200 000 ₽' },
  { brand: 'BMW', model: 'X5', year: '2022', power: '340 л.с.', engineNumber: 'B58B30M123456', cost: '6 800 000 ₽' },
  { brand: 'Mercedes-Benz', model: 'E200', year: '2021', power: '197 л.с.', engineNumber: 'M264E20DE123456', cost: '4 500 000 ₽' },
  { brand: 'Lada', model: 'Vesta', year: '2020', power: '122 л.с.', engineNumber: 'VAZ21179A123456', cost: '850 000 ₽' },
  { brand: 'Hyundai', model: 'Solaris', year: '2023', power: '123 л.с.', engineNumber: 'G4LC123456', cost: '1 450 000 ₽' },
  { brand: 'Kia', model: 'Sportage', year: '2022', power: '150 л.с.', engineNumber: 'G4FS123456', cost: '2 100 000 ₽' },
  { brand: 'Audi', model: 'A6', year: '2021', power: '249 л.с.', engineNumber: 'DNAA123456', cost: '5 200 000 ₽' },
  { brand: 'Volkswagen', model: 'Tiguan', year: '2020', power: '180 л.с.', engineNumber: 'CZEA123456', cost: '2 800 000 ₽' },
  { brand: 'Nissan', model: 'X-Trail', year: '2019', power: '171 л.с.', engineNumber: 'QR2534567', cost: '2 300 000 ₽' },
  { brand: 'Mazda', model: 'CX-5', year: '2023', power: '194 л.с.', engineNumber: 'PYR813456', cost: '2 650 000 ₽' }
];

export const mockWatercraftData: VehicleResult[] = [
  { brand: 'Yamaha', model: '242X', year: '2022', power: '360 л.с.', engineNumber: 'YAMWTR123456', cost: '4 200 000 ₽' },
  { brand: 'Sea Ray', model: 'SLX 280', year: '2021', power: '380 л.с.', engineNumber: 'SRWTR123456', cost: '8 500 000 ₽' },
  { brand: 'Bayliner', model: 'Element E18', year: '2020', power: '125 л.с.', engineNumber: 'BLWTR123456', cost: '1 800 000 ₽' },
  { brand: 'Azimut', model: 'Grande 27', year: '2023', power: '1900 л.с.', engineNumber: 'AZWTR123456', cost: '45 000 000 ₽' },
  { brand: 'Princess', model: 'V50', year: '2022', power: '1200 л.с.', engineNumber: 'PRWTR123456', cost: '28 000 000 ₽' },
  { brand: 'Sunseeker', model: 'Predator 55', year: '2021', power: '1450 л.с.', engineNumber: 'SSWTR123456', cost: '35 000 000 ₽' },
  { brand: 'Chaparral', model: '19 SSI', year: '2020', power: '200 л.с.', engineNumber: 'CHWTR123456', cost: '2 500 000 ₽' },
  { brand: 'MasterCraft', model: 'XT23', year: '2022', power: '430 л.с.', engineNumber: 'MCWTR123456', cost: '6 200 000 ₽' },
  { brand: 'Boston Whaler', model: '280 Vantage', year: '2021', power: '600 л.с.', engineNumber: 'BWWTR123456', cost: '12 000 000 ₽' },
  { brand: 'Regal', model: 'LS4', year: '2023', power: '350 л.с.', engineNumber: 'RGWTR123456', cost: '5 800 000 ₽' }
];

// Mock aircraft data
export const mockAircraftData: VehicleResult[] = [
  { brand: 'Airbus', model: 'A320', year: '2020', power: '27 000 л.с.', engineNumber: 'AIRCRAFT123001', cost: '120 000 000 ₽' },
  { brand: 'Boeing', model: '737 MAX', year: '2021', power: '28 000 л.с.', engineNumber: 'AIRCRAFT123002', cost: '135 000 000 ₽' },
  { brand: 'Sukhoi', model: 'Superjet 100', year: '2019', power: '18 000 л.с.', engineNumber: 'AIRCRAFT123003', cost: '85 000 000 ₽' },
  { brand: 'Cessna', model: '172 Skyhawk', year: '2022', power: '180 л.с.', engineNumber: 'AIRCRAFT123004', cost: '25 000 000 ₽' },
  { brand: 'Gulfstream', model: 'G650', year: '2023', power: '33 000 л.с.', engineNumber: 'AIRCRAFT123005', cost: '450 000 000 ₽' },
  { brand: 'Bombardier', model: 'Challenger 350', year: '2021', power: '31 000 л.с.', engineNumber: 'AIRCRAFT123006', cost: '180 000 000 ₽' },
  { brand: 'Dassault', model: 'Falcon 8X', year: '2020', power: '31 500 л.с.', engineNumber: 'AIRCRAFT123007', cost: '380 000 000 ₽' },
  { brand: 'Embraer', model: 'Phenom 300E', year: '2022', power: '20 000 л.с.', engineNumber: 'AIRCRAFT123008', cost: '95 000 000 ₽' },
  { brand: 'Antonov', model: 'An-148', year: '2019', power: '26 000 л.с.', engineNumber: 'AIRCRAFT123009', cost: '75 000 000 ₽' },
  { brand: 'Pilatus', model: 'PC-12', year: '2023', power: '1 200 л.с.', engineNumber: 'AIRCRAFT123010', cost: '35 000 000 ₽' }
];

// Mock leasing products for search results
export const mockLeasingProducts: LeasingProduct[] = [
  { id: 1, company: 'Сбер Лизинг', term: '36 месяцев', advance: '20%', paymentSchedule: 'Аннуитет', rate: '8.5%', agentFee: '2.5%', buyoutPayment: '150 000 ₽' },
  { id: 2, company: 'ВЭБ Лизинг', term: '48 месяцев', advance: '15%', paymentSchedule: 'Дегрессия', rate: '9.2%', agentFee: '3.0%', buyoutPayment: '200 000 ₽' },
  { id: 3, company: 'Альфа-Лизинг', term: '60 месяцев', advance: '25%', paymentSchedule: 'Сезонный график', rate: '7.8%', agentFee: '2.0%', buyoutPayment: '180 000 ₽' },
  { id: 4, company: 'Газпромбанк Лизинг', term: '24 месяца', advance: '30%', paymentSchedule: 'Аннуитет', rate: '10.0%', agentFee: '3.5%', buyoutPayment: '120 000 ₽' },
  { id: 5, company: 'ВТБ Лизинг', term: '36 месяцев', advance: '20%', paymentSchedule: 'Дегрессия', rate: '8.9%', agentFee: '2.8%', buyoutPayment: '160 000 ₽' },
  { id: 6, company: 'Райффайзен Лизинг', term: '48 месяцев', advance: '25%', paymentSchedule: 'Аннуитет', rate: '9.1%', agentFee: '2.3%', buyoutPayment: '190 000 ₽' },
  { id: 7, company: 'Юникредит Лизинг', term: '60 месяцев', advance: '10%', paymentSchedule: 'Сезонный график', rate: '7.5%', agentFee: '1.8%', buyoutPayment: '220 000 ₽' },
  { id: 8, company: 'Росбанк Лизинг', term: '36 месяцев', advance: '15%', paymentSchedule: 'Дегрессия', rate: '8.7%', agentFee: '2.7%', buyoutPayment: '140 000 ₽' },
  { id: 9, company: 'Открытие Лизинг', term: '48 месяцев', advance: '20%', paymentSchedule: 'Аннуитет', rate: '9.0%', agentFee: '2.4%', buyoutPayment: '170 000 ₽' },
  { id: 10, company: 'Тинькофф Лизинг', term: '24 месяца', advance: '30%', paymentSchedule: 'Дегрессия', rate: '10.2%', agentFee: '3.2%', buyoutPayment: '110 000 ₽' },
  { id: 11, company: 'Сбер Лизинг', term: '60 месяцев', advance: '25%', paymentSchedule: 'Сезонный график', rate: '7.9%', agentFee: '2.1%', buyoutPayment: '210 000 ₽' },
  { id: 12, company: 'ВЭБ Лизинг', term: '36 месяцев', advance: '15%', paymentSchedule: 'Аннуитет', rate: '8.8%', agentFee: '2.9%', buyoutPayment: '155 000 ₽' },
  { id: 13, company: 'Альфа-Лизинг', term: '48 месяцев', advance: '20%', paymentSchedule: 'Дегрессия', rate: '9.3%', agentFee: '2.6%', buyoutPayment: '185 000 ₽' },
  { id: 14, company: 'Газпромбанк Лизинг', term: '60 месяцев', advance: '25%', paymentSchedule: 'Аннуитет', rate: '7.6%', agentFee: '1.9%', buyoutPayment: '230 000 ₽' },
  { id: 15, company: 'ВТБ Лизинг', term: '24 месяца', advance: '30%', paymentSchedule: 'Сезонный график', rate: '10.1%', agentFee: '3.4%', buyoutPayment: '115 000 ₽' },
  { id: 16, company: 'Райффайзен Лизинг', term: '36 месяцев', advance: '20%', paymentSchedule: 'Дегрессия', rate: '8.6%', agentFee: '2.5%', buyoutPayment: '165 000 ₽' },
  { id: 17, company: 'Юникредит Лизинг', term: '48 месяцев', advance: '15%', paymentSchedule: 'Аннуитет', rate: '9.4%', agentFee: '2.8%', buyoutPayment: '195 000 ₽' },
  { id: 18, company: 'Росбанк Лизинг', term: '60 месяцев', advance: '25%', paymentSchedule: 'Сезонный график', rate: '7.7%', agentFee: '2.0%', buyoutPayment: '225 000 ₽' },
  { id: 19, company: 'Открытие Лизинг', term: '36 месяцев', advance: '20%', paymentSchedule: 'Дегрессия', rate: '8.4%', agentFee: '2.3%', buyoutPayment: '145 000 ₽' },
  { id: 20, company: 'Тинькофф Лизинг', term: '48 месяцев', advance: '10%', paymentSchedule: 'Аннуитет', rate: '9.5%', agentFee: '3.1%', buyoutPayment: '175 000 ₽' }
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

// Generate payment schedule for leasing
export const generatePaymentSchedule = (
  vehicleCost: string,
  product: any
): any => {
  // Parse vehicle cost
  const cost = parseInt(vehicleCost.replace(/\D/g, '')) || 2000000;
  
  // Parse product parameters
  const termMonths = parseInt(product.term.replace(/\D/g, '')) || 36;
  const advancePercent = parseInt(product.advance.replace(/\D/g, '')) || 20;
  const rate = parseFloat(product.rate.replace(/[^\d.,]/g, '').replace(',', '.')) || 8.5;
  
  // Calculate loan parameters
  const advanceAmount = Math.round(cost * advancePercent / 100);
  const loanAmount = cost - advanceAmount;
  const monthlyRate = rate / 100 / 12;
  
  // Calculate monthly payment based on payment schedule type
  let monthlyPayment: number;
  const schedule: any[] = [];
  
  if (product.paymentSchedule === 'Аннуитет') {
    // Annuity payment calculation
    monthlyPayment = Math.round(
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
    
    let balance = loanAmount;
    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = Math.round(balance * monthlyRate);
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      
      const date = new Date();
      date.setMonth(date.getMonth() + month);
      
      schedule.push({
        month,
        date: date.toLocaleDateString('ru-RU'),
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
    }
  } else if (product.paymentSchedule === 'Дегрессия') {
    // Decreasing payment calculation
    const principalPayment = Math.round(loanAmount / termMonths);
    let balance = loanAmount;
    
    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = Math.round(balance * monthlyRate);
      const totalPayment = principalPayment + interestPayment;
      balance = Math.max(0, balance - principalPayment);
      
      const date = new Date();
      date.setMonth(date.getMonth() + month);
      
      schedule.push({
        month,
        date: date.toLocaleDateString('ru-RU'),
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
    }
    
    monthlyPayment = schedule[0].payment; // First payment for display
  } else {
    // Seasonal schedule - simplified version
    monthlyPayment = Math.round(loanAmount * 1.1 / termMonths); // 10% markup for seasonal
    let balance = loanAmount;
    
    for (let month = 1; month <= termMonths; month++) {
      // Seasonal variation: higher payments in certain months
      const seasonalMultiplier = [6, 7, 8, 12].includes(month % 12) ? 1.3 : 0.8;
      const adjustedPayment = Math.round(monthlyPayment * seasonalMultiplier);
      const interestPayment = Math.round(balance * monthlyRate);
      const principalPayment = Math.max(0, adjustedPayment - interestPayment);
      balance = Math.max(0, balance - principalPayment);
      
      const date = new Date();
      date.setMonth(date.getMonth() + month);
      
      schedule.push({
        month,
        date: date.toLocaleDateString('ru-RU'),
        payment: adjustedPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
    }
  }
  
  const totalPayments = schedule.reduce((sum, item) => sum + item.payment, 0);
  const totalInterest = totalPayments - loanAmount;
  
  return {
    totalAmount: cost,
    advanceAmount,
    loanAmount,
    monthlyPayment,
    totalPayments,
    totalInterest,
    schedule: schedule.slice(0, 12) // Show first 12 months
  };
};
// Filter application function with value adaptation
export const applyFiltersToProducts = (products: LeasingProduct[], filters: any[]): LeasingProduct[] => {
  if (!filters || filters.length === 0) {
    return products;
  }

  // First, adapt product values to match filters
  const adaptedProducts = products.map(product => adaptProductToFilters(product, filters));

  // Then filter the adapted products
  return adaptedProducts.filter(product => {
    return filters.every(filter => {
      if (!filter.parameter || !filter.operator || (filter.value === '' && !['empty', 'not_empty'].includes(filter.operator))) {
        return true; // Skip incomplete filters
      }

      const productValue = getProductValue(product, filter.parameter);
      return applyFilterOperator(productValue, filter.operator, filter.value);
    });
  });
};

// Function to adapt product values based on filters
const adaptProductToFilters = (product: LeasingProduct, filters: any[]): LeasingProduct => {
  const adaptedProduct = { ...product };

  filters.forEach(filter => {
    if (!filter.parameter || !filter.operator || filter.value === '') {
      return;
    }

    switch (filter.parameter) {
      case 'term':
        if (filter.operator === 'eq') {
          adaptedProduct.term = `${filter.value} месяцев`;
        } else if (filter.operator === 'between') {
          const [min, max] = filter.value.split(',').map((v: string) => Number(v.trim()));
          const targetValue = Math.floor(Math.random() * (max - min + 1)) + min;
          adaptedProduct.term = `${targetValue} месяцев`;
        } else if (filter.operator === 'gte') {
          const minValue = Number(filter.value);
          const targetValue = minValue + Math.floor(Math.random() * 24); // Add up to 24 months
          adaptedProduct.term = `${targetValue} месяцев`;
        } else if (filter.operator === 'lte') {
          const maxValue = Number(filter.value);
          const targetValue = Math.max(12, maxValue - Math.floor(Math.random() * 12)); // Subtract up to 12 months, min 12
          adaptedProduct.term = `${targetValue} месяцев`;
        }
        break;

      case 'advance':
        if (filter.operator === 'eq') {
          adaptedProduct.advance = `${filter.value}%`;
        } else if (filter.operator === 'between') {
          const [min, max] = filter.value.split(',').map((v: string) => Number(v.trim()));
          const targetValue = Math.floor(Math.random() * (max - min + 1)) + min;
          adaptedProduct.advance = `${targetValue}%`;
        } else if (filter.operator === 'gte') {
          const minValue = Number(filter.value);
          const targetValue = minValue + Math.floor(Math.random() * (50 - minValue)); // Up to 50%
          adaptedProduct.advance = `${targetValue}%`;
        } else if (filter.operator === 'lte') {
          const maxValue = Number(filter.value);
          const targetValue = Math.max(5, maxValue - Math.floor(Math.random() * 10)); // Down to 5%
          adaptedProduct.advance = `${targetValue}%`;
        }
        break;

      case 'payment_schedule':
        if (filter.operator === 'eq') {
          const scheduleMap: { [key: string]: string } = {
            'degressive': 'Дегрессия',
            'seasonal': 'Сезонный график',
            'annuity': 'Аннуитет'
          };
          adaptedProduct.paymentSchedule = scheduleMap[filter.value] || filter.value;
        } else if (filter.operator === 'in') {
          const options = filter.value.split(',').map((v: string) => v.trim());
          const randomOption = options[Math.floor(Math.random() * options.length)];
          const scheduleMap: { [key: string]: string } = {
            'degressive': 'Дегрессия',
            'seasonal': 'Сезонный график',
            'annuity': 'Аннуитет'
          };
          adaptedProduct.paymentSchedule = scheduleMap[randomOption] || randomOption;
        }
        break;

      case 'rate':
        if (filter.operator === 'eq') {
          adaptedProduct.rate = `${filter.value}%`;
        } else if (filter.operator === 'between') {
          const [min, max] = filter.value.split(',').map((v: string) => Number(v.trim()));
          const targetValue = (Math.random() * (max - min) + min).toFixed(1);
          adaptedProduct.rate = `${targetValue}%`;
        } else if (filter.operator === 'gte') {
          const minValue = Number(filter.value);
          const targetValue = (minValue + Math.random() * 5).toFixed(1); // Add up to 5%
          adaptedProduct.rate = `${targetValue}%`;
        } else if (filter.operator === 'lte') {
          const maxValue = Number(filter.value);
          const targetValue = Math.max(1, maxValue - Math.random() * 2).toFixed(1); // Subtract up to 2%, min 1%
          adaptedProduct.rate = `${targetValue}%`;
        }
        break;

      case 'agent_fee':
        if (filter.operator === 'eq') {
          adaptedProduct.agentFee = `${filter.value}%`;
        } else if (filter.operator === 'between') {
          const [min, max] = filter.value.split(',').map((v: string) => Number(v.trim()));
          const targetValue = (Math.random() * (max - min) + min).toFixed(1);
          adaptedProduct.agentFee = `${targetValue}%`;
        } else if (filter.operator === 'gte') {
          const minValue = Number(filter.value);
          const targetValue = (minValue + Math.random() * 2).toFixed(1); // Add up to 2%
          adaptedProduct.agentFee = `${targetValue}%`;
        } else if (filter.operator === 'lte') {
          const maxValue = Number(filter.value);
          const targetValue = Math.max(0.5, maxValue - Math.random() * 1).toFixed(1); // Subtract up to 1%, min 0.5%
          adaptedProduct.agentFee = `${targetValue}%`;
        }
        break;

      case 'buyout_payment':
        if (filter.operator === 'eq') {
          adaptedProduct.buyoutPayment = `${Number(filter.value).toLocaleString('ru-RU')} ₽`;
        } else if (filter.operator === 'between') {
          const [min, max] = filter.value.split(',').map((v: string) => Number(v.trim()));
          const targetValue = Math.floor(Math.random() * (max - min + 1)) + min;
          adaptedProduct.buyoutPayment = `${targetValue.toLocaleString('ru-RU')} ₽`;
        } else if (filter.operator === 'gte') {
          const minValue = Number(filter.value);
          const targetValue = minValue + Math.floor(Math.random() * 100000); // Add up to 100k
          adaptedProduct.buyoutPayment = `${targetValue.toLocaleString('ru-RU')} ₽`;
        } else if (filter.operator === 'lte') {
          const maxValue = Number(filter.value);
          const targetValue = Math.max(50000, maxValue - Math.floor(Math.random() * 50000)); // Subtract up to 50k, min 50k
          adaptedProduct.buyoutPayment = `${targetValue.toLocaleString('ru-RU')} ₽`;
        }
        break;
    }
  });

  return adaptedProduct;
};

// Helper function to get product value by parameter
const getProductValue = (product: LeasingProduct, parameter: string): any => {
  switch (parameter) {
    case 'term':
      return parseInt(product.term.replace(/\D/g, '')) || 0;
    case 'advance':
      return parseInt(product.advance.replace(/\D/g, '')) || 0;
    case 'payment_schedule':
      return product.paymentSchedule.toLowerCase();
    case 'rate':
      return parseFloat(product.rate.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    case 'agent_fee':
      return parseFloat(product.agentFee.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    case 'buyout_payment':
      return parseInt(product.buyoutPayment.replace(/\D/g, '')) || 0;
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
      const [min, max] = filterValue.split(',').map((v: string) => Number(v.trim()));
      return Number(productValue) >= min && Number(productValue) <= max;
    case 'not_between':
      const [notMin, notMax] = filterValue.split(',').map((v: string) => Number(v.trim()));
      return Number(productValue) < notMin || Number(productValue) > notMax;
    case 'in':
      const inValues = filterValue.split(',').map((v: string) => v.trim());
      return inValues.includes(String(productValue));
    case 'not_in':
      const notInValues = filterValue.split(',').map((v: string) => v.trim());
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