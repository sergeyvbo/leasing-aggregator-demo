import React from 'react';
import type { ClientDocument } from '../../types/clients';
import { DocumentCard } from './DocumentCard';
import { EmptyState } from '../common';

interface DocumentsSectionProps {
  documents: ClientDocument[];
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  // Handle empty state
  if (!documents || documents.length === 0) {
    return (
      <EmptyState
        icon={
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        }
        title="Нет документов"
        description="У данного клиента пока нет загруженных документов"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Документы</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
};

export default DocumentsSection;