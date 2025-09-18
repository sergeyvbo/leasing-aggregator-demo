import type { ReactNode } from 'react';

/**
 * Column definition for DataGrid
 * Generic type T represents the data item type
 */
export interface ColumnDefinition<T> {
  /** The key from the data object to display in this column */
  key: keyof T;
  /** Display title for the column header */
  title: string;
  /** Whether this column can be sorted */
  sortable?: boolean;
  /** Custom render function for the cell content */
  render?: (value: any, item: T) => ReactNode;
  /** CSS width class for the column */
  width?: string;
}

/**
 * Main DataGrid component props
 * Generic type T represents the data item type
 */
export interface DataGridProps<T> {
  /** Array of data items to display */
  data: T[];
  /** Column definitions for the table */
  columns: ColumnDefinition<T>[];
  /** Callback function when add button is clicked */
  onAdd?: () => void;
  /** Callback function when edit button is clicked for a row */
  onEdit?: (item: T) => void;
  /** Callback function when delete button is clicked for a row */
  onDelete?: (id: string | number) => void;
  /** Loading state indicator */
  loading?: boolean;
  /** Number of items per page for pagination */
  pageSize?: number;
  /** Whether to show search functionality */
  searchable?: boolean;
  /** Whether to show sort functionality */
  sortable?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sortable column information for CommandBar
 */
export interface SortableColumn {
  key: string;
  title: string;
}

/**
 * CommandBar component props
 */
export interface CommandBarProps {
  /** Callback function when add button is clicked */
  onAdd?: () => void;
  /** Current search value */
  searchValue: string;
  /** Callback function when search value changes */
  onSearchChange: (value: string) => void;
  /** Current sort field */
  sortField: string;
  /** Current sort direction */
  sortDirection: SortDirection;
  /** Callback function when sort changes */
  onSortChange: (field: string, direction: SortDirection) => void;
  /** Array of columns that can be sorted */
  sortableColumns: SortableColumn[];
  /** Whether search functionality is enabled */
  searchable: boolean;
  /** Whether sort functionality is enabled */
  sortable: boolean;
}

/**
 * DataTable component props
 * Generic type T represents the data item type
 */
export interface DataTableProps<T> {
  /** Array of data items to display */
  data: T[];
  /** Column definitions for the table */
  columns: ColumnDefinition<T>[];
  /** Callback function when edit button is clicked for a row */
  onEdit?: (item: T) => void;
  /** Callback function when delete button is clicked for a row */
  onDelete?: (id: string | number) => void;
  /** Loading state indicator */
  loading: boolean;
  /** Current sort field */
  sortField: string;
  /** Current sort direction */
  sortDirection: SortDirection;
  /** Callback function when column header is clicked for sorting */
  onSort: (field: string) => void;
}

/**
 * ActionColumn component props
 * Generic type T represents the data item type
 */
export interface ActionColumnProps<T> {
  /** The data item for this row */
  item: T;
  /** Callback function when edit button is clicked */
  onEdit?: (item: T) => void;
  /** Callback function when delete button is clicked */
  onDelete?: (id: string | number) => void;
  /** Function to extract the ID from an item */
  getItemId: (item: T) => string | number;
}

/**
 * Pagination component props
 */
export interface PaginationProps {
  /** Current active page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Number of items per page */
  pageSize: number;
  /** Callback function when page changes */
  onPageChange: (page: number) => void;
}

/**
 * Deal model interface for the deals page integration
 */
export interface Deal {
  id: string;
  client: string;
  amount: number;
  status: 'В обработке' | 'Одобрено' | 'Отклонено' | 'Завершено';
  date: string;
}

/**
 * Internal state interface for DataGrid component
 */
export interface DataGridState {
  currentPage: number;
  searchTerm: string;
  sortField: string;
  sortDirection: SortDirection;
}

/**
 * Utility function type for sorting data
 */
export type SortFunction = <T>(
  data: T[],
  field: keyof T,
  direction: SortDirection
) => T[];

/**
 * Utility function type for filtering data
 */
export type FilterFunction = <T>(
  data: T[],
  searchTerm: string,
  columns: ColumnDefinition<T>[]
) => T[];

/**
 * Utility function type for paginating data
 */
export type PaginateFunction = <T>(
  data: T[],
  page: number,
  pageSize: number
) => T[];