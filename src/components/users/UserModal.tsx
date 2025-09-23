import React, { useState, useEffect } from 'react';
import type { User, UserFormData, UserAttachment } from '../../types/users';
import { ROLE_IDS, ROLES } from '../../types/roles';
import UserVersionComponent from './UserVersionComponent';
import UserAttachmentsSection from './UserAttachmentsSection';

interface UserModalProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    login: '',
    role: ROLE_IDS.BROKER
  });
  const [attachments, setAttachments] = useState<UserAttachment[]>([]);
  const [version, setVersion] = useState({
    id: '1',
    number: 1,
    status: 'active' as const,
    startDate: '2024-01-01',
    endDate: undefined,
    previousVersionId: undefined,
    nextVersionId: undefined
  });

  // Reset form when modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      if (user) {
        // Edit mode
        setFormData({
          fullName: user.fullName,
          login: user.login,
          role: user.role
        });
        setAttachments(user.attachments);
        setVersion({
          id: '1',
          number: 1,
          status: 'active',
          startDate: new Date().toISOString().split('T')[0],
          endDate: undefined,
          previousVersionId: undefined,
          nextVersionId: undefined
        });
      } else {
        // Add mode
        setFormData({
          fullName: '',
          login: '',
          role: ROLE_IDS.BROKER
        });
        setAttachments([]);
        setVersion({
          id: '1',
          number: 1,
          status: 'active',
          startDate: new Date().toISOString().split('T')[0],
          endDate: undefined,
          previousVersionId: undefined,
          nextVersionId: undefined
        });
      }
    }
  }, [isOpen, user]);

  const handleFieldChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAttachment = () => {
    // TODO: Implement file upload functionality
    const mockAttachment: UserAttachment = {
      id: `att_${Date.now()}`,
      name: 'Новый файл.pdf',
      type: 'application/pdf',
      size: 1024000,
      url: '#',
      canPreview: false
    };

    setAttachments(prev => [...prev, mockAttachment]);
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const handleVersionChange = (versionId: string) => {
    // TODO: Implement version switching
    console.log('Version changed to:', versionId);
  };

  const handleSave = () => {
    if (!formData.fullName.trim()) {
      alert('Пожалуйста, укажите полное имя пользователя');
      return;
    }

    if (!formData.login.trim()) {
      alert('Пожалуйста, укажите логин пользователя');
      return;
    }

    const userToSave: User = {
      id: user?.id || `user_${Date.now()}`,
      fullName: formData.fullName,
      login: formData.login,
      role: formData.role,
      version: version,
      attachments: attachments,
      createdAt: user?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(userToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {user ? 'Редактировать пользователя' : 'Добавить пользователя'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] md:p-1 flex items-center justify-center touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Version Component */}
            <div>
              <UserVersionComponent
                version={version}
                onVersionChange={handleVersionChange}
                onEditStart={() => {}}
                onEditEnd={() => {}}
              />
            </div>

            {/* User Form */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Информация о пользователе</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                    placeholder="Введите полное имя пользователя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Логин *
                  </label>
                  <input
                    type="text"
                    value={formData.login}
                    onChange={(e) => handleFieldChange('login', e.target.value)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation"
                    placeholder="Введите логин пользователя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Роль *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleFieldChange('role', e.target.value as any)}
                    className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] md:min-h-[auto] text-base touch-manipulation bg-white"
                  >
                    {ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div>
              <UserAttachmentsSection
                attachments={attachments}
                onAddAttachment={handleAddAttachment}
                onDeleteAttachment={handleDeleteAttachment}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-4 md:p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-3 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-3 md:py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              {user ? 'Сохранить изменения' : 'Добавить пользователя'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
