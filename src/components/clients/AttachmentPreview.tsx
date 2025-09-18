import React from 'react';
import type { ClientAttachment, AttachmentPreviewProps } from '../../types/clients';

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onView }) => {
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

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-200 cursor-pointer group"
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
      <div className="flex flex-col items-center space-y-3">
        {/* Preview or Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
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
                  parent.innerHTML = `<span class="text-2xl">${getFileTypeIcon(attachment)}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-2xl">{getFileTypeIcon(attachment)}</span>
          )}
        </div>

        {/* File Info */}
        <div className="text-center w-full">
          <div 
            className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors"
            title={attachment.name}
          >
            {attachment.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatFileSize(attachment.size)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentPreview;