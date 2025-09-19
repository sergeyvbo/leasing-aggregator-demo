import React, { useEffect } from 'react';
import type { Report, ReportParameter } from '../types/reports';

interface CommandPanelProps {
  report: Report;
  parameters: Record<string, any>;
  onParameterChange: (key: string, value: any) => void;
  onGenerate: () => void;
  generating: boolean;
}

const CommandPanel: React.FC<CommandPanelProps> = ({
  report,
  parameters,
  onParameterChange,
  onGenerate,
  generating
}) => {
  // Initialize parameters with default values
  useEffect(() => {
    report.parameters.forEach(param => {
      if (parameters[param.key] === undefined && param.defaultValue !== undefined) {
        onParameterChange(param.key, param.defaultValue);
      }
    });
  }, [report.parameters, parameters, onParameterChange]);

  const renderParameterControl = (param: ReportParameter) => {
    const value = parameters[param.key] || param.defaultValue || '';

    switch (param.type) {
      case 'date':
        return (
          <div key={param.key} className="space-y-2">
            <label 
              htmlFor={param.key}
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              {param.label}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={param.key}
              type="date"
              value={value}
              onChange={(e) => onParameterChange(param.key, e.target.value)}
              required={param.required}
              className="w-full px-3 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[44px] md:min-h-[40px]"
            />
          </div>
        );

      case 'select':
        return (
          <div key={param.key} className="space-y-2">
            <label 
              htmlFor={param.key}
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              {param.label}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              id={param.key}
              value={value}
              onChange={(e) => onParameterChange(param.key, e.target.value)}
              required={param.required}
              className="w-full px-3 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white min-h-[44px] md:min-h-[40px]"
            >
              {param.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'text':
        return (
          <div key={param.key} className="space-y-2">
            <label 
              htmlFor={param.key}
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              {param.label}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={param.key}
              type="text"
              value={value}
              onChange={(e) => onParameterChange(param.key, e.target.value)}
              required={param.required}
              placeholder={`Введите ${param.label.toLowerCase()}`}
              className="w-full px-3 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[44px] md:min-h-[40px]"
            />
          </div>
        );

      case 'number':
        return (
          <div key={param.key} className="space-y-2">
            <label 
              htmlFor={param.key}
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              {param.label}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={param.key}
              type="number"
              value={value}
              onChange={(e) => onParameterChange(param.key, e.target.value ? Number(e.target.value) : '')}
              required={param.required}
              placeholder={`Введите ${param.label.toLowerCase()}`}
              className="w-full px-3 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[44px] md:min-h-[40px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Check if all required parameters are filled
  const isFormValid = () => {
    return report.parameters.every(param => {
      if (!param.required) return true;
      const value = parameters[param.key];
      return value !== undefined && value !== null && value !== '';
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
        Параметры отчета
      </h2>
      
      {/* Parameters Form */}
      <div className="space-y-4 md:space-y-6">
        {/* Date Range Section - Special handling for common date parameters */}
        {report.parameters.some(p => p.key === 'startDate' || p.key === 'endDate') && (
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-sm md:text-base font-medium text-gray-800 border-b border-gray-200 pb-2">
              Период отчета
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {report.parameters
                .filter(p => p.key === 'startDate' || p.key === 'endDate')
                .map(renderParameterControl)}
            </div>
          </div>
        )}

        {/* Other Parameters */}
        {report.parameters.filter(p => p.key !== 'startDate' && p.key !== 'endDate').length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-sm md:text-base font-medium text-gray-800 border-b border-gray-200 pb-2">
              Дополнительные параметры
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {report.parameters
                .filter(p => p.key !== 'startDate' && p.key !== 'endDate')
                .map(renderParameterControl)}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={onGenerate}
              disabled={!isFormValid() || generating}
              className={`
                w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] touch-manipulation
                ${
                  !isFormValid() || generating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md'
                }
              `}
            >
              {generating ? (
                <div className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Генерация отчета...</span>
                </div>
              ) : (
                <span className="text-sm md:text-base">Сгенерировать отчет</span>
              )}
            </button>
            
            {!isFormValid() && (
              <p className="text-xs md:text-sm text-gray-500 sm:text-right">
                Заполните все обязательные поля для генерации отчета
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPanel;