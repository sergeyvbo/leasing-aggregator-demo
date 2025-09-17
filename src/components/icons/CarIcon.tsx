import React from 'react';

interface CarIconProps {
  size?: number;
  className?: string;
}

const CarIcon: React.FC<CarIconProps> = ({ size = 20, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 9c-.3-1.2-1.4-2-2.6-2H8.2c-1.2 0-2.3.8-2.6 2L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/>
    <path d="M9 17h6"/>
    <circle cx="17" cy="17" r="2"/>
  </svg>
);

export default CarIcon;