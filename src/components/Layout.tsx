import React from 'react';
import { RoleSelector } from '../ui/RoleSelector';
import { NavigationMenu } from '../ui/NavigationMenu';
import type { RoleId } from '../types/roles';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: RoleId;
  activeMenuItem: string;
  username: string;
  onRoleChange: (role: RoleId) => void;
  onMenuItemClick: (itemId: string) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentRole,
  activeMenuItem,
  username,
  onRoleChange,
  onMenuItemClick,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with user info and RoleSelector */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Лизинговый брокер
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Добро пожаловать, <span className="font-medium">{username}</span>
              </span>
              <RoleSelector
                currentRole={currentRole}
                onRoleChange={onRoleChange}
              />
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left sidebar with NavigationMenu */}
        <aside className="flex-shrink-0">
          <NavigationMenu
            role={currentRole}
            activeItem={activeMenuItem}
            onItemClick={onMenuItemClick}
          />
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};