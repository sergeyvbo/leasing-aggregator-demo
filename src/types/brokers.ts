// Brokers management system types

import type { EntityVersion } from './clients';
import type { EmployeeRole, EmployeeStatus } from './organization';

// Broker requisites interface
export interface BrokerRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp: string; // КПП
  ogrn: string; // ОГРН
  address: string; // Адрес
  phone: string; // Телефон
  email: string; // Email
  directorName: string; // ФИО директора
  foundationDate: string; // Дата основания
  licenseNumber?: string; // Номер лицензии брокера
  licenseDate?: string; // Дата выдачи лицензии
  licenseExpiryDate?: string; // Дата окончания лицензии
  specialization?: string; // Специализация (авто, недвижимость, оборудование)
  experience?: number; // Опыт работы в годах
  rating?: number; // Рейтинг брокера (1-5)
}

// Broker attachment interface
export interface BrokerAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url?: string;
  thumbnailUrl?: string;
}

// Broker document interface
export interface BrokerDocument {
  id: string;
  type: 'broker_license' | 'charter' | 'registration' | 'bank_statement' | 'financial_report' | 'contract' | 'certificate' | 'other';
  title: string;
  fields: Record<string, any>; // Dynamic fields based on document type
  issueDate?: string;
  expiryDate?: string;
  attachments?: BrokerAttachment[]; // Document-specific attachments
}

// Broker entity with versioning support
export interface Broker {
  id: string;
  opf: string; // ОПФ (legal form)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  successRate: number; // процент успешных сделок
  averageDealSize: number; // средний размер сделки
  version: EntityVersion;
  requisites: BrokerRequisites;
  documents: BrokerDocument[];
  attachments: BrokerAttachment[];
}

// Component prop interfaces
export interface BrokerRequisitesCardProps {
  broker: Broker;
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
}

export interface BrokerAttachmentsSectionProps {
  attachments: BrokerAttachment[];
  onAddAttachment?: () => void;
  onDeleteAttachment?: (attachmentId: string) => void;
}

export interface BrokerDocumentCardProps {
  document: BrokerDocument;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

export interface BrokerDocumentsSectionProps {
  documents: BrokerDocument[];
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
  onAddDocument?: () => void;
  onEditDocument?: (documentId: string) => void;
  onDeleteDocument?: (documentId: string) => void;
}

export interface BrokerAttachmentPreviewProps {
  attachment: BrokerAttachment;
  onView: (attachment: BrokerAttachment) => void;
  onDelete?: (attachmentId: string) => void;
}

// Broker employee interface
export interface BrokerEmployee {
  id: string;
  fullName: string; // Полное имя
  login: string; // Логин
  role: EmployeeRole; // Роль
  status: EmployeeStatus; // Статус
  activeDealsCount: number; // Количество активных сделок
  actions?: React.ReactNode; // Действия
}

// Broker employee management props
export interface BrokerEmployeeDataGridProps {
  employees: BrokerEmployee[];
  onAddEmployee?: () => void;
  onApproveEmployee?: (employeeId: string) => void;
  onRejectEmployee?: (employeeId: string) => void;
  onEditEmployee?: (employee: BrokerEmployee) => void;
  onDeleteEmployee?: (employeeId: string) => void;
}
