import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { Broker } from '../types/brokers';
import { getAllBrokers } from '../data/brokersData';
import { formatCurrency } from '../components/DataGrid/utils';
import { LoadingState } from '../components/common';

/**
 * Column configuration for brokers table
 * Displays: Id, ОПФ, Полное наименование, ИНН, количество сделок, итого вознаграждение, успешность, средний размер сделки
 */
const brokersColumns: ColumnDefinition<Broker>[] = [
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
  {
    key: 'successRate',
    title: 'Успешность',
    sortable: true,
    width: 'w-32',
    render: (value: number) => (
      <span className="font-medium text-green-600">
        {value}%
      </span>
    ),
  },
  {
    key: 'averageDealSize',
    title: 'Средний размер сделки',
    sortable: true,
    width: 'w-40',
    render: (value: number) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(value)}
      </span>
    ),
  },
];

interface BrokersPageProps {
  onViewBroker?: (broker: Broker) => void;
}

const BrokersPage: React.FC<BrokersPageProps> = ({ onViewBroker }) => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading brokers data
  useEffect(() => {
    const loadBrokers = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const brokersData = getAllBrokers();
      setBrokers(brokersData);
      setLoading(false);
    };

    loadBrokers();
  }, []);

  // Handle view broker action - navigate to broker details
  const handleViewBroker = (broker: Broker) => {
    if (onViewBroker) {
      onViewBroker(broker);
    }
  };

  // Handle upload from Excel action
  const handleUploadExcel = () => {
    // TODO: Implement upload from Excel functionality
    console.log('Upload brokers from Excel clicked');
    alert('Функция загрузки брокеров из Excel будет реализована');
  };

  // Handle download to Excel action
  const handleDownloadExcel = () => {
    // TODO: Implement download to Excel functionality
    console.log('Download brokers to Excel clicked');
    alert('Функция выгрузки брокеров в Excel будет реализована');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Брокеры</h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Управление брокерскими компаниями и просмотр их информации
            </p>
          </div>
          <LoadingState 
            message="Загрузка списка брокерских компаний..." 
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Брокеры</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Управление брокерскими компаниями и просмотр их информации
          </p>
        </div>
        
        {/* DataGrid component for brokers list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={brokers}
            columns={brokersColumns}
            onEdit={handleViewBroker} // Using onEdit as "view" action since we only have view functionality
            onUploadExcel={handleUploadExcel}
            onDownloadExcel={handleDownloadExcel}
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

export default BrokersPage;
