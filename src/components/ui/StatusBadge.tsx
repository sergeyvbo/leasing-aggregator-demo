import React from 'react';

export type StatusVariant = 'processing' | 'approved' | 'rejected' | 'completed';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

/**
 * Reusable StatusBadge component for displaying status with appropriate styling
 * Can be used throughout the application for any status display needs
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant, 
  className = '' 
}) => {
  // Auto-detect variant based on status text if not provided
  const getVariant = (statusText: string): StatusVariant => {
    if (variant) return variant;
    
    const lowerStatus = statusText.toLowerCase();
    if (lowerStatus.includes('обработке') || lowerStatus.includes('processing')) return 'processing';
    if (lowerStatus.includes('одобрено') || lowerStatus.includes('approved')) return 'approved';
    if (lowerStatus.includes('отклонено') || lowerStatus.includes('rejected')) return 'rejected';
    if (lowerStatus.includes('завершено') || lowerStatus.includes('completed')) return 'completed';
    
    return 'processing'; // default
  };

  const currentVariant = getVariant(status);

  const variantStyles = {
    processing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${variantStyles[currentVariant]}
        ${className}
      `}
    >
      {status}
    </span>
  );
};