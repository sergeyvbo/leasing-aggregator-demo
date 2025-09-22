import React from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { ColumnDefinition, SummaryConfig } from '../DataGrid/types';
import type { ClientBrokerBindingRule, ClientBrokerBindingDataGridProps } from '../../types/clientBrokerBinding';
import { EmptyState } from '../common';
import ClientBrokerBindingActionsColumn from './ClientBrokerBindingActionsColumn';

const ClientBrokerBindingDataGrid: React.FC<ClientBrokerBindingDataGridProps> = ({ 
  rules, 
  onAddRule,
  onEditRule,
  onDeleteRule,
}) => {
  // Format restriction with color coding
  const formatRestriction = (restriction: 'allow' | 'deny'): React.ReactNode => {
    const restrictionConfig = {
      'allow': {
        text: 'закрепить',
        className: 'bg-green-100 text-green-800'
      },
      'deny': {
        text: 'запретить',
        className: 'bg-red-100 text-red-800'
      }
    };

    const config = restrictionConfig[restriction];

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.text}
      </span>
    );
  };

  const handleEditRule = (ruleId: string) => {
    if (onEditRule) {
      onEditRule(ruleId);
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    if (onDeleteRule) {
      onDeleteRule(ruleId);
    }
  };

  // Column definitions for client-broker binding rules
  const columns: ColumnDefinition<ClientBrokerBindingRule>[] = [
    {
      key: 'leasingCompanyName',
      title: 'Лизинговая компания',
      sortable: true,
      width: 'w-1/4',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'clientInn',
      title: 'ИНН клиента',
      sortable: true,
      width: 'w-1/6',
      render: (value: string) => (
        <span className="font-mono text-sm text-gray-700">{value}</span>
      ),
    },
    {
      key: 'brokerName',
      title: 'Брокер',
      sortable: true,
      width: 'w-1/4',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'restriction',
      title: 'Ограничение',
      sortable: true,
      width: 'w-1/6',
      render: (value: 'allow' | 'deny') => formatRestriction(value),
    },
  ];

  // Summary configuration for binding rules statistics
  const summaryConfig: SummaryConfig<ClientBrokerBindingRule> = {
    calculate: (data: ClientBrokerBindingRule[]) => ({
      totalRules: data.length,
      allowRules: data.filter(rule => rule.restriction === 'allow').length,
      denyRules: data.filter(rule => rule.restriction === 'deny').length,
    }),
    render: (summaryData: Record<string, any>) => (
      <div className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <span className="text-sm font-medium text-gray-900">Итого правил:</span>
          <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 space-y-2 sm:space-y-0 text-xs md:text-sm">
            <div className="break-words">
              <span className="text-gray-600">Всего: </span>
              <span className="font-medium text-gray-900">{summaryData.totalRules}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Закрепить: </span>
              <span className="font-medium text-green-700">{summaryData.allowRules}</span>
            </div>
            <div className="break-words">
              <span className="text-gray-600">Запретить: </span>
              <span className="font-medium text-red-700">{summaryData.denyRules}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  // Add custom actions column
  const columnsWithActions: ColumnDefinition<ClientBrokerBindingRule>[] = [
    ...columns,
    {
      key: 'id' as keyof ClientBrokerBindingRule, // Use existing key but override render
      title: 'Действия',
      sortable: false,
      width: 'w-32',
      render: (_, rule: ClientBrokerBindingRule) => (
        <ClientBrokerBindingActionsColumn
          rule={rule}
          onEdit={handleEditRule}
          onDelete={handleDeleteRule}
        />
      ),
    },
  ];

  // Handle empty state
  if (rules.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="Нет правил закрепления"
        description="Правила закрепления клиентов за брокерами пока не созданы."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <DataGrid
        data={rules}
        columns={columnsWithActions}
        onAdd={onAddRule}
        searchable={true}
        sortable={true}
        pageSize={10}
        summary={summaryConfig}
        className="client-broker-binding-grid min-w-full"
      />
    </div>
  );
};

export default ClientBrokerBindingDataGrid;
