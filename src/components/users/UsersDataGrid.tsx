import React from 'react';
import { DataGrid } from '../DataGrid/DataGrid';
import type { ColumnDefinition } from '../DataGrid/types';
import type { User } from '../../types/users';
import { ROLES } from '../../types/roles';

/**
 * Column configuration for users table
 * Displays: ID, Полное имя, Логин, Роль
 */
const usersColumns: ColumnDefinition<User>[] = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    width: 'w-20',
  },
  {
    key: 'fullName',
    title: 'Полное имя',
    sortable: true,
  },
  {
    key: 'login',
    title: 'Логин',
    sortable: true,
    width: 'w-32',
  },
  {
    key: 'role',
    title: 'Роль',
    sortable: true,
    width: 'w-40',
    render: (value: string) => {
      const role = ROLES.find(r => r.id === value);
      return (
        <span className="text-gray-900">
          {role?.name || value}
        </span>
      );
    },
  },
];

interface UsersDataGridProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAdd: () => void;
  onUploadExcel: (file: File) => Promise<void>;
  onDownloadExcel: () => void;
  loading?: boolean;
}

const UsersDataGrid: React.FC<UsersDataGridProps> = ({
  users,
  onEdit,
  onAdd,
  onUploadExcel,
  onDownloadExcel,
  loading = false
}) => {
  return (
    <DataGrid
      data={users}
      columns={usersColumns}
      onEdit={onEdit}
      onDelete={()=> {}}
      onAdd={onAdd}
      onUploadExcel={onUploadExcel}
      onDownloadExcel={onDownloadExcel}
      loading={loading}
      pageSize={10}
      searchable={true}
      sortable={true}
    />
  );
};

export default UsersDataGrid;
