import { useState, useCallback } from 'react';
import { getEmployeeNotificationMessage, NOTIFICATION_DURATION, type EmployeeActionType } from '../utils/employeeNotifications';

interface UseEmployeeNotificationReturn {
  showNotification: boolean;
  notificationMessage: string;
  showEmployeeNotification: (actionOrMessage?: EmployeeActionType | string) => void;
  hideNotification: () => void;
}

/**
 * Custom hook for managing employee action notifications
 * Provides a consistent way to show notifications for add, edit, and delete employee actions
 */
export const useEmployeeNotification = (): UseEmployeeNotificationReturn => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showEmployeeNotification = useCallback((actionOrMessage?: EmployeeActionType | string) => {
    let message: string;
    
    if (!actionOrMessage) {
      message = getEmployeeNotificationMessage('ADD'); // Default to ADD action
    } else if (typeof actionOrMessage === 'string' && (actionOrMessage === 'ADD' || actionOrMessage === 'EDIT' || actionOrMessage === 'DELETE')) {
      message = getEmployeeNotificationMessage(actionOrMessage as EmployeeActionType);
    } else {
      message = actionOrMessage as string; // Custom message
    }
    
    setNotificationMessage(message);
    setShowNotification(true);
    // Auto-hide after configured duration
    setTimeout(() => {
      setShowNotification(false);
    }, NOTIFICATION_DURATION);
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  return {
    showNotification,
    notificationMessage,
    showEmployeeNotification,
    hideNotification,
  };
};

export default useEmployeeNotification;