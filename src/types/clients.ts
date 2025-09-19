// Client management system types

// Version management for entities
export interface EntityVersion {
  id: string;
  number: number;
  startDate?: string; // начало периода действия (пустое для черновика)
  endDate?: string; // окончание периода действия (пустое для действующей и черновика, заполнено для архивной)
  status: 'draft' | 'active' | 'archived'; // черновик | действующая | архивная
  previousVersionId?: string;
  nextVersionId?: string;
}

// Client requisites based on legal form
export interface ClientRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp?: string;
  ogrn?: string;
  address: string;
  phone?: string;
  email?: string;
  // Additional fields based on OPF (legal form)
  [key: string]: any;
}

// Document types with flexible fields
export interface ClientDocument {
  id: string;
  type: 'registration' | 'license' | 'permit' | 'passport' | 'inn_certificate' | 'bank_statement' | 'financial_report' | 'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Dynamic fields based on document type
  issueDate?: string;
  expiryDate?: string;
}

// Attachment with preview support
export interface ClientAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  previewUrl?: string;
  canPreview: boolean;
}

// Client qualification data
export interface ClientQualification {
  id: string;
  leasingCompany: string; // Лизинговая компания
  accountTurnover: number; // оборот по счету
  revenue: number; // выручка
  hasLoss: boolean; // убыток/не убыток в отчетном периоде
  reportingPeriod: string;
}

// Leasing objects
export interface LeasingObject {
  id: string;
  name: string; // Наименование предмета лизинга
  identifiers: string[]; // идентификаторы
  contractPeriod: {
    from: string; // срок договора лизинга (с)
    to: string; // срок договора лизинга (по)
  };
  status: string; // статус
}

// Client entity with versioning support
export interface Client {
  id: string;
  opf: string; // ОПФ (legal form)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  version: EntityVersion;
  requisites: ClientRequisites;
  documents: ClientDocument[];
  attachments: ClientAttachment[];
  qualifications: ClientQualification[];
  leasingObjects: LeasingObject[];
}

// Component prop interfaces
export interface VersionComponentProps {
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

export interface ClientRequisitesCardProps {
  client: Client;
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
}

export interface DocumentCardProps {
  document: ClientDocument;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

export interface AttachmentPreviewProps {
  attachment: ClientAttachment;
  onView: (attachment: ClientAttachment) => void;
  onDelete?: (attachmentId: string) => void;
}