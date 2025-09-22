import React, { useState, useEffect } from 'react';
import type { LeasingObjectAvailabilityRule, LeasingObjectType } from '../../types/leasingObjects';

interface LeasingObjectAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<LeasingObjectAvailabilityRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => void;
  rule?: LeasingObjectAvailabilityRule | null;
  leasingCompanies: Array<{ id: string; name: string }>;
  objectTypes: LeasingObjectType[];
}

const LeasingObjectAvailabilityModal: React.FC<LeasingObjectAvailabilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  rule,
  leasingCompanies,
  objectTypes
}) => {
  const [formData, setFormData] = useState({
    leasingCompanyId: '',
    objectTypeId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when modal opens or rule changes
  useEffect(() => {
    if (isOpen) {
      if (rule) {
        setFormData({
          leasingCompanyId: rule.leasingCompanyId,
          objectTypeId: rule.objectTypeId,
        });
      } else {
        setFormData({
          leasingCompanyId: '',
          objectTypeId: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, rule]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.leasingCompanyId) {
      newErrors.leasingCompanyId = 'Выберите лизинговую компанию';
    }

    if (!formData.objectTypeId) {
      newErrors.objectTypeId = 'Выберите предмет лизинга';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedLeasingCompany = leasingCompanies.find(lc => lc.id === formData.leasingCompanyId);
    const selectedObjectType = objectTypes.find(ot => ot.id === formData.objectTypeId);

    if (!selectedLeasingCompany || !selectedObjectType) {
      return;
    }

    const ruleData = {
      leasingCompanyId: formData.leasingCompanyId,
      leasingCompanyName: selectedLeasingCompany.name,
      objectTypeId: formData.objectTypeId,
      objectTypeName: selectedObjectType.name,
    };

    onSave(ruleData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      leasingCompanyId: '',
      objectTypeId: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {rule ? 'Редактировать правило' : 'Добавить правило'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Leasing Company Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Лизинговая компания *
            </label>
            <select
              value={formData.leasingCompanyId}
              onChange={(e) => handleInputChange('leasingCompanyId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.leasingCompanyId ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите лизинговую компанию</option>
              {leasingCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.leasingCompanyId && (
              <p className="mt-1 text-sm text-red-600">{errors.leasingCompanyId}</p>
            )}
          </div>

          {/* Object Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предмет лизинга *
            </label>
            <select
              value={formData.objectTypeId}
              onChange={(e) => handleInputChange('objectTypeId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.objectTypeId ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите предмет лизинга</option>
              {objectTypes.map((objectType) => (
                <option key={objectType.id} value={objectType.id}>
                  {objectType.name}
                </option>
              ))}
            </select>
            {errors.objectTypeId && (
              <p className="mt-1 text-sm text-red-600">{errors.objectTypeId}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {rule ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeasingObjectAvailabilityModal;
