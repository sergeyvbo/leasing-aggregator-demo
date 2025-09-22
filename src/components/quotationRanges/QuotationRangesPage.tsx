import React, { useState } from 'react';
import { VersionComponent } from '../clients/VersionComponent';
import QuotationRangesDataGrid from './QuotationRangesDataGrid';
import QuotationRangeModal from './QuotationRangeModal';
import type { QuotationRangePageProps, QuotationRange } from '../../types/quotationRanges';

const QuotationRangesPage: React.FC<QuotationRangePageProps> = ({
  ranges,
  onAddRange,
  onEditRange,
  onDeleteRange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingRange, setEditingRange] = useState<QuotationRange | null>(null);

  const handleEditStart = () => {
    // Handle edit start if needed
  };

  const handleEditEnd = () => {
    // Handle edit end if needed
  };

  const handleAddRange = () => {
    setModalMode('add');
    setEditingRange(null);
    setIsModalOpen(true);
  };

  const handleEditRange = (rangeId: string) => {
    const range = ranges.find(r => r.id === rangeId);
    if (range) {
      setModalMode('edit');
      setEditingRange(range);
      setIsModalOpen(true);
    }
  };

  const handleDeleteRange = (rangeId: string) => {
    if (onDeleteRange) {
      onDeleteRange(rangeId);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRange(null);
  };

  const handleModalSave = (rangeData: Omit<QuotationRange, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (modalMode === 'add' && onAddRange) {
      // В реальном приложении здесь был бы вызов API
      console.log('Adding range:', rangeData);
      onAddRange();
    } else if (modalMode === 'edit' && onEditRange && editingRange) {
      // В реальном приложении здесь был бы вызов API
      console.log('Editing range:', editingRange.id, rangeData);
      onEditRange(editingRange.id);
    }
  };

  // Handle upload from Excel action
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload quotation ranges from Excel clicked');
    alert('Функция загрузки диапазонов котировок из Excel будет реализована');
  };

  // Handle download to Excel action
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download quotation ranges to Excel clicked');
    alert('Функция выгрузки диапазонов котировок в Excel будет реализована');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Диапазоны котировок
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Управление диапазонами котировок по лизинговым компаниям
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Version Component */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Версионирование правил
          </h2>
          <VersionComponent
            version={{
              id: '1',
              number: 1,
              status: 'active',
              startDate: '01.09.2025',
              endDate: '31.12.2025'
            }}
            onVersionChange={() => {}}
            onEditStart={handleEditStart}
            onEditEnd={handleEditEnd}
          />
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Правила диапазонов котировок
          </h2>
          
          <QuotationRangesDataGrid
            ranges={ranges}
            onAddRange={handleAddRange}
            onEditRange={handleEditRange}
            onDeleteRange={handleDeleteRange}
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
          />
        </div>
      </div>

      {/* Modal */}
      <QuotationRangeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        range={editingRange}
        mode={modalMode}
      />
    </div>
  );
};

export default QuotationRangesPage;
