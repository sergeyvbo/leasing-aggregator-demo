import React, { useState, useEffect } from 'react';
import type { RoleId } from '../types/roles';
import { ROLES, DEFAULT_ROLE } from '../types/roles';

interface RoleSelectorProps {
  currentRole: RoleId;
  onRoleChange: (roleId: RoleId) => void;
}

const STORAGE_KEY = 'selectedRole';

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onRoleChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentRole);
  }, [currentRole]);

  // Get current role display name
  const currentRoleName = ROLES.find(role => role.id === currentRole)?.name || 'Неизвестная роль';

  const handleRoleSelect = (roleId: RoleId) => {
    onRoleChange(roleId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 sm:w-48 md:w-64 px-3 md:px-4 py-2 min-h-[44px] text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <span className="text-gray-900 text-sm md:text-base truncate pr-2">{currentRoleName}</span>
        <svg
          className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg right-0 md:right-auto">
          <div className="py-1">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`w-full px-3 md:px-4 py-2 min-h-[44px] text-left text-sm md:text-base hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200 ${
                  role.id === currentRole ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Utility function to get saved role from localStorage
export const getSavedRole = (): RoleId => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && ROLES.some(role => role.id === saved)) {
    return saved as RoleId;
  }
  return DEFAULT_ROLE;
};