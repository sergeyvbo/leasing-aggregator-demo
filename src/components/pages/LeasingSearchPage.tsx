import React from 'react';
import type { Filter, LeasingProduct } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import XIcon from '../icons/XIcon';
import SearchIcon from '../icons/SearchIcon';
import FileTextIcon from '../icons/FileTextIcon';
import SendIcon from '../icons/SendIcon';

interface LeasingSearchPageProps {
  filters: Filter[];
  leasingProducts: LeasingProduct[];
  loading: boolean;
  showModal: boolean;
  onAddFilter: () => void;
  onRemoveFilter: (id: number) => void;
  onUpdateFilter: (id: number, field: string, value: string) => void;
  onSearchLeasingProducts: () => void;
  onShowModal: () => void;
  onCloseModal: () => void;
  onSendProposal: () => void;
}

const LeasingSearchPage: React.FC<LeasingSearchPageProps> = ({
  filters,
  leasingProducts,
  loading,
  showModal,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  onSearchLeasingProducts,
  onShowModal,
  onCloseModal,
  onSendProposal
}) => {
  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Поиск лизинговых продуктов</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Параметры отбора</h3>
              <button
                onClick={onAddFilter}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <PlusIcon size={20} className="mr-2" />
                Добавить фильтр
              </button>
            </div>

            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.id} className="bg-gray-50 p-4 rounded-lg">
                  {/* Desktop layout */}
                  <div className="hidden sm:flex space-x-4 items-center">
                    <select
                      value={filter.parameter}
                      onChange={(e) => onUpdateFilter(filter.id, 'parameter', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Выберите параметр</option>
                      <option value="term">Срок лизинга (годы)</option>
                      <option value="payment">Ежемесячный платеж</option>
                      <option value="buyout">Обязательность выкупа</option>
                      <option value="initial">Первоначальный взнос</option>
                      <option value="rate">Процентная ставка</option>
                    </select>
                    <input
                      type="text"
                      value={filter.value}
                      onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                      placeholder="Значение"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => onRemoveFilter(filter.id)}
                      className="text-red-500 hover:text-red-700 p-2 flex-shrink-0"
                    >
                      <XIcon size={20} />
                    </button>
                  </div>

                  {/* Mobile layout */}
                  <div className="sm:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Фильтр</span>
                      <button
                        onClick={() => onRemoveFilter(filter.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <XIcon size={18} />
                      </button>
                    </div>
                    <select
                      value={filter.parameter}
                      onChange={(e) => onUpdateFilter(filter.id, 'parameter', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Выберите параметр</option>
                      <option value="term">Срок лизинга (годы)</option>
                      <option value="payment">Ежемесячный платеж</option>
                      <option value="buyout">Обязательность выкупа</option>
                      <option value="initial">Первоначальный взнос</option>
                      <option value="rate">Процентная ставка</option>
                    </select>
                    <input
                      type="text"
                      value={filter.value}
                      onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                      placeholder="Значение"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onSearchLeasingProducts}
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <SearchIcon size={20} className="mr-2" />
              )}
              Найти предложения
            </button>
          </div>
        </div>

        {leasingProducts.length > 0 && (
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Коммерческое предложение</h3>
              <button
                onClick={onCloseModal}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <XIcon size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Сумма лизинга</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Срок лизинга</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Первоначальный взнос</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Процентная ставка</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Валюта</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>RUB</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип страхования</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>КАСКО + ОСАГО</option>
                  <option>Только ОСАГО</option>
                  <option>Без страхования</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Дополнительные условия</label>
                <textarea 
                  rows={4} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Укажите дополнительные условия договора..."
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={onCloseModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={onSendProposal}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center"
              >
                <SendIcon size={20} className="mr-2" />
                Отправить на согласование
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeasingSearchPage;