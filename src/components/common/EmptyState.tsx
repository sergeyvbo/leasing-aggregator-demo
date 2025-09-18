import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Reusable EmptyState component for consistent empty state styling
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-8 ${className}`}>
      <div className="text-center">
        {icon && (
          <div className="text-gray-400 mb-4 flex justify-center">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;