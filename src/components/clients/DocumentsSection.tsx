import React, { useState } from 'react';
import type { ClientDocument, EntityVersion } from '../../types/clients';
import { DocumentCard } from './DocumentCard';
import { EmptyState } from '../common';
import { VersionComponent } from './VersionComponent';
import DocumentModal from './DocumentModal';

interface DocumentsSectionProps {
  documents: ClientDocument[];
  version: EntityVersion;
  onVersionChange: (versionId: string) => void;
  onAddDocument?: () => void;
  onEditDocument?: (documentId: string) => void;
  onDeleteDocument?: (documentId: string) => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ 
  documents, 
  version, 
  onVersionChange,
  onAddDocument,
  onEditDocument,
  onDeleteDocument
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ClientDocument | undefined>(undefined);

  const handleAddDocument = () => {
    setSelectedDocument(undefined);
    setIsModalOpen(true);
  };

  const handleEditDocument = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(undefined);
  };

  const handleSaveDocument = (document: ClientDocument) => {
    // For demo purposes, just close the modal
    // In a real app, this would save to backend
    console.log('Saving document:', document);
    setIsModalOpen(false);
    setSelectedDocument(undefined);
    
    // Call the appropriate callback if provided
    if (selectedDocument && onEditDocument) {
      onEditDocument(document.id);
    } else if (!selectedDocument && onAddDocument) {
      onAddDocument();
    }
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Section Header with Version Component - Enhanced for mobile */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Документы</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1 break-words">
              Документооборот и регистрационные данные клиента
            </p>
          </div>
        </div>
        
        {/* Version Component */}
        <div className="mt-3 md:mt-4">
          <VersionComponent
            version={version}
            onVersionChange={onVersionChange}
          />
        </div>
      </div>

      {/* Section Content - Enhanced responsive padding */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        {/* Add Document Button - Enhanced for mobile */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={handleAddDocument}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 min-h-[44px] text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors touch-manipulation"
          >
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Добавить документ</span>
          </button>
        </div>

        {/* Documents Grid or Empty State */}
        {!documents || documents.length === 0 ? (
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
        ) : (
          <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {documents.map((document) => (
              <DocumentCard 
                key={document.id} 
                document={document}
                onEdit={handleEditDocument}
                onDelete={onDeleteDocument}
              />
            ))}
          </div>
        )}
      </div>

      {/* Document Modal */}
      <DocumentModal
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveDocument}
      />
    </div>
  );
};

export default DocumentsSection;