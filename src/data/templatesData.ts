// Mock data for templates management

import type { TemplateCollection, Template } from '../types/templates';

// Mock data for template collections
export const templateCollectionsData: TemplateCollection[] = [
  {
    id: '1',
    leasingCompanyId: '1',
    leasingCompanyName: 'ООО "Альфа-Лизинг"',
    leasingObjectType: 'Легковые автомобили',
    templateNames: 'Шаблон VIN-кода; Шаблон технических характеристик; Шаблон документов',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    leasingCompanyId: '1',
    leasingCompanyName: 'ООО "Альфа-Лизинг"',
    leasingObjectType: 'Грузовые автомобили',
    templateNames: 'Шаблон VIN-кода; Шаблон грузоподъемности; Шаблон разрешений',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    leasingCompanyId: '2',
    leasingCompanyName: 'ПАО "Бета-Лизинг"',
    leasingObjectType: 'Воздушные суда',
    templateNames: 'Шаблон регистрационного номера; Шаблон сертификатов; Шаблон технических данных',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    leasingCompanyId: '2',
    leasingCompanyName: 'ПАО "Бета-Лизинг"',
    leasingObjectType: 'Морские суда',
    templateNames: 'Шаблон IMO номера; Шаблон классификационных сертификатов; Шаблон регистрации',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    leasingCompanyId: '3',
    leasingCompanyName: 'ООО "Гамма-Лизинг"',
    leasingObjectType: 'Строительная техника',
    templateNames: 'Шаблон серийного номера; Шаблон технических характеристик; Шаблон сертификатов соответствия',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock data for templates (for edit page)
export const templatesData: Template[] = [
  {
    id: '1',
    name: 'Шаблон VIN-кода',
    type: 'Легковые автомобили',
    keyIdentifier: 'VIN',
    additionalAttributes: 'Марка; Модель; Год выпуска; Цвет; Объем двигателя',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Шаблон технических характеристик',
    type: 'Легковые автомобили',
    keyIdentifier: 'VIN',
    additionalAttributes: 'Мощность; Крутящий момент; Расход топлива; Тип привода',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Шаблон документов',
    type: 'Легковые автомобили',
    keyIdentifier: 'VIN',
    additionalAttributes: 'ПТС; СТС; Страховка; Техосмотр',
    version: {
      id: 'v1',
      number: 1,
      status: 'active',
      startDate: '2024-01-01',
      endDate: undefined,
      previousVersionId: undefined,
      nextVersionId: undefined,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Available leasing object types for dropdowns
export const leasingObjectTypes = [
  { id: '1', name: 'Легковые автомобили', category: 'Транспорт' },
  { id: '2', name: 'Грузовые автомобили', category: 'Транспорт' },
  { id: '3', name: 'Воздушные суда', category: 'Авиация' },
  { id: '4', name: 'Морские суда', category: 'Судоходство' },
  { id: '5', name: 'Строительная техника', category: 'Оборудование' },
  { id: '6', name: 'Медицинское оборудование', category: 'Медицина' },
  { id: '7', name: 'IT-оборудование', category: 'Технологии' },
  { id: '8', name: 'Промышленное оборудование', category: 'Производство' },
];

// Available leasing companies for dropdowns
export const leasingCompanies = [
  { id: '1', name: 'ООО "Альфа-Лизинг"' },
  { id: '2', name: 'ПАО "Бета-Лизинг"' },
  { id: '3', name: 'ООО "Гамма-Лизинг"' },
  { id: '4', name: 'ООО "Дельта-Лизинг"' },
  { id: '5', name: 'ПАО "Эпсилон-Лизинг"' },
];
