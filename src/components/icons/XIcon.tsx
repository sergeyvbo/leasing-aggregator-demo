import React from 'react';

interface XIconProps {
  size?: number;
  className?: string;
}

const XIcon: React.FC<XIconProps> = ({ size = 20, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

export default XIcon;