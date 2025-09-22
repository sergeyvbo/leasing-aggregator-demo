import React, { useState, useEffect } from 'react';
import XIcon from '../icons/XIcon';
import SendIcon from '../icons/SendIcon';
import type { BrokerEmployeeFormData } from '../../types/brokers';
import type { EmployeeRole } from '@/types/index';

interface BrokerEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BrokerEmployeeFormData) => void;
  initialData?: BrokerEmployeeFormData;
  title: string;
}

const BrokerEmployeeModal: React.FC<BrokerEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [formData, setFormData] = useState<BrokerEmployeeFormData>({
    fullName: '',
    login: '',
    role: 'Брокер'
  });

  // Reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          fullName: '',
          login: '',
          role: 'Брокер'
        });
      }
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field: keyof BrokerEmployeeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const roleOptions: EmployeeRole[] = [
    'Брокер',
    'Руководитель брокера',
    'Бизнес-администратор',
    'Технический администратор'
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <XIcon size={24} />
          </button>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Полное имя
            </label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
              placeholder="Введите полное имя сотрудника"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Логин
            </label>
            <input 
              type="text" 
              value={formData.login}
              onChange={(e) => handleInputChange('login', e.target.value)}
              className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
              placeholder="Введите логин сотрудника"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Роль
            </label>
            <select 
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value as EmployeeRole)}
              className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 md:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
          >
            Отменить
          </button>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center min-h-[44px] text-base touch-manipulation"
          >
            <SendIcon size={20} className="mr-2" />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrokerEmployeeModal;
