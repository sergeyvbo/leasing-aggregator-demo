import React from 'react';
import type { OrganizationAttachmentsSectionProps } from '../../types/organization';
import { EmptyState } from '../common';

/**
 * OrganizationAttachmentsSection displays organization document attachments
 * Based on AttachmentsSection pattern for consistent UI/UX
 * Provides responsive design with proper touch targets for mobile
 */
export const OrganizationAttachmentsSection: React.FC<OrganizationAttachmentsSectionProps> = ({
  attachments,
  onAddAttachment,
  onDeleteAttachment
}) => {
  // Handle file view (mock implementation)
  const handleViewAttachment = (attachment: any) => {
    // For demo purposes, we'll just handle the attachment
    // In a real application, this would open a modal or navigate to a viewer
    
    // Simple implementation: try to open the file in a new tab
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    }
  };

  // Empty state when no attachments
  if (!attachments || attachments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <EmptyState
          icon={<div className="text-4xl">📎</div>}
          title="Нет сканов документов"
          description="У данной организации пока нет загруженных документов и файлов"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="mb-3 md:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-base md:text-lg font-medium text-gray-900 break-words">
            Сканы документов ({attachments.length})
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

      {/* Attachments Grid - Enhanced responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {attachments.map((attachment) => (
          <OrganizationAttachmentPreview
            key={attachment.id}
            attachment={attachment}
            onView={handleViewAttachment}
            onDelete={onDeleteAttachment}
          />
        ))}
      </div>
    </div>
  );
};

// Organization Attachment Preview Component (similar to AttachmentPreview)
const OrganizationAttachmentPreview: React.FC<{
  attachment: any;
  onView: (attachment: any) => void;
  onDelete?: (attachmentId: string) => void;
}> = ({ attachment, onView, onDelete }) => {
  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Б';
    
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Get file type icon based on file extension or MIME type
  const getFileIcon = (fileName: string, mimeType: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (mimeType.includes('pdf') || extension === 'pdf') {
      return '📄';
    } else if (mimeType.includes('word') || ['doc', 'docx'].includes(extension || '')) {
      return '📝';
    } else if (mimeType.includes('excel') || ['xls', 'xlsx'].includes(extension || '')) {
      return '📊';
    } else if (mimeType.includes('image') || ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return '🖼️';
    } else {
      return '📎';
    }
  };

  return (
    <div className="relative group bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(attachment.id);
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600 z-10"
          title="Удалить файл"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* File Content */}
      <div 
        className="cursor-pointer"
        onClick={() => onView(attachment)}
      >
        {/* File Icon */}
        <div className="flex justify-center mb-2">
          <div className="text-3xl">
            {getFileIcon(attachment.name, attachment.type)}
          </div>
        </div>

        {/* File Info */}
        <div className="text-center">
          <p className="text-xs font-medium text-gray-900 truncate mb-1" title={attachment.name}>
            {attachment.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(attachment.size)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationAttachmentsSection;