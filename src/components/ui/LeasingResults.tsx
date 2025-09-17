import React from 'react';
import type { LeasingProduct } from '../../types';
import FileTextIcon from '../icons/FileTextIcon';

interface LeasingResultsProps {
  leasingProducts: LeasingProduct[];
  onShowModal: () => void;
}

const LeasingResults: React.FC<LeasingResultsProps> = ({
  leasingProducts,
  onShowModal
}) => {
  if (leasingProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-900">Найденные предложения</h3>
      {leasingProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-semibold text-gray-900">{product.company}</h4>
              {/* Desktop button */}
              <button
                onClick={onShowModal}
                className="hidden sm:flex ml-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 items-center"
              >
                <FileTextIcon size={20} className="mr-2" />
                Создать КП
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="pr-2 md:pr-0">
                <span className="text-sm text-gray-600">Срок:</span>
                <div className="font-medium">{product.term}</div>
              </div>
              <div className="pl-2 md:pl-0">
                <span className="text-sm text-gray-600">Ежемесячный платеж:</span>
                <div className="font-medium text-green-600">{product.monthlyPayment}</div>
              </div>
              <div className="pr-2 md:pr-0">
                <span className="text-sm text-gray-600">Выкуп:</span>
                <div className="font-medium">{product.buyoutRequired}</div>
              </div>
              <div className="pl-2 md:pl-0">
                <span className="text-sm text-gray-600">Первый взнос:</span>
                <div className="font-medium">{product.initialPayment}</div>
              </div>
              <div className="pr-2 md:pr-0 md:col-span-1">
                <span className="text-sm text-gray-600">Ставка:</span>
                <div className="font-medium">{product.rate}</div>
              </div>
            </div>

            {/* Mobile button */}
            <button
              onClick={onShowModal}
              className="sm:hidden w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              <FileTextIcon size={20} className="mr-2" />
              Создать КП
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeasingResults;