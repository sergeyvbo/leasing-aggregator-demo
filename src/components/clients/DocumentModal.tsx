import React, { useState, useEffect } from 'react';
import type { ClientDocument } from '../../types/clients';
import { documentTypeFields, documentFieldLabels, documentTypeLabels } from '../../data/documentTypes';

interface DocumentModalProps {
  document?: ClientDocument;
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: ClientDocument) => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<ClientDocument>>({
    type: 'other',
    title: '',
    fields: {},
    issueDate: '',
    expiryDate: ''
  });

  // Reset form when modal opens or document changes
  useEffect(() => {
    if (isOpen) {
      if (document) {
        // Edit mode
        setFormData({
          ...document
        });
      } else {
        // Add mode
        setFormData({
          type: 'other',
          title: '',
          fields: {},
          issueDate: '',
          expiryDate: ''
        });
      }
    }
  }, [isOpen, document]);

  // Get fields for current document type
  const currentFields = documentTypeFields[formData.type as string] || documentTypeFields.other;

  const handleTypeChange = (newType: string) => {
    setFormData(prev => ({
      ...prev,
      type: newType as ClientDocument['type'],
      fields: {} // Reset fields when type changes
    }));
  };

  const handleFieldChange = (fieldKey: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [fieldKey]: value
      }
    }));
  };

  const handleBasicFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.title?.trim()) {
      alert('Пожалуйста, укажите название документа');
      return;
    }

    const documentToSave: ClientDocument = {
      id: document?.id || `doc_${Date.now()}`,
      type: formData.type as ClientDocument['type'],
      title: formData.title,
      fields: formData.fields || {},
      issueDate: formData.issueDate || undefined,
      expiryDate: formData.expiryDate || undefined
    };

    onSave(documentToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {document ? 'Редактировать документ' : 'Добавить документ'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] md:p-1 flex items-center justify-center touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Основная информация</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип документа *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                  >
                    {Object.entries(documentTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название документа *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleBasicFieldChange('title', e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                    placeholder="Введите название документа"
                  />
                </div>
              </div>
            </div>

            {/* Document Type Specific Fields */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Реквизиты документа</h3>
              <div className="grid grid-cols-1 gap-4">
                {currentFields.map((fieldKey) => {
                  const fieldLabel = documentFieldLabels[fieldKey] || fieldKey;
                  const fieldValue = formData.fields?.[fieldKey] || '';
                  
                  // Skip issueDate and expiryDate as they are handled separately
                  if (fieldKey === 'issueDate' || fieldKey === 'expiryDate') {
                    return null;
                  }

                  return (
                    <div key={fieldKey}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {fieldLabel}
                      </label>
                      {fieldKey === 'description' ? (
                        <textarea
                          value={fieldValue}
                          onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                          rows={3}
                          className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation resize-y"
                          placeholder={`Введите ${fieldLabel.toLowerCase()}`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={fieldValue}
                          onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                          className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                          placeholder={`Введите ${fieldLabel.toLowerCase()}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dates */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Даты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата выдачи
                  </label>
                  <input
                    type="date"
                    value={formData.issueDate || ''}
                    onChange={(e) => handleBasicFieldChange('issueDate', e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate || ''}
                    onChange={(e) => handleBasicFieldChange('expiryDate', e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-4 md:p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-3 md:py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              {document ? 'Сохранить изменения' : 'Добавить документ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;