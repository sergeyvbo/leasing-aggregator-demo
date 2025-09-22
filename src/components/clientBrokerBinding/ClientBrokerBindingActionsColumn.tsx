import React from 'react';
import type { ClientBrokerBindingRule } from '../../types/clientBrokerBinding';

interface ClientBrokerBindingActionsColumnProps {
  rule: ClientBrokerBindingRule;
  onEdit?: (ruleId: string) => void;
  onDelete?: (ruleId: string) => void;
}

const ClientBrokerBindingActionsColumn: React.FC<ClientBrokerBindingActionsColumnProps> = ({
  rule,
  onEdit,
  onDelete
}) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(rule.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(rule.id);
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
          aria-label="Редактировать правило"
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
          aria-label="Удалить правило"
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
    </div>
  );
};

export default ClientBrokerBindingActionsColumn;
