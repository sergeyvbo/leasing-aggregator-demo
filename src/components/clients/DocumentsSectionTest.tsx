import React from 'react';
import { DocumentsSection } from './DocumentsSection';
import type { ClientDocument, EntityVersion } from '../../types/clients';

// Test data
const mockVersion: EntityVersion = {
  id: 'v1',
  number: 1,
  date: '2024-01-15',
  status: 'active',
  previousVersionId: undefined,
  nextVersionId: 'v2'
};

const mockDocuments: ClientDocument[] = [
  {
    id: 'doc1',
    type: 'registration',
    title: 'Свидетельство о регистрации',
    fields: {
      series: 'АА',
      number: '123456',
      issuer: 'Налоговая служба'
    },
    issueDate: '2020-01-15',
    expiryDate: undefined
  },
  {
    id: 'doc2',
    type: 'license',
    title: 'Лицензия на деятельность',
    fields: {
      licenseNumber: 'Л-789',
      activity: 'Финансовые услуги'
    },
    issueDate: '2021-03-10',
    expiryDate: '2026-03-10'
  }
];

export const DocumentsSectionTest: React.FC = () => {
  const handleVersionChange = (versionId: string) => {
    console.log('Version changed to:', versionId);
  };

  const handleAddDocument = () => {
    console.log('Add document clicked');
  };

  const handleEditDocument = (documentId: string) => {
    console.log('Edit document:', documentId);
  };

  const handleDeleteDocument = (documentId: string) => {
    console.log('Delete document:', documentId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Тест секции документов</h1>
      
      <DocumentsSection
        documents={mockDocuments}
        version={mockVersion}
        onVersionChange={handleVersionChange}
        onAddDocument={handleAddDocument}
        onEditDocument={handleEditDocument}
        onDeleteDocument={handleDeleteDocument}
      />
    </div>
  );
};

export default DocumentsSectionTest;