import React from 'react';
import BuildingIcon from '../icons/BuildingIcon';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center min-w-0 flex-1">
            <BuildingIcon size={24} className="text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              Лизинговый Аггрегатор
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Mobile: Show only username initial and logout button */}
            <div className="sm:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {username.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Выйти
              </button>
            </div>
            
            {/* Desktop: Show full welcome message */}
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-600 text-sm md:text-base">Добро пожаловать, {username}</span>
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;