import React, { useState } from 'react';
import type { OrganizationRequisitesCardProps } from '../../types/organization';
import { VersionComponent } from '../clients/VersionComponent';

/**
 * OrganizationRequisitesCard displays organization requisites information
 * Adapted from ClientRequisitesCard pattern for organization-specific data display
 * Includes integrated version navigation and editing functionality
 */
export const OrganizationRequisitesCard: React.FC<OrganizationRequisitesCardProps> = ({
  organization,
  version,
  onVersionChange
}) => {
  const { requisites, opf } = organization;
  const [isEditing, setIsEditing] = useState(false);
  const [editingRequisites, setEditingRequisites] = useState(requisites);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditingRequisites({ ...requisites });
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    // В реальном приложении здесь было бы сохранение данных
  };

  const handleFieldChange = (fieldKey: string, value: string) => {
    setEditingRequisites(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const currentRequisites = isEditing ? editingRequisites : requisites;

  // Define field labels for organization display
  const fieldLabels: Record<string, string> = {
    fullName: 'Полное наименование',
    inn: 'ИНН',
    kpp: 'КПП',
    ogrn: 'ОГРН',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Email',
    directorName: 'Руководитель',
    foundationDate: 'Дата основания'
  };

  // Get fields to display for organization (all fields are relevant for organizations)
  const getFieldsForOrganization = () => {
    return [
      'fullName',
      'inn',
      'kpp',
      'ogrn',
      'address',
      'phone',
      'email',
      'directorName',
      'foundationDate'
    ];
  };

  // Format field values for display
  const formatFieldValue = (key: string, value: any): string => {
    if (value === null || value === undefined) {
      return '—';
    }

    // Format dates
    if (key.includes('Date') && typeof value === 'string') {
      try {
        const date = new Date(value);
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      } catch {
        return value;
      }
    }

    return String(value);
  };

  const fieldsToDisplay = getFieldsForOrganization();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Card Header with Version Component - Enhanced for mobile */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Реквизиты организации</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1 break-words">
              Организационно-правовая форма: <span className="font-medium">{opf}</span>
            </p>
          </div>
        </div>
        
        {/* Version Component */}
        <div className="mt-3 md:mt-4">
          <VersionComponent
            version={version}
            onVersionChange={onVersionChange}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
          />
        </div>
      </div>

      {/* Card Content - Enhanced responsive grid */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {fieldsToDisplay.map((fieldKey) => {
            const value = currentRequisites[fieldKey as keyof typeof currentRequisites];
            const label = fieldLabels[fieldKey] || fieldKey;
            const isMandatory = ['fullName', 'inn'].includes(fieldKey);

            return (
              <div key={fieldKey} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                  {isMandatory && <span className="text-red-500 ml-1">*</span>}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                    className={`
                      w-full px-3 py-2 md:py-2 min-h-[44px] md:min-h-[40px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm touch-manipulation
                      ${isMandatory ? 'font-medium' : ''}
                    `}
                    placeholder={`Введите ${label.toLowerCase()}`}
                  />
                ) : (
                  <div className={`
                    px-3 py-2 md:py-2 min-h-[44px] md:min-h-[40px] border border-gray-200 rounded-md bg-gray-50 text-sm flex items-center break-words
                    ${isMandatory ? 'font-medium' : ''}
                  `}>
                    {formatFieldValue(fieldKey, value)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional fields that might be specific to this organization */}
        {Object.keys(currentRequisites).some(key => !fieldsToDisplay.includes(key)) && (
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 md:mb-4">Дополнительные поля</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {Object.entries(currentRequisites)
                .filter(([key]) => !fieldsToDisplay.includes(key))
                .map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {fieldLabels[key] || key}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full px-3 py-2 md:py-2 min-h-[44px] md:min-h-[40px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm touch-manipulation"
                        placeholder={`Введите ${(fieldLabels[key] || key).toLowerCase()}`}
                      />
                    ) : (
                      <div className="px-3 py-2 md:py-2 min-h-[44px] md:min-h-[40px] border border-gray-200 rounded-md bg-gray-50 text-sm flex items-center break-words">
                        {formatFieldValue(key, value)}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationRequisitesCard;