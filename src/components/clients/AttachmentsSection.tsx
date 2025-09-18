import React from 'react';
import type { ClientAttachment } from '../../types/clients';
import AttachmentPreview from './AttachmentPreview';
import { EmptyState } from '../common';

interface AttachmentsSectionProps {
  attachments: ClientAttachment[];
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({ attachments }) => {
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
        title="Нет вложений"
        description="У данного клиента пока нет загруженных документов и файлов"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Вложения ({attachments.length})
          </h3>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {attachments.map((attachment) => (
          <AttachmentPreview
            key={attachment.id}
            attachment={attachment}
            onView={handleViewAttachment}
          />
        ))}
      </div>
    </div>
  );
};

export default AttachmentsSection;