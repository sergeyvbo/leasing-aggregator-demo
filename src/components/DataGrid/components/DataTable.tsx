import type { DataTableProps } from '../types';
import { ActionColumn } from './ActionColumn';

/**
 * DataTable component that renders the main table structure with data
 * Includes sortable headers, custom cell rendering, loading states, and empty states
 */
export function DataTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  loading,
  sortField,
  sortDirection,
  onSort
}: DataTableProps<T>) {
  // Function to extract ID from item (assumes 'id' property exists)
  const getItemId = (item: T): string | number => {
    return (item as any).id || '';
  };

  // Check if we need to show actions column
  const hasActions = onEdit || onDelete;

  // Handle column header click for sorting
  const handleColumnClick = (columnKey: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(columnKey);
    }
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.width || ''
                    }`}
                  >
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
                {hasActions && (
                  <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-3 sm:px-6 py-4 text-sm text-gray-900"
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-3 sm:px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors duration-200' : ''
                    } ${column.width || ''}`}
                    onClick={() => handleColumnClick(String(column.key), column.sortable)}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="truncate">{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col flex-shrink-0">
                          <svg
                            className={`w-3 h-3 transition-colors duration-200 ${
                              sortField === String(column.key) && sortDirection === 'asc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            className={`w-3 h-3 -mt-1 transition-colors duration-200 ${
                              sortField === String(column.key) && sortDirection === 'desc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {hasActions && (
                  <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="hidden sm:inline">Действия</span>
                    <span className="sm:hidden">•••</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-3 sm:px-6 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                      Нет данных для отображения
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 text-center max-w-sm">
                      Данные отсутствуют или не соответствуют критериям поиска
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render table with data
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200' : ''
                  } ${column.width || ''}`}
                  onClick={() => handleColumnClick(String(column.key), column.sortable)}
                >
                  <div className="flex items-center space-x-1">
                    <span className="truncate">{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col flex-shrink-0">
                        <svg
                          className={`w-3 h-3 transition-colors duration-200 ${
                            sortField === String(column.key) && sortDirection === 'asc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className={`w-3 h-3 -mt-1 transition-colors duration-200 ${
                            sortField === String(column.key) && sortDirection === 'desc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {hasActions && (
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Действия</span>
                  <span className="sm:hidden">•••</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={getItemId(item) || index} className="hover:bg-gray-50 transition-colors duration-150">
                {columns.map((column) => {
                  const value = item[column.key];
                  const cellContent = column.render ? column.render(value, item) : String(value);
                  
                  return (
                    <td
                      key={String(column.key)}
                      className="px-3 sm:px-6 py-4 text-sm text-gray-900"
                    >
                      <div className="truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" title={String(value)}>
                        {cellContent}
                      </div>
                    </td>
                  );
                })}
                {hasActions && (
                  <ActionColumn
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    getItemId={getItemId}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}