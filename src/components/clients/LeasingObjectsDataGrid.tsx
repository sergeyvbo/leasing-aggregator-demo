import React, { useState } from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { ColumnDefinition } from '../DataGrid/types';
import type { LeasingObject } from '../../types/clients';
import LeasingObjectModal from './LeasingObjectModal';
import { EmptyState } from '../common';

interface LeasingObjectsDataGridProps {
  leasingObjects: LeasingObject[];
}

const LeasingObjectsDataGrid: React.FC<LeasingObjectsDataGridProps> = ({ leasingObjects }) => {
  const [selectedObject, setSelectedObject] = useState<LeasingObject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date range for contract period
  const formatContractPeriod = (contractPeriod: { from: string; to: string }): string => {
    const fromDate = new Date(contractPeriod.from).toLocaleDateString('ru-RU');
    const toDate = new Date(contractPeriod.to).toLocaleDateString('ru-RU');
    return `${fromDate} - ${toDate}`;
  };

  // Format identifiers array as comma-separated string
  const formatIdentifiers = (identifiers: string[]): string => {
    return identifiers.join(', ');
  };

  // Handle view action
  const handleView = (leasingObject: LeasingObject) => {
    setSelectedObject(leasingObject);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedObject(null);
  };

  // Column definitions for leasing objects data
  const columns: ColumnDefinition<LeasingObject>[] = [
    {
      key: 'name',
      title: 'Наименование предмета лизинга',
      sortable: true,
      width: 'w-1/3',
    },
    {
      key: 'identifiers',
      title: 'Идентификаторы',
      sortable: false,
      width: 'w-1/3',
      render: (value: string[]) => (
        <span className="text-sm text-gray-700">
          {formatIdentifiers(value)}
        </span>
      ),
    },
    {
      key: 'contractPeriod',
      title: 'Срок договора лизинга (с/по)',
      sortable: true,
      width: 'w-1/4',
      render: (value: { from: string; to: string }) => (
        <span className="text-sm text-gray-700">
          {formatContractPeriod(value)}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Статус',
      sortable: true,
      width: 'w-1/6',
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Активный' 
            ? 'bg-green-100 text-green-800' 
            : value === 'Завершен'
            ? 'bg-gray-100 text-gray-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  // Handle empty state
  if (leasingObjects.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
        title="Нет предметов лизинга"
        description="Для данного клиента отсутствуют предметы лизинга."
      />
    );
  }

  return (
    <>
      {/* Main leasing objects data grid */}
      <DataGrid
        data={leasingObjects}
        columns={columns}
        searchable={true}
        sortable={true}
        pageSize={10}
        onEdit={handleView} // Using onEdit for view functionality as per requirements
        className="leasing-objects-grid"
      />
      
      {/* Leasing Object Details Modal */}
      {isModalOpen && selectedObject && (
        <LeasingObjectModal
          leasingObject={selectedObject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default LeasingObjectsDataGrid;