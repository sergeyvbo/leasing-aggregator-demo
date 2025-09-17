import React from 'react';

interface SendIconProps {
  size?: number;
  className?: string;
}

const SendIcon: React.FC<SendIconProps> = ({ size = 20, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

export default SendIcon;