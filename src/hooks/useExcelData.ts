import { useState, useCallback } from 'react';
import { readExcelFile, exportToExcel, type ExcelImportConfig, type ExcelExportConfig} from '../utils/excelUtils';

/**
 * Хук для работы с Excel данными
 * @param initialData - начальные данные
 * @param importConfig - конфигурация для импорта
 * @param exportConfig - конфигурация для экспорта
 */
export function useExcelData<T>(
  initialData: T[],
  importConfig?: ExcelImportConfig<T>,
  exportConfig?: ExcelExportConfig<T>
) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Загружает данные из Excel файла
   */
  const handleUploadExcel = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await readExcelFile<T>(file, importConfig);
      
      if (result.errors.length > 0) {
        setError(result.errors.join(', '));
        return;
      }

      setData(result.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [importConfig]);

  /**
   * Выгружает данные в Excel файл
   */
  const handleDownloadExcel = useCallback(() => {
    if (!exportConfig) {
      setError('Конфигурация экспорта не задана');
      return;
    }

    try {
      exportToExcel(data, exportConfig);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
    }
  }, [data, exportConfig]);

  /**
   * Обновляет данные
   */
  const updateData = useCallback((newData: T[]) => {
    setData(newData);
  }, []);

  /**
   * Очищает ошибку
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    handleUploadExcel,
    handleDownloadExcel,
    updateData,
    clearError,
  };
}
