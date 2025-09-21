// Leasing companies management system types

import type { EntityVersion } from './clients';

// Leasing company requisites interface
export interface LeasingCompanyRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp: string; // КПП
  ogrn: string; // ОГРН
  address: string; // Адрес
  phone: string; // Телефон
  email: string; // Email
  directorName: string; // ФИО директора
  foundationDate: string; // Дата основания
  licenseNumber?: string; // Номер лицензии
  licenseDate?: string; // Дата выдачи лицензии
  licenseExpiryDate?: string; // Дата окончания лицензии
}

// Leasing company attachment interface
export interface LeasingCompanyAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url?: string;
  thumbnailUrl?: string;
}

// Leasing company document interface
export interface LeasingCompanyDocument {
  id: string;
  type: 'license' | 'charter' | 'registration' | 'bank_statement' | 'financial_report' | 'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Dynamic fields based on document type
  issueDate?: string;
  expiryDate?: string;
  attachments?: LeasingCompanyAttachment[]; // Document-specific attachments
}

// Leasing company entity with versioning support
export interface LeasingCompany {
  id: string;
  opf: string; // ОПФ (legal form)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  version: EntityVersion;
  requisites: LeasingCompanyRequisites;
  documents: LeasingCompanyDocument[];
  attachments: LeasingCompanyAttachment[];
}

// Component prop interfaces
export interface LeasingCompanyRequisitesCardProps {
  leasingCompany: LeasingCompany;
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
}

export interface LeasingCompanyAttachmentsSectionProps {
  attachments: LeasingCompanyAttachment[];
  onAddAttachment?: () => void;
  onDeleteAttachment?: (attachmentId: string) => void;
}

export interface LeasingCompanyDocumentCardProps {
  document: LeasingCompanyDocument;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

export interface LeasingCompanyDocumentsSectionProps {
  documents: LeasingCompanyDocument[];
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
  onAddDocument?: () => void;
  onEditDocument?: (documentId: string) => void;
  onDeleteDocument?: (documentId: string) => void;
}

export interface LeasingCompanyAttachmentPreviewProps {
  attachment: LeasingCompanyAttachment;
  onView: (attachment: LeasingCompanyAttachment) => void;
  onDelete?: (attachmentId: string) => void;
}
