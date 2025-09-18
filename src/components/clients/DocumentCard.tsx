import React from 'react';
import type { ClientDocument } from '../../types/clients';
import { documentTypeFields, documentFieldLabels, documentTypeLabels } from '../../data/documentTypes';

interface DocumentCardProps {
  document: ClientDocument;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onEdit, onDelete }) => {
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
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2 mt-3">
          {onEdit && (
            <button
              onClick={() => onEdit(document.id)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Редактировать
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(document.id)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Удалить
            </button>
          )}
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