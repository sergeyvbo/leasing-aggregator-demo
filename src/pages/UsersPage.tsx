import React, { useState, useEffect } from 'react';
import type { User } from '../types/users';
import { getAllUsers, createUser, updateUser, deleteUser } from '../data/usersData';
import { UsersDataGrid, UserModal } from '../components/users';
import { LoadingState } from '../components/common';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const usersData = getAllUsers();
      setUsers(usersData);
      setLoading(false);
    };

    loadUsers();
  }, []);

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
        setUsers(prev => prev.filter(u => u.id !== user.id));
      }
    }
  };

  // Handle save user
  const handleSaveUser = (userData: User) => {
    if (editingUser) {
      // Update existing user
      const updatedUser = updateUser(userData.id, userData);
      if (updatedUser) {
        setUsers(prev => prev.map(u => u.id === userData.id ? updatedUser : u));
      }
    } else {
      // Create new user
      const newUser = createUser(userData);
      setUsers(prev => [...prev, newUser]);
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
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload users from Excel clicked');
    alert('Функция загрузки пользователей из Excel будет реализована');
  };

  // Handle download to Excel
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download users to Excel clicked');
    alert('Функция выгрузки пользователей в Excel будет реализована');
  };

  // Show loading state
  if (loading) {
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
            message="Загрузка списка пользователей..." 
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
        </div>
        
        {/* DataGrid component for users list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <UsersDataGrid
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onAdd={handleAddUser}
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
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
