import React from 'react';
import type { Filter, FilterConfig } from '../../types';
import XIcon from '../icons/XIcon';
import filterConfigData from '../../data/filterOptions.json';

interface ActiveFiltersProps {
  filters: Filter[];
  onRemoveFilter: (id: number) => void;
  onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAllFilters
}) => {
  const config = filterConfigData as FilterConfig;
  
  // Фильтруем только заполненные фильтры
  const activeFilters = filters.filter(f => f.parameter && f.operator && (f.value || ['empty', 'not_empty'].includes(f.operator)));
  
  if (activeFilters.length === 0) {
    return null;
  }

  const getParameterLabel = (value: string): string => {
    const param = config.filterParameters.find(p => p.value === value);
    return param?.label || value;
  };

  const getOperatorLabel = (parameterValue: string, operatorValue: string): string => {
    const parameter = config.filterParameters.find(p => p.value === parameterValue);
    if (!parameter) return operatorValue;
    
    const operators = config.comparisonOperators[parameter.type] || [];
    const operator = operators.find(op => op.value === operatorValue);
    return operator?.label || operatorValue;
  };

  const getValueLabel = (parameterValue: string, operatorValue: string, value: string): string => {
    if (['empty', 'not_empty'].includes(operatorValue)) {
      return '';
    }

    const parameter = config.filterParameters.find(p => p.value === parameterValue);
    
    if (parameter?.type === 'select' && parameter.options) {
      if (['in', 'not_in'].includes(operatorValue)) {
        const values = value.split(',').filter(v => v);
        const labels = values.map(v => {
          const option = parameter.options?.find(opt => opt.value === v);
          return option?.label || v;
        });
        return labels.join(', ');
      } else {
        const option = parameter.options.find(opt => opt.value === value);
        return option?.label || value;
      }
    }

    if (['between', 'not_between'].includes(operatorValue)) {
      const [min, max] = value.split(',');
      return `${min} - ${max}${parameter?.unit ? ` ${parameter.unit}` : ''}`;
    }

    return `${value}${parameter?.unit ? ` ${parameter.unit}` : ''}`;
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-blue-900">Активные фильтры</h3>
        <button
          onClick={onClearAllFilters}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Очистить все
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => {
          const parameterLabel = getParameterLabel(filter.parameter);
          const operatorLabel = getOperatorLabel(filter.parameter, filter.operator);
          const valueLabel = getValueLabel(filter.parameter, filter.operator, filter.value);
          
          return (
            <div
              key={filter.id}
              className="inline-flex items-center bg-white border border-blue-200 rounded-full px-3 py-1 text-sm"
            >
              <span className="text-gray-700">
                <span className="font-medium">{parameterLabel}</span>
                <span className="mx-1 text-blue-600">{operatorLabel}</span>
                {valueLabel && <span className="font-medium">{valueLabel}</span>}
              </span>
              <button
                onClick={() => onRemoveFilter(filter.id)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <XIcon size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveFilters;