// Leasing objects management system types

import type { EntityVersion } from './clients';

// Leasing object type interface
export interface LeasingObjectType {
  id: string;
  name: string; // Название предмета лизинга
  category: string; // Категория (например, "Транспорт", "Оборудование")
  description?: string; // Описание
  isActive: boolean; // Активен ли тип предмета лизинга
}

// Leasing company object availability rule interface
export interface LeasingObjectAvailabilityRule {
  id: string;
  leasingCompanyId: string;
  leasingCompanyName: string; // Название лизинговой компании
  objectTypeId: string;
  objectTypeName: string; // Название предмета лизинга
  version: EntityVersion;
  createdAt: string;
  updatedAt: string;
}

// Component prop interfaces
export interface LeasingObjectAvailabilityDataGridProps {
  rules: LeasingObjectAvailabilityRule[];
  onAddRule: () => void;
  onEditRule: (rule: LeasingObjectAvailabilityRule) => void;
  onDeleteRule: (rule: LeasingObjectAvailabilityRule) => void;
}

export interface LeasingObjectAvailabilityPageProps {
  rules: LeasingObjectAvailabilityRule[];
  onAddRule: () => void;
  onEditRule: (rule: LeasingObjectAvailabilityRule) => void;
  onDeleteRule: (rule: LeasingObjectAvailabilityRule) => void;
}
