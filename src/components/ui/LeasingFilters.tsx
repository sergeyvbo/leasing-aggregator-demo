import React, { useState, useEffect } from 'react';
import type { Filter, FilterParameter, ComparisonOperator, FilterConfig } from '../../types';
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
  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([]);
  const [comparisonOperators, setComparisonOperators] = useState<{
    number: ComparisonOperator[];
    select: ComparisonOperator[];
    text: ComparisonOperator[];
  }>({ number: [], select: [], text: [] });

  useEffect(() => {
    // Load filter options from JSON config
    const config = filterConfigData as FilterConfig;
    setFilterParameters(config.filterParameters);
    setComparisonOperators(config.comparisonOperators);
  }, []);

  // Get parameter by value
  const getParameterByValue = (value: string): FilterParameter | undefined => {
    return filterParameters.find(param => param.value === value);
  };

  // Get available operators for parameter type
  const getOperatorsForParameter = (parameterValue: string): ComparisonOperator[] => {
    const parameter = getParameterByValue(parameterValue);
    if (!parameter) return [];
    return comparisonOperators[parameter.type] || [];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Поиск лизинговых продуктов</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Параметры отбора</h3>
          <button
            onClick={onAddFilter}
            className="bg-blue-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center min-h-[44px] md:min-h-[auto]"
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
                  className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                >
                  <option value="">Выберите параметр</option>
                  {filterParameters.map((param) => (
                    <option key={param.value} value={param.value}>
                      {param.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.operator}
                  onChange={(e) => onUpdateFilter(filter.id, 'operator', e.target.value)}
                  className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                  disabled={!filter.parameter}
                >
                  <option value="">Выберите условие</option>
                  {getOperatorsForParameter(filter.parameter).map((operator) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.label}
                    </option>
                  ))}
                </select>

{(() => {
                  const parameter = getParameterByValue(filter.parameter);
                  
                  // Обработка операторов "между" и "не между" для числовых значений
                  if ((filter.operator === 'between' || filter.operator === 'not_between') && parameter?.type === 'number') {
                    const values = filter.value.split(',');
                    return (
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="number"
                          value={values[0] || ''}
                          onChange={(e) => {
                            const newValues = [e.target.value, values[1] || ''];
                            onUpdateFilter(filter.id, 'value', newValues.join(','));
                          }}
                          placeholder={`От (${parameter.unit || ''})`}
                          className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                        />
                        <input
                          type="number"
                          value={values[1] || ''}
                          onChange={(e) => {
                            const newValues = [values[0] || '', e.target.value];
                            onUpdateFilter(filter.id, 'value', newValues.join(','));
                          }}
                          placeholder={`До (${parameter.unit || ''})`}
                          className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                        />
                      </div>
                    );
                  }
                  
                  // Обработка операторов "один из" и "ни один из" для select значений
                  if ((filter.operator === 'in' || filter.operator === 'not_in') && parameter?.type === 'select' && parameter.options) {
                    const selectedValues = filter.value.split(',').filter(v => v);
                    return (
                      <div className="flex-1">
                        <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-y-auto">
                          {parameter.options.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2 py-1">
                              <input
                                type="checkbox"
                                checked={selectedValues.includes(option.value)}
                                onChange={(e) => {
                                  let newValues = [...selectedValues];
                                  if (e.target.checked) {
                                    newValues.push(option.value);
                                  } else {
                                    newValues = newValues.filter(v => v !== option.value);
                                  }
                                  onUpdateFilter(filter.id, 'value', newValues.join(','));
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
                  // Операторы "пустое" и "не пустое" не требуют ввода значения
                  if (filter.operator === 'empty' || filter.operator === 'not_empty') {
                    return (
                      <div className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-center">
                        Значение не требуется
                      </div>
                    );
                  }
                  
                  // Обычный select для одиночного выбора
                  if (parameter?.type === 'select' && parameter.options && !['in', 'not_in'].includes(filter.operator)) {
                    return (
                      <select
                        value={filter.value}
                        onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                        className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                        disabled={!filter.operator}
                      >
                        <option value="">Выберите значение</option>
                        {parameter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  }
                  
                  // Обычный input для остальных случаев
                  return (
                    <input
                      type={parameter?.type === 'number' ? 'number' : 'text'}
                      value={filter.value}
                      onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                      placeholder={parameter?.unit ? `Значение (${parameter.unit})` : 'Значение'}
                      className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                      disabled={!filter.operator}
                    />
                  );
                })()}
                
                <button
                  onClick={() => onRemoveFilter(filter.id)}
                  className="text-red-500 hover:text-red-700 p-3 md:p-2 flex-shrink-0 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] flex items-center justify-center"
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
                    className="text-red-500 hover:text-red-700 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
                <select
                  value={filter.parameter}
                  onChange={(e) => onUpdateFilter(filter.id, 'parameter', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                >
                  <option value="">Выберите параметр</option>
                  {filterParameters.map((param) => (
                    <option key={param.value} value={param.value}>
                      {param.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.operator}
                  onChange={(e) => onUpdateFilter(filter.id, 'operator', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                  disabled={!filter.parameter}
                >
                  <option value="">Выберите условие</option>
                  {getOperatorsForParameter(filter.parameter).map((operator) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.label}
                    </option>
                  ))}
                </select>

                {(() => {
                  const parameter = getParameterByValue(filter.parameter);
                  
                  // Обработка операторов "между" и "не между" для мобильной версии
                  if ((filter.operator === 'between' || filter.operator === 'not_between') && parameter?.type === 'number') {
                    const values = filter.value.split(',');
                    return (
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={values[0] || ''}
                          onChange={(e) => {
                            const newValues = [e.target.value, values[1] || ''];
                            onUpdateFilter(filter.id, 'value', newValues.join(','));
                          }}
                          placeholder={`От (${parameter.unit || ''})`}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                        />
                        <input
                          type="number"
                          value={values[1] || ''}
                          onChange={(e) => {
                            const newValues = [values[0] || '', e.target.value];
                            onUpdateFilter(filter.id, 'value', newValues.join(','));
                          }}
                          placeholder={`До (${parameter.unit || ''})`}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                        />
                      </div>
                    );
                  }
                  
                  // Обработка операторов "один из" и "ни один из" для мобильной версии
                  if ((filter.operator === 'in' || filter.operator === 'not_in') && parameter?.type === 'select' && parameter.options) {
                    const selectedValues = filter.value.split(',').filter(v => v);
                    return (
                      <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {parameter.options.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 py-2">
                            <input
                              type="checkbox"
                              checked={selectedValues.includes(option.value)}
                              onChange={(e) => {
                                let newValues = [...selectedValues];
                                if (e.target.checked) {
                                  newValues.push(option.value);
                                } else {
                                  newValues = newValues.filter(v => v !== option.value);
                                }
                                onUpdateFilter(filter.id, 'value', newValues.join(','));
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    );
                  }
                  
                  // Операторы "пустое" и "не пустое" не требуют ввода значения (мобильная версия)
                  if (filter.operator === 'empty' || filter.operator === 'not_empty') {
                    return (
                      <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-center">
                        Значение не требуется
                      </div>
                    );
                  }
                  
                  // Обычный select для одиночного выбора
                  if (parameter?.type === 'select' && parameter.options && !['in', 'not_in'].includes(filter.operator)) {
                    return (
                      <select
                        value={filter.value}
                        onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                        disabled={!filter.operator}
                      >
                        <option value="">Выберите значение</option>
                        {parameter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  }
                  
                  // Обычный input для остальных случаев
                  return (
                    <input
                      type={parameter?.type === 'number' ? 'number' : 'text'}
                      value={filter.value}
                      onChange={(e) => onUpdateFilter(filter.id, 'value', e.target.value)}
                      placeholder={parameter?.unit ? `Значение (${parameter.unit})` : 'Значение'}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] text-base touch-manipulation"
                      disabled={!filter.operator}
                    />
                  );
                })()}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onSearchLeasingProducts}
          disabled={loading}
          className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] w-full sm:w-auto"
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