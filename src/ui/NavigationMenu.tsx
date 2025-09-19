import React, { useEffect, useRef } from 'react';
import type { RoleId } from '../types/roles';
import { MENU_CONFIG } from '../types/roles';
import { APP_VERSION } from '../utils/version';

interface NavigationMenuProps {
  role: RoleId;
  activeItem: string;
  onItemClick: (itemId: string) => void;
  isOpen?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  role,
  activeItem,
  onItemClick,
  isOpen = true,
  isMobile = false,
  onClose
}) => {
  const menuItems = MENU_CONFIG[role] || [];
  const menuRef = useRef<HTMLElement>(null);

  // Handle menu item click - close menu on mobile after navigation
  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Handle click outside menu to close it (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        onClose &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        // Check if click is on overlay (not on menu itself)
        const target = event.target as Element;
        if (target.classList.contains('menu-overlay') || target.closest('.menu-overlay')) {
          onClose();
        }
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobile, isOpen, onClose]);

  // Don't render if not open (for conditional rendering support)
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay - only render on mobile when menu is open */}
      {isMobile && (
        <div
          className="menu-overlay fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Navigation menu */}
      <nav
        ref={menuRef}
        className={`
          bg-gray-50 border-r border-gray-200 h-full flex flex-col z-50
          ${isMobile ? (
            // Mobile: fixed positioning with overlay
            'fixed top-0 left-0 w-64 shadow-lg'
          ) : (
            // Desktop: normal flow
            'w-64'
          )}
        `}
      >
        <div className="p-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                    min-h-[44px] flex items-center
                    ${activeItem === item.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
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
    </>
  );
};