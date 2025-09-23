import type { RoleId } from './roles';

// User attachment interface
export interface UserAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  canPreview: boolean;
}

// User version interface
export interface UserVersion {
  id: string;
  number: number;
  status: 'draft' | 'active' | 'archived';
  startDate?: string;
  endDate?: string;
  previousVersionId?: string;
  nextVersionId?: string;
}

// Main User interface
export interface User {
  id: string;
  fullName: string;
  login: string;
  role: RoleId;
  version: UserVersion;
  attachments: UserAttachment[];
  createdAt: string;
  updatedAt: string;
}

// User form data for modal
export interface UserFormData {
  fullName: string;
  login: string;
  role: RoleId;
}

// User modal props
export interface UserModalProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

// User version component props
export interface UserVersionComponentProps {
  version: UserVersion;
  onVersionChange: (versionId: string) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

// User requisites card props
export interface UserRequisitesCardProps {
  user: User;
  version: UserVersion;
  onVersionChange: (versionId: string) => void;
}
