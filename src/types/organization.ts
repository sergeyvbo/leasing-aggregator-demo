// Organization management system types

import type { EntityVersion } from './clients';

// Employee role enumeration
export type EmployeeRole = 'Брокер' | 'Руководитель брокера' | 'Бизнес-администратор' | 'Технический администратор';

// Employee status enumeration
export type EmployeeStatus = 'Активен' | 'Ожидает активации';

// Organization attachment interface
export interface OrganizationAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url?: string;
  thumbnailUrl?: string;
}

// Organization requisites interface
export interface OrganizationRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp: string; // КПП
  ogrn: string; // ОГРН
  address: string; // Адрес
  phone: string; // Телефон
  email: string; // Email
  directorName: string; // ФИО директора
  foundationDate: string; // Дата основания
}

// Organization entity with versioning
export interface Organization {
  id: string;
  opf: string; // ОПФ (legal form)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  version: EntityVersion; // Reuse existing version type
  requisites: OrganizationRequisites;
  attachments: OrganizationAttachment[];
}

// Employee interface
export interface Employee {
  id: string;
  fullName: string; // Полное имя
  login: string; // Логин
  role: EmployeeRole; // Роль
  status: EmployeeStatus; // Статус
  activeDealsCount: number; // Количество активных сделок
  isCurrentUser?: boolean; // Является ли текущим пользователем
}

// Employee form data for modals
export interface EmployeeFormData {
  fullName: string;
  login: string;
  role: EmployeeRole;
}

// Component prop interfaces
export interface MyOrganizationPageProps {
  // No props needed - self-contained page
}

export interface OrganizationRequisitesCardProps {
  organization: Organization;
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
}

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
  initialData?: EmployeeFormData;
  title: string;
}

export interface OrganizationAttachmentsSectionProps {
  attachments: OrganizationAttachment[];
  onAddAttachment?: () => void;
  onDeleteAttachment?: (attachmentId: string) => void;
}