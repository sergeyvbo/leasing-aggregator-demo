import React, { useState, useEffect } from 'react';
import type { User } from '../types/users';
import { getAllUsers, createUser, updateUser, deleteUser } from '../data/usersData';
import { UsersDataGrid, UserModal } from '../components/users';
import { LoadingState } from '../components/common';
import { useExcelData } from '../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

const UsersPage: React.FC = () => {
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<User> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      data.forEach((item, index) => {
        if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
        if (!item.fullName) errors.push(`Строка ${index + 2}: отсутствует ФИО`);
        if (!item.login) errors.push(`Строка ${index + 2}: отсутствует логин`);
        if (!item.role) errors.push(`Строка ${index + 2}: отсутствует роль`);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },
    transformData: (data: any[]) => {
      return data.map(item => ({
        ...item,
        version: item.version || { id: '1', number: 1, status: 'active' },
        attachments: item.attachments || [],
      }));
    }
  };

  // Конфигурация для экспорта Excel
  const exportConfig: ExcelExportConfig<User> = {
    fileName: 'users',
    sheetName: 'Пользователи',
    transformData: (data: User[]) => {
      return data.map(user => ({
        'ID': user.id,
        'ФИО': user.fullName,
        'Логин': user.login,
        'Роль': user.role,
        'Статус версии': user.version.status,
        'Дата создания': user.createdAt,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: users,
    isLoading: excelLoading,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
    updateData,
  } = useExcelData(initialUsers, importConfig, exportConfig);

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const usersData = getAllUsers();
      setInitialUsers(usersData);
      updateData(usersData);
      setLoading(false);
    };

    loadUsers();
  }, [updateData]);

  // Handle add user
  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    if (window.confirm(`Вы уверены, что хотите удалить пользователя "${user.fullName}"?`)) {
      const success = deleteUser(user.id);
      if (success) {
        updateData(users.filter(u => u.id !== user.id));
      }
    }
  };

  // Handle save user
  const handleSaveUser = (userData: User) => {
    if (editingUser) {
      // Update existing user
      const updatedUser = updateUser(userData.id, userData);
      if (updatedUser) {
        updateData(users.map(u => u.id === userData.id ? updatedUser : u));
      }
    } else {
      // Create new user
      const newUser = createUser(userData);
      updateData([...users, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  // Handle upload from Excel
  const handleUploadExcelAction = async (file: File) => {
    await handleUploadExcel(file);
  };

  // Handle download to Excel
  const handleDownloadExcelAction = () => {
    handleDownloadExcel();
  };

  // Show loading state
  if (loading || excelLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Пользователи</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление пользователями системы
            </p>
          </div>
          <LoadingState 
            message={loading ? "Загрузка списка пользователей..." : "Обработка Excel файла..."} 
            size="lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with consistent responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление пользователями системы
          </p>
          {excelError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Ошибка при работе с Excel
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {excelError}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* DataGrid component for users list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <UsersDataGrid
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onAdd={handleAddUser}
            onUploadExcel={handleUploadExcelAction}
            onDownloadExcel={handleDownloadExcelAction}
            loading={loading}
          />
        </div>

        {/* User Modal */}
        <UserModal
          user={editingUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default UsersPage;
