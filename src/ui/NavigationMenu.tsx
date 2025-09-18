import React from 'react';
import type { RoleId } from '../types/roles';
import { MENU_CONFIG } from '../types/roles';
import { APP_VERSION } from '../utils/version';

interface NavigationMenuProps {
  role: RoleId;
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  role,
  activeItem,
  onItemClick
}) => {
  const menuItems = MENU_CONFIG[role] || [];

  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Version display in bottom left corner */}
      <div className="p-4">
        <div className="text-gray-400 text-xs">
          v. {APP_VERSION}
        </div>
      </div>
    </nav>
  );
};