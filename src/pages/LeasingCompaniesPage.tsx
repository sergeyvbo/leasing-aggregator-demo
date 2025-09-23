import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { LeasingCompany } from '../types/leasingCompanies';
import { getAllLeasingCompanies, createEmptyLeasingCompany } from '../data/leasingCompaniesData';
import { formatCurrency } from '../components/DataGrid/utils';
import { LoadingState } from '../components/common';

/**
 * Column configuration for leasing companies table
 * Displays: Id, ОПФ, Полное наименование, ИНН, количество сделок, итого вознаграждение
 */
const leasingCompaniesColumns: ColumnDefinition<LeasingCompany>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 'w-20',
  },
  {
    key: 'opf',
    title: 'ОПФ',
    sortable: true,
    width: 'w-24',
  },
  {
    key: 'fullName',
    title: 'Полное наименование',
    sortable: true,
  },
  {
    key: 'inn',
    title: 'ИНН',
    sortable: true,
    width: 'w-32',
  },
  {
    key: 'dealsCount',
    title: 'Количество сделок',
    sortable: true,
    width: 'w-36',
    render: (value: number) => (
      <span className="text-gray-900">
        {value}
      </span>
    ),
  },
  {
    key: 'totalCommission',
    title: 'Итого вознаграждение',
    sortable: true,
    width: 'w-40',
    render: (value: number) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(value)}
      </span>
    ),
  },
];

interface LeasingCompaniesPageProps {
  onViewLeasingCompany?: (leasingCompany: LeasingCompany) => void;
}

const LeasingCompaniesPage: React.FC<LeasingCompaniesPageProps> = ({ onViewLeasingCompany }) => {
  const [leasingCompanies, setLeasingCompanies] = useState<LeasingCompany[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading leasing companies data
  useEffect(() => {
    const loadLeasingCompanies = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const companiesData = getAllLeasingCompanies();
      setLeasingCompanies(companiesData);
      setLoading(false);
    };

    loadLeasingCompanies();
  }, []);

  // Handle view leasing company action - navigate to company details
  const handleViewLeasingCompany = (leasingCompany: LeasingCompany) => {
    if (onViewLeasingCompany) {
      onViewLeasingCompany(leasingCompany);
    }
  };

  // Handle add leasing company action
  const handleAddLeasingCompany = () => {
    // Create empty leasing company and navigate to details page
    const emptyLeasingCompany = createEmptyLeasingCompany();
    if (onViewLeasingCompany) {
      onViewLeasingCompany(emptyLeasingCompany);
    }
  };

  // Handle upload from Excel action
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload from Excel clicked');
    alert('Функция загрузки из Excel будет реализована');
  };

  // Handle download to Excel action
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download to Excel clicked');
    alert('Функция выгрузки в Excel будет реализована');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Лизинговые компании</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление лизинговыми компаниями и просмотр их информации
            </p>
          </div>
          <LoadingState 
            message="Загрузка списка лизинговых компаний..." 
            size="lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with consistent responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Лизинговые компании</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление лизинговыми компаниями и просмотр их информации
          </p>
        </div>
        
        {/* DataGrid component for leasing companies list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={leasingCompanies}
            columns={leasingCompaniesColumns}
            onAdd={handleAddLeasingCompany}
            onEdit={handleViewLeasingCompany} 
            onDelete={() => {}}
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
            pageSize={10}
            searchable={true}
            sortable={true}
            // No onDelete prop - disables delete functionality
          />
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default LeasingCompaniesPage;
