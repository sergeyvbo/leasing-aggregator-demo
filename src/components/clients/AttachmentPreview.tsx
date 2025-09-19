import React from 'react';
import type { ClientAttachment, AttachmentPreviewProps } from '../../types/clients';

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onView, onDelete }) => {
  // Get file extension for icon display
  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  // Get file type icon based on MIME type or extension
  const getFileTypeIcon = (attachment: ClientAttachment): string => {
    const extension = getFileExtension(attachment.name);
    const mimeType = attachment.type.toLowerCase();

    // Image files
    if (mimeType.startsWith('image/')) {
      return '🖼️';
    }

    // PDF files
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return '📄';
    }

    // Excel files
    if (mimeType.includes('spreadsheet') || ['xlsx', 'xls'].includes(extension)) {
      return '📊';
    }

    // Word documents
    if (mimeType.includes('document') || ['docx', 'doc'].includes(extension)) {
      return '📝';
    }

    // Archive files
    if (['zip', 'rar', '7z'].includes(extension)) {
      return '🗜️';
    }

    // Default file icon
    return '📎';
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Б';
    
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleClick = () => {
    onView(attachment);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the view action
    if (onDelete) {
      onDelete(attachment.id);
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-200 cursor-pointer group touch-manipulation"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Просмотреть вложение ${attachment.name}`}
    >
      <div className="flex flex-col items-center space-y-2 md:space-y-3">
        {/* Preview or Icon - Enhanced for mobile */}
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          {attachment.canPreview && attachment.previewUrl ? (
            <img
              src={attachment.previewUrl}
              alt={attachment.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to icon if preview fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-xl md:text-2xl">${getFileTypeIcon(attachment)}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-xl md:text-2xl">{getFileTypeIcon(attachment)}</span>
          )}
        </div>

        {/* File Info - Enhanced responsive text */}
        <div className="text-center w-full min-w-0">
          <div 
            className="text-xs md:text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors"
            title={attachment.name}
          >
            {attachment.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatFileSize(attachment.size)}
          </div>
        </div>
      </div>

      {/* Delete button at the bottom - Enhanced for touch */}
      {onDelete && (
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100">
          <button
            onClick={handleDelete}
            className="w-full inline-flex items-center justify-center px-2 py-2 min-h-[44px] md:min-h-[36px] text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors touch-manipulation"
          >
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Удалить</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AttachmentPreview;