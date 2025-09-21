import React from 'react';
import type { LeasingCompany } from '../types/leasingCompanies';
import { LeasingCompanyRequisitesCard, LeasingCompanyAttachmentsSection, LeasingCompanyDocumentsSection } from '../components/leasingCompanies';
import { getLeasingCompanyWithVersion } from '../data/leasingCompaniesData';

interface LeasingCompanyDetailsPageProps {
  leasingCompany: LeasingCompany;
  onBack: () => void;
  onVersionChange?: (versionId: string) => void;
}

const LeasingCompanyDetailsPage: React.FC<LeasingCompanyDetailsPageProps> = ({
  leasingCompany,
  onBack,
  onVersionChange
}) => {
  // Handle version change - this will update the leasing company data when version navigation occurs
  const handleVersionChange = (versionId: string) => {
    if (onVersionChange) {
      onVersionChange(versionId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with proper responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Header with back button and company name - Enhanced for mobile */}
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
              <span className="text-sm md:text-base">Назад к списку лизинговых компаний</span>
            </button>
            
            {/* Company info - Responsive layout */}
            <div className="text-left md:text-right">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words leading-tight">
                {leasingCompany.fullName}
              </h1>
              <p className="text-sm text-gray-600 mt-1 break-words">
                {leasingCompany.opf} • ИНН: {leasingCompany.inn}
              </p>
            </div>
          </div>
        </div>

        {/* Main content sections with responsive spacing */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {/* Leasing Company Requisites Section */}
          <section className="scroll-mt-6" id="requisites">
            <LeasingCompanyRequisitesCard
              leasingCompany={leasingCompany}
              version={leasingCompany.version}
              onVersionChange={handleVersionChange}
            />
          </section>

          {/* Attachments Section - Enhanced responsive layout */}
          <section className="scroll-mt-6" id="attachments">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 px-1">Сканы документов</h2>
              <LeasingCompanyAttachmentsSection 
                attachments={leasingCompany.attachments}
                onAddAttachment={() => {
                  // TODO: Implement add attachment functionality
                }}
                onDeleteAttachment={(_attachmentId) => {
                  // TODO: Implement delete attachment functionality
                }}
              />
            </div>
          </section>

          {/* Documents Section */}
          <section className="scroll-mt-6" id="documents">
            <LeasingCompanyDocumentsSection 
              documents={leasingCompany.documents}
              version={leasingCompany.version}
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
        </div>

        {/* Bottom spacing for better UX - Responsive */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default LeasingCompanyDetailsPage;
