import React, { useState, useMemo, useCallback } from 'react';
import type { DataGridProps, SortDirection, SortableColumn } from './types';
import { CommandBar } from './components/CommandBar';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';

/**
 * Utility function to sort data by field and direction
 */
const sortData = <T,>(
  data: T[],
  field: keyof T,
  direction: SortDirection
): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === 'asc' ? -1 : 1;
    if (bVal == null) return direction === 'asc' ? 1 : -1;
    
    // Convert to strings for comparison if not numbers
    const aStr = typeof aVal === 'number' ? aVal : String(aVal).toLowerCase();
    const bStr = typeof bVal === 'number' ? bVal : String(bVal).toLowerCase();
    
    if (direction === 'asc') {
      return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
    } else {
      return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
    }
  });
};

/**
 * Utility function to filter data based on search term
 */
const filterData = <T,>(
  data: T[],
  searchTerm: string,
  columns: Array<{ key: keyof T }>
): T[] => {
  if (!searchTerm.trim()) return data;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return data.filter(item =>
    columns.some(column => {
      const value = item[column.key];
      if (value == null) return false;
      return String(value).toLowerCase().includes(lowercaseSearch);
    })
  );
};

/**
 * Utility function to paginate data
 */
const paginateData = <T,>(
  data: T[],
  page: number,
  pageSize: number
): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

/**
 * Main DataGrid component that orchestrates all sub-components
 * Provides complete data grid functionality with sorting, filtering, and pagination
 */
export function DataGrid<T>({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  loading = false,
  pageSize = 10,
  searchable = true,
  sortable = true,
  className = '',
}: DataGridProps<T>) {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Memoized sortable columns for CommandBar
  const sortableColumns: SortableColumn[] = useMemo(() => {
    return columns
      .filter(column => column.sortable)
      .map(column => ({
        key: String(column.key),
        title: column.title,
      }));
  }, [columns]);

  // Process data: filter, sort, and paginate
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm && searchable) {
      result = filterData(result, searchTerm, columns);
    }

    // Apply sorting
    if (sortField && sortable) {
      const sortColumn = columns.find(col => String(col.key) === sortField);
      if (sortColumn) {
        result = sortData(result, sortColumn.key, sortDirection);
      }
    }

    return result;
  }, [data, searchTerm, sortField, sortDirection, columns, searchable, sortable]);

  // Pagination calculations
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = useMemo(() => {
    return paginateData(processedData, currentPage, pageSize);
  }, [processedData, currentPage, pageSize]);

  // Reset to first page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortField, sortDirection, data]);

  // Event handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSortChange = useCallback((field: string, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  }, []);

  const handleSort = useCallback((field: string) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, start with ascending
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-full ${className}`}>
      {/* Command Bar */}
      <CommandBar
        onAdd={onAdd}
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        sortableColumns={sortableColumns}
        searchable={searchable}
        sortable={sortable}
      />

      {/* Data Table with horizontal scroll on mobile */}
      <div className="relative overflow-x-auto">
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}