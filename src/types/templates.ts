// Templates management system types

import type { EntityVersion } from './clients';

// Template interface
export interface Template {
  id: string;
  name: string; // Наименование шаблона
  type: string; // Тип предмета лизинга
  keyIdentifier: string; // Ключевой идентификатор (VIN, кадастровый номер и т.д.)
  additionalAttributes: string; // Дополнительные атрибуты через ;
  version: EntityVersion;
  createdAt: string;
  updatedAt: string;
}

// Template collection interface (группа шаблонов)
export interface TemplateCollection {
  id: string;
  leasingCompanyId: string;
  leasingCompanyName: string; // Название лизинговой компании
  leasingObjectType: string; // Предмет лизинга
  templateNames: string; // Наименования шаблонов через ;
  version: EntityVersion;
  createdAt: string;
  updatedAt: string;
}

// Component prop interfaces
export interface TemplatesDataGridProps {
  collections: TemplateCollection[];
  onAddCollection: () => void;
  onEditCollection: (collection: TemplateCollection) => void;
  onDeleteCollection: (collection: TemplateCollection) => void;
  onUploadExcel?: (file: File) => Promise<void>;
  onDownloadExcel?: () => void;
}

export interface TemplatesPageProps {
  collections: TemplateCollection[];
  onAddCollection: () => void;
  onEditCollection: (collection: TemplateCollection) => void;
  onDeleteCollection: (collection: TemplateCollection) => void;
}

// Template edit page interfaces
export interface TemplateEditDataGridProps {
  templates: Template[];
  onAddTemplate: () => void;
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (template: Template) => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface TemplateEditPageProps {
  collection: TemplateCollection;
  templates: Template[];
  onSave: (templates: Template[]) => void;
  onCancel: () => void;
}
