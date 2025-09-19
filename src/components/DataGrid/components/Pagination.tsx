import React from 'react';
import type { PaginationProps } from '../types';

/**
 * Pagination component for DataGrid
 * Provides navigation controls for paginated data
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  // Hide pagination when no data
  if (totalItems === 0) {
    return null;
  }

  // Show simplified pagination info for single page
  const showNavigation = totalPages > 1;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      // Adjust if we're near the beginning or end
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 bg-gray-50 border-t border-gray-200 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between items-center sm:hidden">
        {showNavigation ? (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 min-h-[44px] min-w-[80px] touch-manipulation"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
              Назад
            </button>
            <div className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white rounded-lg border border-gray-200">
              <span className="font-medium">{currentPage}</span>
              <span className="mx-1 text-gray-500">из</span>
              <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 min-h-[44px] min-w-[80px] touch-manipulation"
            >
              Далее
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex justify-center w-full">
            <p className="text-sm text-gray-700 py-2">
              Показано {totalItems} из {totalItems} результатов
            </p>
          </div>
        )}
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Показано{' '}
            <span className="font-medium">{startItem}</span>
            {' '}до{' '}
            <span className="font-medium">{endItem}</span>
            {' '}из{' '}
            <span className="font-medium">{totalItems}</span>
            {' '}результатов
          </p>
        </div>
        
        {showNavigation && (
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm" aria-label="Pagination">
              {/* Previous button */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="relative inline-flex items-center justify-center rounded-l-lg px-3 py-2.5 md:px-2 md:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] touch-manipulation"
              >
                <span className="sr-only">Предыдущая</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Page numbers */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`relative inline-flex items-center justify-center px-4 py-2.5 md:py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] touch-manipulation ${
                    page === currentPage
                      ? 'z-10 bg-blue-600 text-white hover:bg-blue-700 ring-blue-600'
                      : 'text-gray-900 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center justify-center rounded-r-lg px-3 py-2.5 md:px-2 md:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px] min-w-[44px] md:min-h-[auto] md:min-w-[auto] touch-manipulation"
              >
                <span className="sr-only">Следующая</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};