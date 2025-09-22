import React, { useState, useEffect } from 'react';
import type { ClientBrokerBindingRule } from '../../types/clientBrokerBinding';

interface ClientBrokerBindingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<ClientBrokerBindingRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => void;
  rule?: ClientBrokerBindingRule | null;
  mode: 'add' | 'edit';
}

// Mock data for dropdowns
const leasingCompanies = [
  { id: 'lc-1', name: 'ООО "Альфа-Лизинг"' },
  { id: 'lc-2', name: 'ООО "Гамма-Лизинг"' },
  { id: 'lc-3', name: 'ООО "Омега-Лизинг"' },
  { id: 'lc-4', name: 'ООО "Дельта-Лизинг"' },
];

const brokers = [
  { id: 'broker-1', name: 'ООО "Бета-Брокер"' },
  { id: 'broker-2', name: 'ООО "Дельта-Брокер"' },
  { id: 'broker-3', name: 'ООО "Эпсилон-Брокер"' },
  { id: 'broker-4', name: 'ООО "Зета-Брокер"' },
];

const clients = [
  { inn: '7701234567', name: 'ООО "Клиент 1"' },
  { inn: '7702345678', name: 'ООО "Клиент 2"' },
  { inn: '7703456789', name: 'ООО "Клиент 3"' },
  { inn: '7704567890', name: 'ООО "Клиент 4"' },
  { inn: '7705678901', name: 'ООО "Клиент 5"' },
];

const restrictionOptions = [
  { value: 'allow', label: 'Закрепить' },
  { value: 'deny', label: 'Запретить' },
];

const ClientBrokerBindingModal: React.FC<ClientBrokerBindingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  rule,
  mode
}) => {
  const [formData, setFormData] = useState({
    leasingCompanyId: '',
    clientInn: '',
    brokerId: '',
    restriction: 'allow' as 'allow' | 'deny'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when modal opens or rule changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && rule) {
        setFormData({
          leasingCompanyId: rule.leasingCompanyId,
          clientInn: rule.clientInn,
          brokerId: rule.brokerId,
          restriction: rule.restriction
        });
      } else {
        setFormData({
          leasingCompanyId: '',
          clientInn: '',
          brokerId: '',
          restriction: 'allow'
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, rule]);

  const handleInputChange = (field: string, value: string) => {
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
    if (!formData.clientInn) {
      newErrors.clientInn = 'Выберите клиента';
    }
    if (!formData.brokerId) {
      newErrors.brokerId = 'Выберите брокера';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const selectedLeasingCompany = leasingCompanies.find(lc => lc.id === formData.leasingCompanyId);
    const selectedBroker = brokers.find(broker => broker.id === formData.brokerId);
    const selectedClient = clients.find(client => client.inn === formData.clientInn);

    if (!selectedLeasingCompany || !selectedBroker || !selectedClient) {
      return;
    }

    const ruleData = {
      leasingCompanyId: formData.leasingCompanyId,
      leasingCompanyName: selectedLeasingCompany.name,
      clientInn: formData.clientInn,
      brokerId: formData.brokerId,
      brokerName: selectedBroker.name,
      restriction: formData.restriction
    };

    onSave(ruleData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      leasingCompanyId: '',
      clientInn: '',
      brokerId: '',
      restriction: 'allow'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {mode === 'add' ? 'Добавить правило' : 'Редактировать правило'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Leasing Company Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Лизинговая компания *
              </label>
              <select
                value={formData.leasingCompanyId}
                onChange={(e) => handleInputChange('leasingCompanyId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.leasingCompanyId ? 'border-red-500' : 'border-gray-300'
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

            {/* Client Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Клиент *
              </label>
              <select
                value={formData.clientInn}
                onChange={(e) => handleInputChange('clientInn', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientInn ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Выберите клиента</option>
                {clients.map((client) => (
                  <option key={client.inn} value={client.inn}>
                    {client.name} (ИНН: {client.inn})
                  </option>
                ))}
              </select>
              {errors.clientInn && (
                <p className="mt-1 text-sm text-red-600">{errors.clientInn}</p>
              )}
            </div>

            {/* Broker Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Брокер *
              </label>
              <select
                value={formData.brokerId}
                onChange={(e) => handleInputChange('brokerId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.brokerId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Выберите брокера</option>
                {brokers.map((broker) => (
                  <option key={broker.id} value={broker.id}>
                    {broker.name}
                  </option>
                ))}
              </select>
              {errors.brokerId && (
                <p className="mt-1 text-sm text-red-600">{errors.brokerId}</p>
              )}
            </div>

            {/* Restriction Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ограничение *
              </label>
              <select
                value={formData.restriction}
                onChange={(e) => handleInputChange('restriction', e.target.value as 'allow' | 'deny')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {restrictionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBrokerBindingModal;
