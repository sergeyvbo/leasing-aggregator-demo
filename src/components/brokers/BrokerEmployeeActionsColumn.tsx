import React from 'react';
import type { BrokerEmployee } from '../../types/brokers';

interface BrokerEmployeeActionsColumnProps {
  employee: BrokerEmployee;
  onEdit?: (employee: BrokerEmployee) => void;
  onDelete?: (employeeId: string) => void;
  onApprove?: (employeeId: string) => void;
  onReject?: (employeeId: string) => void;
}

const BrokerEmployeeActionsColumn: React.FC<BrokerEmployeeActionsColumnProps> = ({
  employee,
  onEdit,
  onDelete,
  onApprove,
  onReject
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(employee);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(employee.id);
    }
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove(employee.id);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(employee.id);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
      {/* Edit button */}
      {onEdit && (
        <button
          onClick={handleEdit}
          className="inline-flex items-center p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          title="Редактировать"
          aria-label="Редактировать сотрудника"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}
      
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="inline-flex items-center p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
          title="Удалить"
          aria-label="Удалить сотрудника"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Approve button - only for pending employees */}
      {employee.status === 'Ожидает активации' && onApprove && (
        <button
          onClick={handleApprove}
          className="inline-flex items-center p-1.5 sm:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
          title="Согласовать"
          aria-label="Согласовать сотрудника"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      )}

      {/* Reject button - only for pending employees */}
      {employee.status === 'Ожидает активации' && onReject && (
        <button
          onClick={handleReject}
          className="inline-flex items-center p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
          title="Отклонить"
          aria-label="Отклонить сотрудника"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BrokerEmployeeActionsColumn;
