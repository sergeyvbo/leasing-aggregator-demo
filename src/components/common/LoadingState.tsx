import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable LoadingState component for consistent loading state styling
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Загрузка...',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${containerClasses[size]} ${className}`}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className={`${sizeClasses[size]} animate-spin`}>
            <svg className="w-full h-full text-blue-600" fill="none" viewBox="0 0 24 24">
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
          </div>
        </div>
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;