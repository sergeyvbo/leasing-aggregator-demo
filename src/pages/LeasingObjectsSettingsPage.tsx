import React, { useState } from 'react';
import { LeasingObjectAvailabilityDataGrid, LeasingObjectAvailabilityModal } from '../components/leasingObjects';
import { VersionComponent } from '../components/clients/VersionComponent';
import type { LeasingObjectAvailabilityPageProps, LeasingObjectAvailabilityRule } from '../types/leasingObjects';

const LeasingObjectsSettingsPage: React.FC<LeasingObjectAvailabilityPageProps> = ({
  rules,
  onAddRule,
  onEditRule,
  onDeleteRule
}) => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<LeasingObjectAvailabilityRule | null>(null);

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

  // Mock data for dropdowns
  const leasingCompanies = [
    { id: '1', name: 'ООО "Альфа-Лизинг"' },
    { id: '2', name: 'ПАО "Бета-Лизинг"' },
    { id: '3', name: 'ООО "Гамма-Лизинг"' },
  ];

  const objectTypes = [
    { id: '1', name: 'Легковые автомобили', category: 'Транспорт', description: 'Легковые автомобили всех классов', isActive: true },
    { id: '2', name: 'Грузовые автомобили', category: 'Транспорт', description: 'Грузовые автомобили и спецтехника', isActive: true },
    { id: '3', name: 'Воздушные суда', category: 'Авиация', description: 'Самолеты, вертолеты и другая авиатехника', isActive: true },
    { id: '4', name: 'Морские суда', category: 'Судоходство', description: 'Корабли, яхты и другая водная техника', isActive: true },
    { id: '5', name: 'Строительная техника', category: 'Оборудование', description: 'Экскаваторы, краны, бульдозеры', isActive: true },
    { id: '6', name: 'Медицинское оборудование', category: 'Медицина', description: 'Диагностическое и лечебное оборудование', isActive: true },
    { id: '7', name: 'IT-оборудование', category: 'Технологии', description: 'Серверы, компьютеры, сетевое оборудование', isActive: true },
    { id: '8', name: 'Промышленное оборудование', category: 'Производство', description: 'Станки, линии, производственные комплексы', isActive: true },
  ];

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
    setEditingRule(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (rule: LeasingObjectAvailabilityRule) => {
    setEditingRule(rule);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRule(null);
  };

  const handleSaveRule = (ruleData: Omit<LeasingObjectAvailabilityRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (editingRule) {
      onEditRule({ ...editingRule, ...ruleData });
    } else {
      onAddRule();
    }
  };

  // Handle upload from Excel action
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload leasing object rules from Excel clicked');
    alert('Функция загрузки правил предметов лизинга из Excel будет реализована');
  };

  // Handle download to Excel action
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download leasing object rules to Excel clicked');
    alert('Функция выгрузки правил предметов лизинга в Excel будет реализована');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Настройка доступных предметов лизинга
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Управление доступностью предметов лизинга для лизинговых компаний
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
      <LeasingObjectAvailabilityDataGrid
        rules={rules}
        onAddRule={handleAddClick}
        onEditRule={handleEditClick}
        onDeleteRule={onDeleteRule}
        onUploadExcel={handleUploadExcel}
        onDownloadExcel={handleDownloadExcel}
      />

      {/* Modal */}
      <LeasingObjectAvailabilityModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveRule}
        rule={editingRule}
        leasingCompanies={leasingCompanies}
        objectTypes={objectTypes}
      />
    </div>
  );
};

export default LeasingObjectsSettingsPage;
