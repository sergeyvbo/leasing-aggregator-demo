// Integration entity
export interface Integration {
  id: number;
  name: string;
  isActive: boolean;
  lastRunDate: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Version component props for integrations
export interface IntegrationVersion {
  number: number;
  status: 'draft' | 'active' | 'archived';
  startDate?: string;
  endDate?: string;
  previousVersionId?: number;
  nextVersionId?: number;
}

export interface IntegrationVersionComponentProps {
  version: IntegrationVersion;
  onVersionChange: (versionId: number) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

// Integration form data
export interface IntegrationFormData {
  name: string;
  isActive: boolean;
  description: string;
}

// Integration modal props
export interface IntegrationModalProps {
  integration?: Integration;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IntegrationFormData) => void;
}

// Integration data grid props
export interface IntegrationsDataGridProps {
  integrations: Integration[];
  onEdit: (integration: Integration) => void;
  onDelete: (id: string | number) => void;
  onAdd: () => void;
  onUploadExcel: () => void;
  onDownloadExcel: () => void;
  loading?: boolean;
}
