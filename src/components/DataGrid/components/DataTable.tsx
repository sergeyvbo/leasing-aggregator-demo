import type { DataTableProps } from '../types';

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

  // Calculate actions column width based on number of buttons
  const getActionsColumnClass = () => {
    const buttonCount = (onEdit ? 1 : 0) + (onDelete ? 1 : 0);

    if (buttonCount === 0) return 'w-0';
    if (buttonCount === 1) return 'w-20 md:w-16'; // Single button: smaller width
    if (buttonCount === 2) return 'w-28 md:w-24'; // Two buttons: medium width

    return 'w-36 md:w-32'; // More than 2 buttons: larger width
  };

  const actionsColumnClass = getActionsColumnClass();

  // Handle column header click for sorting
  const handleColumnClick = (columnKey: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(columnKey);
    }
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div className="data-grid-wrapper">
        {/* Main scrollable table */}
        <div className="data-grid-main">
          {/* Header */}
          <div className="data-grid-header-main px-3 sm:px-6">
            <div className="flex w-full">
              {columns.map((column) => (
                <div
                  key={String(column.key)}
                  className={`flex-shrink-0 ${column.width || 'min-w-[120px] flex-1'} px-3 first:pl-0 last:pr-0`}
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Table body */}
          <table className="data-grid-table">
            <tbody className="bg-white">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} data-row-index={index}>
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`px-3 sm:px-6 text-sm text-gray-900 whitespace-nowrap ${column.width || 'min-w-[120px]'}`}
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse max-w-[200px]"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fixed actions column */}
        {hasActions && (
          <div className={`data-grid-actions ${actionsColumnClass}`}>
            {/* Actions header */}
            <div className="data-grid-header-actions px-2 sm:px-4 md:px-6">
              <div className="w-full">
                {/* Empty header for actions column */}
              </div>
            </div>

            {/* Actions rows */}
            <div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="data-grid-actions-row justify-end" data-row-index={index}>
                  <div className="flex items-center gap-2 md:gap-1">
                    {onEdit && <div className="h-11 w-11 md:h-9 md:w-9 bg-gray-200 rounded animate-pulse"></div>}
                    {onDelete && <div className="h-11 w-11 md:h-9 md:w-9 bg-gray-200 rounded animate-pulse"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render empty state
  if (!data || data.length === 0) {
    return (
      <div className="data-grid-wrapper">
        {/* Main scrollable table */}
        <div className="data-grid-main">
          {/* Header */}
          <div className="data-grid-header-main px-3 sm:px-6">
            <div className="flex w-full">
              {columns.map((column) => (
                <div
                  key={String(column.key)}
                  className={`text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-shrink-0 ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200' : ''
                    } ${column.width || 'min-w-[120px] flex-1'} px-3 first:pl-0 last:pr-0`}
                  onClick={() => handleColumnClick(String(column.key), column.sortable)}
                >
                  <div className="flex items-center space-x-1">
                    <span className="truncate">{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col flex-shrink-0">
                        <svg
                          className={`w-3 h-3 transition-colors duration-200 ${sortField === String(column.key) && sortDirection === 'asc'
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
                          className={`w-3 h-3 -mt-1 transition-colors duration-200 ${sortField === String(column.key) && sortDirection === 'desc'
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
                </div>
              ))}
            </div>
          </div>

          {/* Empty state content */}
          <div className="px-3 sm:px-6 py-12 text-center text-sm text-gray-500">
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
          </div>
        </div>

        {/* Fixed actions column */}
        {hasActions && (
          <div className={`data-grid-actions ${actionsColumnClass}`}>
            {/* Actions header */}
            <div className="data-grid-header-actions px-2 sm:px-4 md:px-6">
              <div className="w-full">
                {/* Empty header for actions column */}
              </div>
            </div>

            {/* Empty actions content */}
            <div className="px-2 sm:px-4 md:px-6 py-12 text-center flex items-center justify-center">
              <span className="text-xs text-gray-400">—</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render table with data and fixed actions column
  return (
    <div className="data-grid-wrapper">
      {/* Main scrollable table */}
      <div className="data-grid-main">
        {/* Header */}
        <div className="data-grid-header-main px-3 sm:px-6">
          <div className="flex w-full">
            {columns.map((column) => (
              <div
                key={String(column.key)}
                className={`text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-shrink-0 ${column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200' : ''
                  } ${column.width || 'min-w-[120px] flex-1'} px-3 first:pl-0 last:pr-0`}
                onClick={() => handleColumnClick(String(column.key), column.sortable)}
              >
                <div className="flex items-center space-x-1">
                  <span className="truncate">{column.title}</span>
                  {column.sortable && (
                    <div className="flex flex-col flex-shrink-0">
                      <svg
                        className={`w-3 h-3 transition-colors duration-200 ${sortField === String(column.key) && sortDirection === 'asc'
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
                        className={`w-3 h-3 -mt-1 transition-colors duration-200 ${sortField === String(column.key) && sortDirection === 'desc'
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
              </div>
            ))}
          </div>
        </div>

        {/* Table body */}
        <table className="data-grid-table">
          <tbody className="bg-white">
            {data.map((item, index) => (
              <tr
                key={getItemId(item) || index}
                className="hover:bg-gray-50 transition-colors duration-150"
                data-row-index={index}
              >
                {columns.map((column) => {
                  const value = item[column.key];
                  const cellContent = column.render ? column.render(value, item) : String(value);

                  return (
                    <td
                      key={String(column.key)}
                      className={`px-3 sm:px-6 text-sm text-gray-900 whitespace-nowrap ${column.width || 'min-w-[120px]'}`}
                    >
                      <div className="truncate max-w-[200px]" title={String(value)}>
                        {cellContent}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixed actions column */}
      {hasActions && (
        <div className={`data-grid-actions ${actionsColumnClass}`}>
          {/* Actions header */}
          <div className="data-grid-header-actions px-2 sm:px-4 md:px-6">
            <div className="w-full">
              {/* Empty header for actions column */}
            </div>
          </div>

          {/* Actions rows */}
          <div>
            {data.map((item, index) => (
              <div
                key={getItemId(item) || index}
                className="data-grid-actions-row hover:bg-gray-50 transition-colors duration-150 justify-end"
                data-row-index={index}
              >
                <div className="flex items-center gap-2 md:gap-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="inline-flex items-center justify-center p-2 md:p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 min-h-[44px] min-w-[44px] md:min-h-[36px] md:min-w-[36px] touch-manipulation"
                      title="Редактировать"
                      aria-label="Редактировать запись"
                    >
                      <svg
                        className="w-5 h-5 md:w-4 md:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(getItemId(item))}
                      className="inline-flex items-center justify-center p-2 md:p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95 min-h-[44px] min-w-[44px] md:min-h-[36px] md:min-w-[36px] touch-manipulation"
                      title="Удалить"
                      aria-label="Удалить запись"
                    >
                      <svg
                        className="w-5 h-5 md:w-4 md:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}