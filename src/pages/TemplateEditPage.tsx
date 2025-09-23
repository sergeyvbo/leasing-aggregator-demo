import React, { useState, useEffect } from 'react';
import { TemplateEditDataGrid } from '../components/templates';
import { VersionComponent } from '../components/clients/VersionComponent';
import type { TemplateEditPageProps, Template } from '../types/templates';
import { mockLeasingCompanies } from '../data/leasingCompaniesData';
import { leasingObjectTypes } from '../data/leasingObjectsData';

const TemplateEditPage: React.FC<TemplateEditPageProps> = ({
  collection,
  templates,
  onSave,
  onCancel,
}) => {
  
  const [editingTemplates, setEditingTemplates] = useState<Template[]>(templates);
  const [isModified, setIsModified] = useState(false);
  const [isNewCollection, setIsNewCollection] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    leasingCompanyId: collection.leasingCompanyId || '',
    leasingObjectType: collection.leasingObjectType || '',
    templateNames: collection.templateNames || '',
  });

  // Update local state when props change
  useEffect(() => {
    setEditingTemplates(templates);
    setIsModified(false);
    setIsNewCollection(collection.id === 'new');
    
    // Update form data
    setFormData({
      leasingCompanyId: collection.leasingCompanyId || '',
      leasingObjectType: collection.leasingObjectType || '',
      templateNames: collection.templateNames || '',
    });
  }, [templates, collection]);

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

  // Handle form field changes
  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsModified(true);
  };

  // Handle template names change (convert between string and array)
  const handleTemplateNamesChange = (templateNames: string) => {
    setFormData(prev => ({
      ...prev,
      templateNames
    }));
    setIsModified(true);
  };

  // Add new template name
  const handleAddTemplateName = () => {
    const newName = prompt('Введите название шаблона:');
    if (newName && newName.trim()) {
      const currentNames = formData.templateNames ? formData.templateNames.split(';') : [];
      const updatedNames = [...currentNames, newName.trim()].join(';');
      handleTemplateNamesChange(updatedNames);
    }
  };

  // Remove template name
  const handleRemoveTemplateName = (index: number) => {
    const currentNames = formData.templateNames ? formData.templateNames.split(';') : [];
    const updatedNames = currentNames.filter((_, i) => i !== index).join(';');
    handleTemplateNamesChange(updatedNames);
  };

  // Edit template name
  const handleEditTemplateName = (index: number) => {
    const currentNames = formData.templateNames ? formData.templateNames.split(';') : [];
    const newName = prompt('Введите новое название шаблона:', currentNames[index]);
    if (newName && newName.trim()) {
      const updatedNames = [...currentNames];
      updatedNames[index] = newName.trim();
      handleTemplateNamesChange(updatedNames.join(';'));
    }
  };

  const handleAddTemplate = () => {
    const newTemplate: Template = {
      id: `temp_${Date.now()}`,
      name: 'Новый шаблон',
      type: formData.leasingObjectType || 'Выберите тип',
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
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад к шаблонам
                </button>
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mt-2">
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

      {/* Form Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Основные параметры</h2>
        </div>
        
        <div className="px-4 md:px-6 py-6 space-y-6">
          {/* Leasing Company Selection */}
          <div>
            <label htmlFor="leasingCompany" className="block text-sm font-medium text-gray-700 mb-2">
              Лизинговая компания *
            </label>
            <select
              id="leasingCompany"
              value={formData.leasingCompanyId}
              onChange={(e) => handleFormChange('leasingCompanyId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите лизинговую компанию</option>
              {mockLeasingCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Leasing Object Type Selection */}
          <div>
            <label htmlFor="leasingObjectType" className="block text-sm font-medium text-gray-700 mb-2">
              Предмет лизинга *
            </label>
            <select
              id="leasingObjectType"
              value={formData.leasingObjectType}
              onChange={(e) => handleFormChange('leasingObjectType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите предмет лизинга</option>
              {leasingObjectTypes.map((objectType) => (
                <option key={objectType.id} value={objectType.name}>
                  {objectType.name}
                </option>
              ))}
            </select>
          </div>

          {/* Template Names Collection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Коллекция шаблонов *
            </label>
            <div className="space-y-3">
              {/* Template Names List */}
              <div className="space-y-2">
                {formData.templateNames ? (
                  formData.templateNames.split(';').map((name, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-700">{name.trim()}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTemplateName(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => handleRemoveTemplateName(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic">Шаблоны не добавлены</div>
                )}
              </div>
              
              {/* Add Template Button */}
              <button
                onClick={handleAddTemplateName}
                className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                + Добавить шаблон
              </button>
            </div>
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
