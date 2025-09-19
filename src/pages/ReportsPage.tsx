import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { Report } from '../types/reports';
import { getAllReports } from '../data/reportsData';
import { LoadingState } from '../components/common';

/**
 * Column configuration for reports table
 * Displays: Name, Description, Category, Last Generated
 */
const reportsColumns: ColumnDefinition<Report>[] = [
  {
    key: 'name',
    title: 'Название отчета',
    sortable: true,
    width: 'w-48',
  },
  {
    key: 'description',
    title: 'Описание',
    sortable: false,
  },
  {
    key: 'category',
    title: 'Категория',
    sortable: true,
    width: 'w-32',
    render: (value: string) => {
      const categoryLabels = {
        financial: 'Финансовые',
        operational: 'Операционные',
        analytical: 'Аналитические'
      };
      const categoryColors = {
        financial: 'bg-green-100 text-green-800',
        operational: 'bg-blue-100 text-blue-800',
        analytical: 'bg-purple-100 text-purple-800'
      };
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[value as keyof typeof categoryColors]}`}>
          {categoryLabels[value as keyof typeof categoryLabels]}
        </span>
      );
    },
  },
  {
    key: 'lastGenerated',
    title: 'Последнее создание',
    sortable: true,
    width: 'w-40',
    render: (value: Date | undefined) => {
      if (!value) {
        return (
          <span className="text-gray-400 text-sm">
            Не создавался
          </span>
        );
      }
      
      return (
        <span className="text-gray-900 text-sm">
          {value.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      );
    },
  },
];

interface ReportsPageProps {
  onViewReport?: (report: Report) => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onViewReport }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading reports data
  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const reportsData = getAllReports();
      setReports(reportsData);
      setLoading(false);
    };

    loadReports();
  }, []);

  // Handle view report action - navigate to report details
  const handleViewReport = (report: Report) => {
    if (onViewReport) {
      onViewReport(report);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Отчеты</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Создание и просмотр отчетов по лизинговой деятельности
            </p>
          </div>
          <LoadingState 
            message="Загрузка списка отчетов..." 
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Отчеты</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Создание и просмотр отчетов по лизинговой деятельности
          </p>
        </div>
        
        {/* DataGrid component for reports list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={reports}
            columns={reportsColumns}
            onEdit={handleViewReport} // Using onEdit as "view" action since we only have view functionality
            pageSize={10}
            searchable={true}
            sortable={true}
            // No onAdd prop - disables add functionality as required
            // No onDelete prop - disables delete functionality
          />
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
};

export default ReportsPage;