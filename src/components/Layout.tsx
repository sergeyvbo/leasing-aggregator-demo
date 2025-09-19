import React, { useState, useEffect } from 'react';
import { RoleSelector } from '../ui/RoleSelector';
import { NavigationMenu } from '../ui/NavigationMenu';
import { useIsMobile } from '../utils/responsive';
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
  // State for menu management
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default open on desktop
  const isMobile = useIsMobile();

  // Close menu on mobile when switching from desktop to mobile
  useEffect(() => {
    if (isMobile) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }, [isMobile]);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu function (for mobile overlay)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with hamburger menu and user info */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
              {/* Hamburger menu button - visible on all devices */}
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200 flex-shrink-0"
                aria-label="Переключить меню"
              >
                <svg
                  className="w-5 h-5 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Always show hamburger icon */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                Лизинговый брокер
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
              {/* User info - hidden on mobile */}
              <span className="hidden lg:block text-sm text-gray-600 whitespace-nowrap">
                Добро пожаловать, <span className="font-medium">{username}</span>
              </span>

              {/* RoleSelector - responsive */}
              <div className="flex items-center">
                <RoleSelector
                  currentRole={currentRole}
                  onRoleChange={onRoleChange}
                />
              </div>

              <button
                onClick={onLogout}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 min-h-[44px] px-2 sm:px-3 flex items-center whitespace-nowrap"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex h-[calc(100vh-73px)] relative">

        {/* Left sidebar with NavigationMenu */}
        <aside
          className={`
            flex-shrink-0 transition-all duration-300 ease-in-out
            ${isMobile ? (
              // Mobile: container for fixed positioned menu
              'relative'
            ) : (
              // Desktop: normal flow positioning
              isMenuOpen
                ? 'w-64'
                : 'w-0 overflow-hidden'
            )}
          `}
        >
          <NavigationMenu
            role={currentRole}
            activeItem={activeMenuItem}
            onItemClick={onMenuItemClick}
            isOpen={isMenuOpen}
            isMobile={isMobile}
            onClose={closeMenu}
          />
        </aside>

        {/* Content area - adapts to menu state */}
        <main
          className={`
            flex-1 overflow-auto transition-all duration-300 ease-in-out
            ${!isMobile && !isMenuOpen ? 'ml-0' : ''}
          `}
        >
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};