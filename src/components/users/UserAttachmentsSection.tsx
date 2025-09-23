import React from 'react';
import type { UserAttachment } from '../../types/users';
import { EmptyState } from '../common';

interface UserAttachmentsSectionProps {
  attachments: UserAttachment[];
  onAddAttachment?: () => void;
  onDeleteAttachment?: (attachmentId: string) => void;
}

const UserAttachmentsSection: React.FC<UserAttachmentsSectionProps> = ({ 
  attachments, 
  onAddAttachment, 
  onDeleteAttachment 
}) => {
  const handleViewAttachment = (attachment: UserAttachment) => {
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    }
  };

  // Empty state when no attachments
  if (!attachments || attachments.length === 0) {
    return (
      <EmptyState
        icon={<div className="text-4xl">📎</div>}
        title="Нет вложений"
        description="У данного пользователя пока нет загруженных файлов"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="mb-3 md:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-base md:text-lg font-medium text-gray-900 break-words">
            Вложения ({attachments.length})
          </h3>
          {onAddAttachment && (
            <button
              onClick={onAddAttachment}
              className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 min-h-[44px] text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Добавить</span>
            </button>
          )}
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
            onClick={() => handleViewAttachment(attachment)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 mb-2 flex items-center justify-center">
                {attachment.type.startsWith('image/') ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              <div className="text-xs text-gray-600 truncate w-full" title={attachment.name}>
                {attachment.name}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {(attachment.size / 1024).toFixed(0)} KB
              </div>
            </div>
            
            {onDeleteAttachment && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteAttachment(attachment.id);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Удалить файл"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAttachmentsSection;
