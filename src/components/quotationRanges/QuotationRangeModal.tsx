import React, { useState, useEffect } from 'react';
import XIcon from '../icons/XIcon';
import SendIcon from '../icons/SendIcon';
import type { QuotationRange } from '../../types/quotationRanges';

interface QuotationRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (range: Omit<QuotationRange, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => void;
  range?: QuotationRange | null;
  mode: 'add' | 'edit';
}

// Mock data for dropdowns
const leasingCompanies = [
  { id: 'lc-1', name: 'ООО "Альфа-Лизинг"' },
  { id: 'lc-2', name: 'ПАО "Бета-Лизинг"' },
  { id: 'lc-3', name: 'ООО "Гамма-Лизинг"' },
  { id: 'lc-4', name: 'ООО "Дельта-Лизинг"' },
  { id: 'lc-5', name: 'ООО "Омега-Лизинг"' },
];

const scheduleTypes = [
  { value: 'Дегрессия', label: 'Дегрессия' },
  { value: 'Сезонный график', label: 'Сезонный график' },
  { value: 'Аннуитет', label: 'Аннуитет' },
];

const QuotationRangeModal: React.FC<QuotationRangeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  range,
  mode
}) => {
  const [formData, setFormData] = useState({
    leasingCompany: '',
    term: '',
    rate: '',
    advance: '',
    agentFee: '',
    scheduleType: 'Аннуитет' as 'Дегрессия' | 'Сезонный график' | 'Аннуитет',
    buyoutPayment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when modal opens or range changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && range) {
        setFormData({
          leasingCompany: range.leasingCompany,
          term: range.term,
          rate: range.rate,
          advance: range.advance,
          agentFee: range.agentFee,
          scheduleType: range.scheduleType,
          buyoutPayment: range.buyoutPayment,
        });
      } else {
        setFormData({
          leasingCompany: '',
          term: '',
          rate: '',
          advance: '',
          agentFee: '',
          scheduleType: 'Аннуитет',
          buyoutPayment: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, range]);

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

    if (!formData.leasingCompany.trim()) {
      newErrors.leasingCompany = 'Выберите лизинговую компанию';
    }
    if (!formData.term.trim()) {
      newErrors.term = 'Введите срок';
    }
    if (!formData.rate.trim()) {
      newErrors.rate = 'Введите ставку';
    }
    if (!formData.advance.trim()) {
      newErrors.advance = 'Введите аванс';
    }
    if (!formData.agentFee.trim()) {
      newErrors.agentFee = 'Введите агентское вознаграждение';
    }
    if (!formData.buyoutPayment.trim()) {
      newErrors.buyoutPayment = 'Введите выкупной платеж';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const rangeData = {
      leasingCompany: formData.leasingCompany,
      term: formData.term,
      rate: formData.rate,
      advance: formData.advance,
      agentFee: formData.agentFee,
      scheduleType: formData.scheduleType,
      buyoutPayment: formData.buyoutPayment,
      status: 'active' as const,
      startDate: new Date().toISOString().split('T')[0],
    };

    onSave(rangeData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      leasingCompany: '',
      term: '',
      rate: '',
      advance: '',
      agentFee: '',
      scheduleType: 'Аннуитет',
      buyoutPayment: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {mode === 'add' ? 'Добавить диапазон котировок' : 'Редактировать диапазон котировок'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <XIcon size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Лизинговая компания */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Лизинговая компания *
            </label>
            <select
              value={formData.leasingCompany}
              onChange={(e) => handleInputChange('leasingCompany', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.leasingCompany ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите лизинговую компанию</option>
              {leasingCompanies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.leasingCompany && (
              <p className="mt-1 text-sm text-red-600">{errors.leasingCompany}</p>
            )}
          </div>

          {/* Срок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Срок *
            </label>
            <input 
              type="text" 
              value={formData.term}
              onChange={(e) => handleInputChange('term', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.term ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Например: 12-36 месяцев, [6-24] месяца"
            />
            {errors.term && (
              <p className="mt-1 text-sm text-red-600">{errors.term}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Поддерживаются диапазоны: [1-4], (5-10), [25-40), (1-10], {'>'}10, {'<'}=20
            </p>
          </div>

          {/* Ставка */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ставка (%) *
            </label>
            <input 
              type="text" 
              value={formData.rate}
              onChange={(e) => handleInputChange('rate', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.rate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Например: 8.5-12.5%, (7.0-11.0]%, >15%"
            />
            {errors.rate && (
              <p className="mt-1 text-sm text-red-600">{errors.rate}</p>
            )}
          </div>

          {/* Аванс */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Аванс (%) *
            </label>
            <input 
              type="text" 
              value={formData.advance}
              onChange={(e) => handleInputChange('advance', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.advance ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Например: 15-30%, (20-40]%, <=25%"
            />
            {errors.advance && (
              <p className="mt-1 text-sm text-red-600">{errors.advance}</p>
            )}
          </div>

          {/* Агентское вознаграждение */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Агентское вознаграждение (%) *
            </label>
            <input 
              type="text" 
              value={formData.agentFee}
              onChange={(e) => handleInputChange('agentFee', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.agentFee ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Например: 1.5-3%, (2.0-4.0]%, >5%"
            />
            {errors.agentFee && (
              <p className="mt-1 text-sm text-red-600">{errors.agentFee}</p>
            )}
          </div>

          {/* Тип графика */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип графика *
            </label>
            <select
              value={formData.scheduleType}
              onChange={(e) => handleInputChange('scheduleType', e.target.value as 'Дегрессия' | 'Сезонный график' | 'Аннуитет')}
              className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
            >
              {scheduleTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Выкупной платеж */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выкупной платеж (%) *
            </label>
            <input 
              type="text" 
              value={formData.buyoutPayment}
              onChange={(e) => handleInputChange('buyoutPayment', e.target.value)}
              className={`w-full px-3 py-3 md:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation ${
                errors.buyoutPayment ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Например: 1-5%, (2-8]%, <=3%"
            />
            {errors.buyoutPayment && (
              <p className="mt-1 text-sm text-red-600">{errors.buyoutPayment}</p>
            )}
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-3 md:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
          >
            Отменить
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center min-h-[44px] text-base touch-manipulation"
          >
            <SendIcon size={20} className="mr-2" />
            {mode === 'add' ? 'Добавить диапазон' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationRangeModal;
