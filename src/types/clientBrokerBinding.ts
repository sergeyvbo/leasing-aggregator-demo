// Client-Broker binding management types

import type { EntityVersion } from './clients';

// Client-Broker binding rule interface
export interface ClientBrokerBindingRule {
  id: string;
  leasingCompanyId: string;
  leasingCompanyName: string; // Полное наименование лизинговой компании
  clientInn: string; // ИНН клиента
  brokerId: string;
  brokerName: string; // Полное наименование брокера
  restriction: 'allow' | 'deny'; // 'закрепить' или 'запретить'
  version: EntityVersion;
  createdAt: string;
  updatedAt: string;
}

// Component prop interfaces
export interface ClientBrokerBindingPageProps {
  rules: ClientBrokerBindingRule[];
  onAddRule?: () => void;
  onEditRule?: (ruleId: string) => void;
  onDeleteRule?: (ruleId: string) => void;
  onVersionChange?: (ruleId: string, versionId: string) => void;
}

export interface ClientBrokerBindingDataGridProps {
  rules: ClientBrokerBindingRule[];
  onAddRule?: () => void;
  onEditRule?: (ruleId: string) => void;
  onDeleteRule?: (ruleId: string) => void;
  onUploadExcel?: () => void;
  onDownloadExcel?: () => void;
}

export interface ClientBrokerBindingActionsColumnProps {
  rule: ClientBrokerBindingRule;
  onEdit?: (ruleId: string) => void;
  onDelete?: (ruleId: string) => void;
}
