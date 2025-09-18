import React from 'react';
import type { ClientDocument } from '../../types/clients';
import { documentTypeFields, documentFieldLabels, documentTypeLabels } from '../../data/documentTypes';

interface DocumentCardProps {
  document: ClientDocument;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  // Get the fields that should be displayed for this document type
  const fieldsToShow = documentTypeFields[document.type] || documentTypeFields.other;
  
  // Get the document type label
  const typeLabel = documentTypeLabels[document.type] || 'Документ';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Document header */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Document fields */}
      <div className="space-y-3">
        {fieldsToShow.map((fieldKey) => {
          const fieldValue = document.fields[fieldKey];
          const fieldLabel = documentFieldLabels[fieldKey] || fieldKey;
          
          // Skip fields that don't have values
          if (!fieldValue) {
            return null;
          }

          return (
            <div key={fieldKey} className="flex flex-col sm:flex-row sm:items-center">
              <dt className="text-sm font-medium text-gray-500 sm:w-1/3 sm:flex-shrink-0">
                {fieldLabel}:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-4">
                {fieldValue}
              </dd>
            </div>
          );
        })}
        
        {/* Show issue and expiry dates if they exist at the top level */}
        {document.issueDate && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <dt className="text-sm font-medium text-gray-500 sm:w-1/3 sm:flex-shrink-0">
              Дата выдачи:
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-4">
              {new Date(document.issueDate).toLocaleDateString('ru-RU')}
            </dd>
          </div>
        )}
        
        {document.expiryDate && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <dt className="text-sm font-medium text-gray-500 sm:w-1/3 sm:flex-shrink-0">
              Дата окончания:
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-4">
              {new Date(document.expiryDate).toLocaleDateString('ru-RU')}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;