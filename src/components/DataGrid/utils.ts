import type { ColumnDefinition } from './types';

/**
 * Sorts an array of data by a specified field and direction
 * @param data - Array of data to sort
 * @param field - Field to sort by
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns Sorted array
 */
export const sortData = <T>(
  data: T[],
  field: keyof T,
  direction: 'asc' | 'desc'
): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === 'asc' ? -1 : 1;
    if (bVal == null) return direction === 'asc' ? 1 : -1;
    
    // Handle different data types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
      return direction === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    // Default comparison for other types
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    return 0;
  });
};

/**
 * Filters data based on search term across specified columns
 * @param data - Array of data to filter
 * @param searchTerm - Search term to filter by
 * @param columns - Column definitions to search in
 * @returns Filtered array
 */
export const filterData = <T>(
  data: T[],
  searchTerm: string,
  columns: ColumnDefinition<T>[]
): T[] => {
  if (!searchTerm.trim()) return data;
  
  const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
  
  return data.filter(item =>
    columns.some(column => {
      const value = item[column.key];
      if (value == null) return false;
      
      // Convert value to string and search
      const stringValue = String(value).toLowerCase();
      return stringValue.includes(lowercaseSearchTerm);
    })
  );
};

/**
 * Paginates data by slicing array based on page and page size
 * @param data - Array of data to paginate
 * @param page - Current page number (1-based)
 * @param pageSize - Number of items per page
 * @returns Paginated array slice
 */
export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number
): T[] => {
  if (pageSize <= 0 || page <= 0) return [];
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return data.slice(startIndex, endIndex);
};

/**
 * Formats a number as currency in Russian Rubles
 * @param amount - Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  if (amount == null || isNaN(amount)) return '0 ₽';
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a date string or Date object to Russian locale format
 * @param date - Date string or Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return '';
    
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj);
  } catch (error) {
    return '';
  }
};

/**
 * Calculates total number of pages based on data length and page size
 * @param totalItems - Total number of items
 * @param pageSize - Number of items per page
 * @returns Total number of pages
 */
export const calculateTotalPages = (totalItems: number, pageSize: number): number => {
  if (pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
};