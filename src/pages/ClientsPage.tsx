import React, { useState, useEffect } from 'react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import type { ColumnDefinition } from '../components/DataGrid/types';
import type { Client } from '../types/clients';
import { getAllClients } from '../data/clientsData';
import { formatCurrency } from '../components/DataGrid/utils';
import { LoadingState } from '../components/common';

/**
 * Column configuration for clients table
 * Displays: Id, ОПФ, Полное наименование, ИНН, количество сделок, итого вознаграждение
 */
const clientsColumns: ColumnDefinition<Client>[] = [
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

interface ClientsPageProps {
  onViewClient?: (client: Client) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ onViewClient }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading clients data
  useEffect(() => {
    const loadClients = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const clientsData = getAllClients();
      setClients(clientsData);
      setLoading(false);
    };

    loadClients();
  }, []);

  // Handle view client action - navigate to client details
  const handleViewClient = (client: Client) => {
    if (onViewClient) {
      onViewClient(client);
    } else {
      console.log('View client:', client);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Мои клиенты</h1>
            <p className="text-sm text-gray-600 mt-2">
              Управление клиентами и просмотр их информации
            </p>
          </div>
          <LoadingState 
            message="Загрузка списка клиентов..." 
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
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Мои клиенты</h1>
          <p className="text-sm text-gray-600 mt-2">
            Управление клиентами и просмотр их информации
          </p>
        </div>
        
        {/* DataGrid component for clients list */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            data={clients}
            columns={clientsColumns}
            onEdit={handleViewClient} // Using onEdit as "view" action since we only have view functionality
            pageSize={10}
            searchable={true}
            sortable={true}
            // No onAdd prop - disables add functionality as required
            // No onDelete prop - disables delete functionality
          />
        </div>

        {/* Bottom spacing for better UX */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default ClientsPage;