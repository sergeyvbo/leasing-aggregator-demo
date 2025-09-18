import React from 'react';
import type { ClientAttachment } from '../../types/clients';
import AttachmentPreview from './AttachmentPreview';
import { EmptyState } from '../common';

interface AttachmentsSectionProps {
  attachments: ClientAttachment[];
  onAddAttachment?: () => void;
  onDeleteAttachment?: (attachmentId: string) => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({ attachments, onAddAttachment, onDeleteAttachment }) => {
  const handleViewAttachment = (attachment: ClientAttachment) => {
    // For demo purposes, we'll just log the attachment
    // In a real application, this would open a modal or navigate to a viewer
    console.log('Viewing attachment:', attachment);
    
    // Simple implementation: try to open the file in a new tab
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    }
  };

  // Empty state when no attachments
  if (!attachments || attachments.length === 0) {
    return (
      <EmptyState
        icon={<div className="text-4xl">📎</div>}
        title="Нет сканов документов"
        description="У данного клиента пока нет загруженных документов и файлов"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Сканы документов ({attachments.length})
          </h3>
          {onAddAttachment && (
            <button
              onClick={onAddAttachment}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить
            </button>
          )}
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {attachments.map((attachment) => (
          <AttachmentPreview
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

export default AttachmentsSection;