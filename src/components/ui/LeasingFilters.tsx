import React, { useState, useEffect } from 'react';
import type { Filter, FilterOption } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import XIcon from '../icons/XIcon';
import SearchIcon from '../icons/SearchIcon';
import filterConfigData from '../../data/filterOptions.json';

interface LeasingFiltersProps {
  filters: Filter[];
  loading: boolean;
  onAddFilter: () => void;
  onRemoveFilter: (id: number) => void;
  onUpdateFilter: (id: number, field: string, value: string) => void;
  onSearchLeasingProducts: () => void;
}

const LeasingFilters: React.FC<LeasingFiltersProps> = ({
  filters,
  loading,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  onSearchLeasingProducts
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  useEffect(() => {
    // Load filter options from JSON config
    setFilterOptions(filterConfigData.filterParameters);
  }, []);

  return (
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
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
  );
};

export default LeasingFilters;