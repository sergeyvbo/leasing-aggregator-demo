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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Header with back button and client name - Enhanced for mobile */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:gap-4">
            {/* Back button - Enhanced for touch */}
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2 -mx-3 -my-2 transition-colors duration-200 font-medium min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm md:text-base">Назад к списку клиентов</span>
            </button>
            
            {/* Client info - Responsive layout */}
            <div className="text-left md:text-right">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words leading-tight">
                {client.fullName}
              </h1>
              <p className="text-sm text-gray-600 mt-1 break-words">
                {client.opf} • ИНН: {client.inn}
              </p>
            </div>
          </div>
        </div>

        {/* Create Deal Button - Enhanced for mobile */}
        {onCreateDeal && (
          <div className="mb-6 md:mb-8">
            <button
              onClick={() => onCreateDeal(client.inn)}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm md:text-base">Создать сделку</span>
            </button>
          </div>
        )}

        {/* Main content sections with responsive spacing */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
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
              }}
              onEditDocument={(_documentId) => {
                // TODO: Implement edit document functionality
              }}
              onDeleteDocument={(_documentId) => {
                // TODO: Implement delete document functionality
              }}
            />
          </section>

          {/* Attachments Section - Enhanced responsive layout */}
          <section className="scroll-mt-6" id="attachments">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 px-1">Сканы документов</h2>
              <AttachmentsSection 
                attachments={client.attachments}
                onAddAttachment={() => {
                  // TODO: Implement add attachment functionality
                }}
                onDeleteAttachment={(_attachmentId) => {
                  // TODO: Implement delete attachment functionality
                }}
              />
            </div>
          </section>

          {/* Qualification Section - Enhanced responsive layout */}
          <section className="scroll-mt-6" id="qualification">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 px-1">Квалификация</h2>
              <div className="overflow-hidden">
                <QualificationDataGrid qualifications={client.qualifications} />
              </div>
            </div>
          </section>

          {/* Leasing Objects Section - Enhanced responsive layout */}
          <section className="scroll-mt-6" id="leasing-objects">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 px-1">Предметы лизинга</h2>
              <div className="overflow-hidden">
                <LeasingObjectsDataGrid leasingObjects={client.leasingObjects} />
              </div>
            </div>
          </section>
        </div>

        {/* Bottom spacing for better UX - Responsive */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;