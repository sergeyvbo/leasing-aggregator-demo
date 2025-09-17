import React from 'react';

interface CheckCircleIconProps {
  size?: number;
  className?: string;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ size = 20, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <path d="m9 11 3 3L22 4"/>
  </svg>
);

export default CheckCircleIcon;