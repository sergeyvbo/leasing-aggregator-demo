import React from 'react';
import type { LeasingCompanyDocumentCardProps } from '../../types/leasingCompanies';

const LeasingCompanyDocumentCard: React.FC<LeasingCompanyDocumentCardProps> = ({
  document,
  onEdit,
  onDelete
}) => {
  const getDocumentTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      license: 'Лицензия',
      charter: 'Устав',
      registration: 'Регистрационные документы',
      bank_statement: 'Банковская выписка',
      financial_report: 'Финансовая отчетность',
      contract: 'Договор',
      other: 'Прочее'
    };
    return typeLabels[type] || type;
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'license':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'charter':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'financial_report':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Document Type Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            {getDocumentTypeIcon(document.type)}
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {document.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {getDocumentTypeLabel(document.type)}
            </p>
            
            {/* Document Fields */}
            {Object.keys(document.fields).length > 0 && (
              <div className="mt-2 space-y-1">
                {Object.entries(document.fields).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex text-xs">
                    <span className="font-medium text-gray-500 w-20 flex-shrink-0 truncate">
                      {key}:
                    </span>
                    <span className="text-gray-900 truncate">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </span>
                  </div>
                ))}
                {Object.keys(document.fields).length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{Object.keys(document.fields).length - 3} полей
                  </div>
                )}
              </div>
            )}

            {/* Dates */}
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
              {document.issueDate && (
                <span>Выдан: {formatDate(document.issueDate)}</span>
              )}
              {document.expiryDate && (
                <span>Действует до: {formatDate(document.expiryDate)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 ml-2">
          {onEdit && (
            <button
              onClick={() => onEdit(document.id)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              title="Редактировать документ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(document.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Удалить документ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeasingCompanyDocumentCard;
