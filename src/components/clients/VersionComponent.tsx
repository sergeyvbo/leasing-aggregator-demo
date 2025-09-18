import React from 'react';
import type { VersionComponentProps } from '../../types/clients';

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
    <path d="m15 18-6-6 6-6"/>
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
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

/**
 * VersionComponent provides navigation between different versions of an entity
 * Shows version number, date, status and navigation arrows
 */
export const VersionComponent: React.FC<VersionComponentProps> = ({
  version,
  onVersionChange
}) => {
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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

  const statusDisplay = getStatusDisplay(version.status);

  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-3">
      {/* Previous version button */}
      <button
        onClick={handlePreviousVersion}
        disabled={!version.previousVersionId}
        className={`
          flex items-center justify-center w-8 h-8 rounded-full border transition-colors flex-shrink-0
          ${version.previousVersionId 
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
          <span className="hidden sm:inline">версия №{version.number} от </span>
          <span className="sm:hidden">v{version.number} </span>
          {formatDate(version.date)}
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
        disabled={!version.nextVersionId}
        className={`
          flex items-center justify-center w-8 h-8 rounded-full border transition-colors flex-shrink-0
          ${version.nextVersionId 
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
  );
};

export default VersionComponent;