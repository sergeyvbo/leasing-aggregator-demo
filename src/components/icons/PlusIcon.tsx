import React from 'react';

interface PlusIconProps {
  size?: number;
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ size = 20, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M5 12h14"/>
    <path d="m12 5v14"/>
  </svg>
);

export default PlusIcon;