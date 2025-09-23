import React, { useState } from 'react';
import { TemplatesDataGrid } from '../components/templates';
import { VersionComponent } from '../components/clients/VersionComponent';
import type { TemplatesPageProps, TemplateCollection } from '../types/templates';

const TemplatesPage: React.FC<TemplatesPageProps> = ({
  collections,
  onAddCollection,
  onEditCollection,
  onDeleteCollection,
}) => {

  // Mock version data for the page
  const [currentVersion] = useState({
    id: 'v1',
    number: 1,
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    status: 'active' as const,
    startDate: '2024-01-01',
    endDate: undefined,
    previousVersionId: undefined,
    nextVersionId: undefined,
  });

  const handleVersionChange = (versionId: string) => {
    console.log('Version changed to:', versionId);
  };

  const handleEditStart = () => {
    console.log('Edit started');
  };

  const handleEditEnd = () => {
    console.log('Edit ended');
  };

  const handleAddClick = () => {
    onAddCollection();
  };

  const handleEditClick = (collection: TemplateCollection) => {
    onEditCollection(collection);
  };

  // Handle upload from Excel action
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload templates from Excel clicked');
    alert('Функция загрузки шаблонов из Excel будет реализована');
  };

  // Handle download to Excel action
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download templates to Excel clicked');
    alert('Функция выгрузки шаблонов в Excel будет реализована');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Шаблоны
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Управление шаблонами для различных предметов лизинга
              </p>
            </div>
          </div>
          
          {/* Version Component */}
          <div className="mt-4">
            <VersionComponent
              version={currentVersion}
              onVersionChange={handleVersionChange}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
            />
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <TemplatesDataGrid
        collections={collections}
        onAddCollection={handleAddClick}
        onEditCollection={handleEditClick}
        onDeleteCollection={onDeleteCollection}
        onUploadExcel={handleUploadExcel}
        onDownloadExcel={handleDownloadExcel}
      />
    </div>
  );
};

export default TemplatesPage;
