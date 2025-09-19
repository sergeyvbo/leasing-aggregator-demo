import React from 'react';
import type { LoginData } from '../../types';
import UserIcon from '../icons/UserIcon';
import LockIcon from '../icons/LockIcon';
import BuildingIcon from '../icons/BuildingIcon';
import { APP_VERSION } from '../../utils/version';

interface LoginPageProps {
  loginData: LoginData;
  loading: boolean;
  onLoginDataChange: (data: LoginData) => void;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  loginData,
  loading,
  onLoginDataChange,
  onLogin
}) => {
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLoginDataChange({ ...loginData, username: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLoginDataChange({ ...loginData, password: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4 relative">
      {/* Version display in bottom left corner */}
      <div className="absolute bottom-4 left-4 text-blue-200/70 text-xs">
        v. {APP_VERSION}
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BuildingIcon size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Лизинговый Брокер</h1>
          <p className="text-blue-200">Личный кабинет</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="relative">
            <UserIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 z-10" />
            <input
              type="text"
              placeholder="Имя пользователя"
              value={loginData.username}
              onChange={handleUsernameChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm min-h-[44px] text-base touch-manipulation"
              required
            />
          </div>

          <div className="relative">
            <LockIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 z-10" />
            <input
              type="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={handlePasswordChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm min-h-[44px] text-base touch-manipulation"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !loginData.username || !loginData.password}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px] text-base touch-manipulation"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Вход...
              </div>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 text-sm">
          <button className="text-blue-300 hover:text-white transition-colors py-2 min-h-[44px] sm:min-h-[auto] touch-manipulation">
            Регистрация
          </button>
          <button className="text-blue-300 hover:text-white transition-colors py-2 min-h-[44px] sm:min-h-[auto] touch-manipulation">
            Забыли пароль?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;