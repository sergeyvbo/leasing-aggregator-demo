import React from 'react';
import type { Client } from '../types/clients';
import { ClientRequisitesCard, DocumentsSection, AttachmentsSection } from '../components/clients';
import QualificationDataGrid from '../components/clients/QualificationDataGrid';
import LeasingObjectsDataGrid from '../components/clients/LeasingObjectsDataGrid';

interface ClientDetailsPageProps {
  client: Client;
  onBack: () => void;
  onVersionChange?: (versionId: string) => void;
  onCreateDeal?: (inn: string) => void;
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({
  client,
  onBack,
  onVersionChange,
  onCreateDeal
}) => {
  // Handle version change - this will update the client data when version navigation occurs
  const handleVersionChange = (versionId: string) => {
    if (onVersionChange) {
      onVersionChange(versionId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with proper responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with back button and client name */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 -mx-2 -my-1 transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к списку клиентов
            </button>
            <div className="text-right">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                {client.fullName}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {client.opf} • ИНН: {client.inn}
              </p>
            </div>
          </div>
        </div>

        {/* Create Deal Button */}
        {onCreateDeal && (
          <div className="mb-8">
            <button
              onClick={() => onCreateDeal(client.inn)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Создать сделку
            </button>
          </div>
        )}

        {/* Main content sections with proper spacing and responsive layout */}
        <div className="space-y-8 lg:space-y-10">
          {/* Client Requisites Section */}
          <section className="scroll-mt-6" id="requisites">
            <ClientRequisitesCard
              client={client}
              version={client.version}
              onVersionChange={handleVersionChange}
            />
          </section>

          {/* Documents Section */}
          <section className="scroll-mt-6" id="documents">
            <DocumentsSection 
              documents={client.documents}
              version={client.version}
              onVersionChange={handleVersionChange}
              onAddDocument={() => {
                // TODO: Implement add document functionality
                console.log('Add document clicked');
              }}
              onEditDocument={(documentId) => {
                // TODO: Implement edit document functionality
                console.log('Edit document:', documentId);
              }}
              onDeleteDocument={(documentId) => {
                // TODO: Implement delete document functionality
                console.log('Delete document:', documentId);
              }}
            />
          </section>

          {/* Attachments Section */}
          <section className="scroll-mt-6" id="attachments">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Сканы документов</h2>
              <AttachmentsSection 
                attachments={client.attachments}
                onAddAttachment={() => {
                  // TODO: Implement add attachment functionality
                  console.log('Add attachment clicked');
                }}
                onDeleteAttachment={(attachmentId) => {
                  // TODO: Implement delete attachment functionality
                  console.log('Delete attachment:', attachmentId);
                }}
              />
            </div>
          </section>

          {/* Qualification Section */}
          <section className="scroll-mt-6" id="qualification">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Квалификация</h2>
              <QualificationDataGrid qualifications={client.qualifications} />
            </div>
          </section>

          {/* Leasing Objects Section */}
          <section className="scroll-mt-6" id="leasing-objects">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Предметы лизинга</h2>
              <LeasingObjectsDataGrid leasingObjects={client.leasingObjects} />
            </div>
          </section>
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;