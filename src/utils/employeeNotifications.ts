/**
 * Utility functions for employee action notifications
 * Provides consistent messaging for different employee actions
 */

export const EMPLOYEE_NOTIFICATION_MESSAGES = {
  ADD: 'Заявка отправлена на согласование администратору',
  EDIT: 'Заявка отправлена на согласование администратору', 
  DELETE: 'Заявка отправлена на согласование администратору',
} as const;

export type EmployeeActionType = keyof typeof EMPLOYEE_NOTIFICATION_MESSAGES;

/**
 * Get the appropriate notification message for an employee action
 * @param action - The type of employee action (ADD, EDIT, DELETE)
 * @returns The notification message to display
 */
export const getEmployeeNotificationMessage = (action: EmployeeActionType): string => {
  return EMPLOYEE_NOTIFICATION_MESSAGES[action];
};

/**
 * Default notification duration in milliseconds
 */
export const NOTIFICATION_DURATION = 4000;