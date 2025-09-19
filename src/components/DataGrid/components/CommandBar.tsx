import React from 'react';
import type { CommandBarProps } from '../types';

/**
 * CommandBar component for DataGrid
 * Provides add button, search functionality, and sort controls
 */
export const CommandBar: React.FC<CommandBarProps> = ({
  onAdd,
  searchValue,
  onSearchChange,
  sortField,
  sortDirection,
  onSortChange,
  sortableColumns,
  searchable,
  sortable,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const field = event.target.value;
    if (field) {
      onSortChange(field, sortDirection);
    }
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const direction = event.target.value as 'asc' | 'desc';
    onSortChange(sortField, direction);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(sortField, newDirection);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
      {/* Left side - Add button */}
      <div className="flex items-center">
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center px-4 py-3 md:py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 active:scale-95 min-h-[44px] md:min-h-[auto] touch-manipulation"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Добавить</span>
            <span className="sm:hidden">+</span>
          </button>
        )}
      </div>

      {/* Right side - Search and Sort controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        {/* Search input */}
        {searchable && (
          <div className="relative min-w-0 flex-1 sm:flex-initial sm:w-64 lg:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Поиск..."
              className="block w-full pl-10 pr-3 py-3 md:py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 min-h-[44px] md:min-h-[auto] touch-manipulation"
            />
          </div>
        )}

        {/* Sort controls */}
        {sortable && sortableColumns.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
            {/* Sort field selector */}
            <select
              value={sortField}
              onChange={handleSortFieldChange}
              className="block w-full sm:w-auto min-w-0 sm:min-w-[140px] px-3 py-3 md:py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[44px] md:min-h-[auto] touch-manipulation"
            >
              <option value="">Сортировка</option>
              {sortableColumns.map((column) => (
                <option key={column.key} value={column.key}>
                  {column.title}
                </option>
              ))}
            </select>

            {/* Sort direction controls */}
            {sortField && (
              <div className="flex items-center gap-3 sm:gap-2">
                <select
                  value={sortDirection}
                  onChange={handleSortDirectionChange}
                  className="block w-full sm:w-auto min-w-0 sm:min-w-[120px] px-3 py-3 md:py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[44px] md:min-h-[auto] touch-manipulation"
                >
                  <option value="asc">↑ По возр.</option>
                  <option value="desc">↓ По убыв.</option>
                </select>

                {/* Sort direction toggle button */}
                <button
                  onClick={toggleSortDirection}
                  className="inline-flex items-center justify-center p-3 md:p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] touch-manipulation"
                  title={`Сортировать ${sortDirection === 'asc' ? 'по убыванию' : 'по возрастанию'}`}
                  aria-label={`Изменить направление сортировки на ${sortDirection === 'asc' ? 'убывание' : 'возрастание'}`}
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      sortDirection === 'desc' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};