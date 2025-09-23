import React, { useState, useEffect } from 'react';
import { TemplateEditDataGrid } from '../components/templates';
import { VersionComponent } from '../components/clients/VersionComponent';
import type { TemplateEditPageProps, Template } from '../types/templates';

const TemplateEditPage: React.FC<TemplateEditPageProps> = ({
  collection,
  templates,
  onSave,
  onCancel,
}) => {
  
  const [editingTemplates, setEditingTemplates] = useState<Template[]>(templates);
  const [isModified, setIsModified] = useState(false);
  const [isNewCollection, setIsNewCollection] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setEditingTemplates(templates);
    setIsModified(false);
    setIsNewCollection(collection.id === 'new');
  }, [templates, collection.id]);

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

  const handleAddTemplate = () => {
    const newTemplate: Template = {
      id: `temp_${Date.now()}`,
      name: 'Новый шаблон',
      type: collection.leasingObjectType || 'Выберите тип',
      keyIdentifier: '',
      additionalAttributes: '',
      version: {
        id: 'v1',
        number: 1,
        status: 'draft',
        startDate: undefined,
        endDate: undefined,
        previousVersionId: undefined,
        nextVersionId: undefined,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setEditingTemplates(prev => [...prev, newTemplate]);
    setIsModified(true);
  };

  const handleEditTemplate = (template: Template) => {
    // In a real application, this would open a modal or navigate to edit form
    console.log('Edit template:', template);
    alert('Функция редактирования шаблона будет реализована');
  };

  const handleDeleteTemplate = (template: Template) => {
    if (window.confirm(`Удалить шаблон "${template.name}"?`)) {
      setEditingTemplates(prev => prev.filter(t => t.id !== template.id));
      setIsModified(true);
    }
  };

  const handleSave = () => {
    onSave(editingTemplates);
    setIsModified(false);
  };

  const handleCancel = () => {
    if (isModified) {
      if (window.confirm('У вас есть несохраненные изменения. Продолжить?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {isNewCollection ? 'Создание новой коллекции шаблонов' : 'Редактирование шаблонов'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {isNewCollection 
                  ? 'Создание новой коллекции шаблонов' 
                  : `${collection.leasingCompanyName} - ${collection.leasingObjectType}`
                }
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

      {/* Template Edit Data Grid */}
      <TemplateEditDataGrid
        templates={editingTemplates}
        onAddTemplate={handleAddTemplate}
        onEditTemplate={handleEditTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TemplateEditPage;
