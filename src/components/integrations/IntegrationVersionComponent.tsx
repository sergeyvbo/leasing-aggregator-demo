import React, { useState } from 'react';
import type { IntegrationVersionComponentProps } from '../../types/integrations';

// Arrow icons for navigation
const ChevronLeftIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = ''
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = ''
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/**
 * IntegrationVersionComponent provides navigation between different versions of an integration
 * Shows version number, date, status and navigation arrows
 */
export const IntegrationVersionComponent: React.FC<IntegrationVersionComponentProps> = ({
  version,
  onVersionChange,
  onEditStart,
  onEditEnd
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingVersion, setEditingVersion] = useState(version);

  const handlePreviousVersion = () => {
    if (version.previousVersionId) {
      onVersionChange(version.previousVersionId);
    }
  };

  const handleNextVersion = () => {
    if (version.nextVersionId) {
      onVersionChange(version.nextVersionId);
    }
  };

  const handleEditData = () => {
    const newVersion = {
      ...version,
      status: 'draft' as const,
      startDate: undefined, // для черновика обе даты пустые
      endDate: undefined
    };
    setEditingVersion(newVersion);
    setIsEditing(true);
    onEditStart?.();
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditEnd?.();
    // В реальном приложении здесь был бы вызов API для сохранения
  };

  const handlePublish = () => {
    const publishedVersion = {
      ...editingVersion,
      status: 'active' as const,
      startDate: new Date().toISOString().split('T')[0], // устанавливаем дату начала действия
      endDate: undefined // для действующей версии окончание пустое
    };
    setEditingVersion(publishedVersion);
    setIsEditing(false);
    onEditEnd?.();
    // В реальном приложении здесь был бы вызов API для публикации
  };

  const currentVersion = isEditing ? editingVersion : version;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get period display text
  const getPeriodDisplay = (version: typeof currentVersion) => {
    if (version.status === 'draft') {
      return 'черновик'; // для черновика не показываем даты
    }
    
    if (!version.startDate) {
      return 'без даты';
    }

    const startDateFormatted = formatDate(version.startDate);
    
    if (version.status === 'active') {
      return `с ${startDateFormatted}`; // для действующей показываем только начало
    }
    
    if (version.status === 'archived' && version.endDate) {
      const endDateFormatted = formatDate(version.endDate);
      return `${startDateFormatted} - ${endDateFormatted}`; // для архивной показываем период
    }
    
    return startDateFormatted;
  };

  // Get status display text and styling
  const getStatusDisplay = (status: 'draft' | 'active' | 'archived') => {
    switch (status) {
      case 'draft':
        return {
          text: 'черновик',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'active':
        return {
          text: 'действующая',
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'archived':
        return {
          text: 'архивная',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
      default:
        return {
          text: status,
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const statusDisplay = getStatusDisplay(currentVersion.status);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        {/* Previous version button */}
        <button
          onClick={handlePreviousVersion}
          disabled={!version.previousVersionId || isEditing}
          className={`
            flex items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-full border transition-colors flex-shrink-0 touch-manipulation
            ${version.previousVersionId && !isEditing
              ? 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 cursor-pointer'
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }
          `}
          title="Предыдущая версия"
          aria-label="Предыдущая версия"
        >
          <ChevronLeftIcon size={16} />
        </button>

        {/* Version info */}
        <div className="flex flex-col items-center space-y-1 mx-2 min-w-0">
          <div className="text-xs sm:text-sm font-medium text-gray-900 text-center">
            <span className="hidden sm:inline">версия №{currentVersion.number}</span>
            <span className="sm:hidden">v{currentVersion.number}</span>
            {currentVersion.status !== 'draft' && (
              <span className="block text-xs text-gray-600 mt-1">
                {getPeriodDisplay(currentVersion)}
              </span>
            )}
          </div>
          <div className={`
            px-2 py-1 text-xs font-medium rounded-full border whitespace-nowrap
            ${statusDisplay.className}
          `}>
            {statusDisplay.text}
          </div>
        </div>

        {/* Next version button */}
        <button
          onClick={handleNextVersion}
          disabled={!version.nextVersionId || isEditing}
          className={`
            flex items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-full border transition-colors flex-shrink-0 touch-manipulation
            ${version.nextVersionId && !isEditing
              ? 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 cursor-pointer'
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }
          `}
          title="Следующая версия"
          aria-label="Следующая версия"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-2">
        {!isEditing ? (
          <button
            onClick={handleEditData}
            className="px-4 py-3 md:py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
          >
            Изменить данные
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              Сохранить
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-3 md:py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              Опубликовать
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IntegrationVersionComponent;
