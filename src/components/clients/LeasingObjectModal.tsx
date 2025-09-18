import React from 'react';
import type { LeasingObject } from '../../types/clients';

interface LeasingObjectModalProps {
  leasingObject: LeasingObject;
  isOpen: boolean;
  onClose: () => void;
}

const LeasingObjectModal: React.FC<LeasingObjectModalProps> = ({
  leasingObject,
  isOpen,
  onClose
}) => {
  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate contract duration in months
  const calculateDuration = (from: string, to: string): string => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
    return `${diffMonths} мес.`;
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Детали предмета лизинга
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Основная информация</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Наименование предмета лизинга
                  </label>
                  <p className="text-sm text-gray-900 bg-white p-3 rounded border">
                    {leasingObject.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Статус
                  </label>
                  <div className="bg-white p-3 rounded border">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      leasingObject.status === 'Активный' 
                        ? 'bg-green-100 text-green-800' 
                        : leasingObject.status === 'Завершен'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leasingObject.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Identifiers */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Идентификаторы</h3>
              <div className="space-y-2">
                {leasingObject.identifiers.map((identifier, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-900">{identifier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Period */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Срок договора лизинга</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата начала
                  </label>
                  <p className="text-sm text-gray-900 bg-white p-3 rounded border">
                    {formatDate(leasingObject.contractPeriod.from)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата окончания
                  </label>
                  <p className="text-sm text-gray-900 bg-white p-3 rounded border">
                    {formatDate(leasingObject.contractPeriod.to)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Продолжительность
                  </label>
                  <p className="text-sm text-gray-900 bg-white p-3 rounded border">
                    {calculateDuration(leasingObject.contractPeriod.from, leasingObject.contractPeriod.to)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeasingObjectModal;