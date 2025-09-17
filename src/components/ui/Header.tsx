import React from 'react';
import BuildingIcon from '../icons/BuildingIcon';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BuildingIcon size={32} className="text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Лизинговый Аггрегатор</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Добро пожаловать, {username}</span>
            <button 
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;