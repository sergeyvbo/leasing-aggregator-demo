import React, { useState } from 'react';
import { VersionComponent } from '../clients/VersionComponent';
import QuotationRangesDataGrid from './QuotationRangesDataGrid';
import QuotationRangeModal from './QuotationRangeModal';
import type { QuotationRangePageProps, QuotationRange } from '../../types/quotationRanges';
import { useExcelData } from '../../hooks/useExcelData';
import type { ExcelImportConfig, ExcelExportConfig } from '../../utils/excelUtils';

const QuotationRangesPage: React.FC<QuotationRangePageProps> = ({
  ranges,
  onAddRange,
  onEditRange,
  onDeleteRange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingRange, setEditingRange] = useState<QuotationRange | null>(null);

  // Конфигурация для импорта Excel
  const importConfig: ExcelImportConfig<QuotationRange> = {
    validateData: (data: any[]) => {
      const errors: string[] = [];
      
      data.forEach((item, index) => {
        if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
        if (!item.leasingCompany) errors.push(`Строка ${index + 2}: отсутствует лизинговая компания`);
        if (!item.term) errors.push(`Строка ${index + 2}: отсутствует срок`);
        if (!item.rate) errors.push(`Строка ${index + 2}: отсутствует ставка`);
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    },
    transformData: (data: any[]) => {
      return data.map(item => ({
        ...item,
        version: Number(item.version) || 1,
        status: item.status || 'draft',
      }));
    }
  };

  // Конфигурация для экспорта Excel
  const exportConfig: ExcelExportConfig<QuotationRange> = {
    fileName: 'quotation-ranges',
    sheetName: 'Диапазоны котировок',
    transformData: (data: QuotationRange[]) => {
      return data.map(range => ({
        'ID': range.id,
        'Лизинговая компания': range.leasingCompany,
        'Срок': range.term,
        'Ставка': range.rate,
        'Аванс': range.advance,
        'Комиссия агента': range.agentFee,
        'Тип графика': range.scheduleType,
        'Статус': range.status,
        'Дата создания': range.createdAt,
      }));
    }
  };

  // Используем хук для работы с Excel
  const {
    data: quotationRanges,
    error: excelError,
    handleUploadExcel,
    handleDownloadExcel,
  } = useExcelData(ranges, importConfig, exportConfig);

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
  const handleUploadExcelAction = async (file: File) => {
    await handleUploadExcel(file);
  };

  // Handle download to Excel action
  const handleDownloadExcelAction = () => {
    handleDownloadExcel();
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
          
          {excelError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Ошибка при работе с Excel
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {excelError}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <QuotationRangesDataGrid
            ranges={quotationRanges}
            onAddRange={handleAddRange}
            onEditRange={handleEditRange}
            onDeleteRange={handleDeleteRange}
            onUploadExcel={handleUploadExcelAction}
            onDownloadExcel={handleDownloadExcelAction}
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
