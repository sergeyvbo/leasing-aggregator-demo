import React, { useState } from 'react';
import type { BrokerRequisitesCardProps } from '../../types/brokers';
import { VersionComponent } from '../clients/VersionComponent';

const BrokerRequisitesCard: React.FC<BrokerRequisitesCardProps> = ({
  broker,
  version,
  onVersionChange,
  isNewBroker = false
}) => {
  const { requisites, opf } = broker;
  const [isEditing, setIsEditing] = useState(isNewBroker);
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

  // Define field labels for display
  const fieldLabels: Record<string, string> = {
    fullName: 'Полное наименование',
    inn: 'ИНН',
    kpp: 'КПП',
    ogrn: 'ОГРН',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Email',
    directorName: 'Руководитель',
    foundationDate: 'Дата основания',
    licenseNumber: 'Номер лицензии брокера',
    licenseDate: 'Дата выдачи лицензии',
    licenseExpiryDate: 'Дата окончания лицензии',
    specialization: 'Специализация',
    experience: 'Опыт работы (лет)',
    rating: 'Рейтинг'
  };

  // Get fields to display for broker
  const getFieldsForBroker = () => {
    return [
      'fullName',
      'inn',
      'kpp',
      'ogrn',
      'address',
      'phone',
      'email',
      'directorName',
      'foundationDate',
      'licenseNumber',
      'licenseDate',
      'licenseExpiryDate',
      'specialization',
      'experience',
      'rating'
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

    // Format rating with stars
    if (key === 'rating' && typeof value === 'number') {
      return `${value}/5 ⭐`;
    }

    // Format experience
    if (key === 'experience' && typeof value === 'number') {
      return `${value} ${value === 1 ? 'год' : value < 5 ? 'года' : 'лет'}`;
    }

    return String(value);
  };

  const fieldsToDisplay = getFieldsForBroker();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Card Header with Version Component - Enhanced for mobile */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Реквизиты брокерской компании</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {fieldsToDisplay.map((fieldKey) => {
            const label = fieldLabels[fieldKey];
            const value = currentRequisites[fieldKey as keyof typeof currentRequisites];
            const formattedValue = formatFieldValue(fieldKey, value);

            return (
              <div key={fieldKey} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                {isEditing ? (
                  <input
                    type={fieldKey.includes('Date') ? 'date' : fieldKey === 'email' ? 'email' : fieldKey === 'rating' || fieldKey === 'experience' ? 'number' : 'text'}
                    value={value || ''}
                    onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder={`Введите ${label.toLowerCase()}`}
                    min={fieldKey === 'rating' ? 1 : fieldKey === 'experience' ? 0 : undefined}
                    max={fieldKey === 'rating' ? 5 : undefined}
                    step={fieldKey === 'rating' ? 0.1 : undefined}
                  />
                ) : (
                  <p className="text-sm text-gray-900 break-words font-mono">
                    {formattedValue}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrokerRequisitesCard;
