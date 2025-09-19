import React from 'react';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface EmployeeNotificationProps {
  isVisible: boolean;
  message?: string;
}

/**
 * EmployeeNotification component for displaying employee action notifications
 * 
 * Displays "Заявка отправлена на согласование администратору" message
 * for employee add, edit, and delete actions
 * 
 * Requirements: 3.5, 4.4, 4.5
 */
const EmployeeNotification: React.FC<EmployeeNotificationProps> = ({ 
  isVisible, 
  message = "Заявка отправлена на согласование администратору" 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slideDown z-50 max-w-sm">
      <div className="flex items-start">
        <CheckCircleIcon size={24} className="mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-semibold text-sm md:text-base">Успешно отправлено!</div>
          <div className="text-xs md:text-sm mt-1 opacity-90">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNotification;