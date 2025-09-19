// Report data types for broker reports feature

export interface ReportParameter {
  key: string;
  label: string;
  type: 'date' | 'select' | 'text' | 'number';
  required: boolean;
  options?: string[]; // for select type
  defaultValue?: any;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'operational' | 'analytical';
  lastGenerated?: Date;
  parameters: ReportParameter[];
}

export interface GeneratedReport {
  id: string;
  reportId: string;
  generatedAt: Date;
  parameters: Record<string, any>;
  data: any[];
  summary?: Record<string, any>;
}