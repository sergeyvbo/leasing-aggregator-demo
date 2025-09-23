import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Интерфейс для конфигурации импорта Excel
 */
export interface ExcelImportConfig<T> {
  /** Функция для валидации данных из Excel */
  validateData?: (data: any[]) => { isValid: boolean; errors: string[] };
  /** Функция для преобразования данных из Excel в нужный формат */
  transformData?: (data: any[]) => T[];
  /** Название листа для чтения (по умолчанию первый лист) */
  sheetName?: string;
  /** Начальная строка для чтения данных (по умолчанию 1) */
  startRow?: number;
}

/**
 * Интерфейс для конфигурации экспорта Excel
 */
export interface ExcelExportConfig<T> {
  /** Название файла */
  fileName: string;
  /** Название листа */
  sheetName?: string;
  /** Функция для преобразования данных перед экспортом */
  transformData?: (data: T[]) => any[];
  /** Заголовки колонок */
  headers?: string[];
}

/**
 * Читает Excel файл и возвращает данные
 * @param file - файл Excel
 * @param config - конфигурация импорта
 * @returns Promise с данными или ошибкой
 */
export async function readExcelFile<T>(
  file: File,
  config: ExcelImportConfig<T> = {}
): Promise<{ data: T[]; errors: string[] }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          resolve({ data: [], errors: ['Не удалось прочитать файл'] });
          return;
        }

        // Читаем Excel файл
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = config.sheetName || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        if (!worksheet) {
          resolve({ data: [], errors: [`Лист "${sheetName}" не найден`] });
          return;
        }

        // Конвертируем в JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        });

        // Пропускаем заголовки если указано
        const startRow = config.startRow || 1;
        const dataRows = jsonData.slice(startRow - 1);

        // Преобразуем в объекты
        const headers = jsonData[0] as string[];
        const objects = dataRows.map((row: unknown) => {
          const rowArray = row as any[];
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = rowArray[index] || '';
          });
          return obj;
        });

        // Валидация данных
        let errors: string[] = [];
        if (config.validateData) {
          const validation = config.validateData(objects);
          if (!validation.isValid) {
            errors = validation.errors;
          }
        }

        // Преобразование данных
        let finalData = objects;
        if (config.transformData && errors.length === 0) {
          finalData = config.transformData(objects);
        }

        resolve({ data: finalData as T[], errors });
      } catch (error) {
        resolve({ 
          data: [], 
          errors: [`Ошибка при чтении файла: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`] 
        });
      }
    };

    reader.onerror = () => {
      resolve({ data: [], errors: ['Ошибка при чтении файла'] });
    };

    reader.readAsBinaryString(file);
  });
}

/**
 * Экспортирует данные в Excel файл
 * @param data - данные для экспорта
 * @param config - конфигурация экспорта
 */
export function exportToExcel<T>(
  data: T[],
  config: ExcelExportConfig<T>
): void {
  try {
    // Преобразуем данные если нужно
    let exportData = data;
    if (config.transformData) {
      exportData = config.transformData(data);
    }

    // Создаем рабочую книгу
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    
    // Добавляем лист
    const sheetName = config.sheetName || 'Данные';
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Генерируем файл
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Сохраняем файл
    saveAs(blob, `${config.fileName}.xlsx`);
  } catch (error) {
    console.error('Ошибка при экспорте в Excel:', error);
    throw new Error(`Ошибка при экспорте в Excel: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Создает диалог выбора файла для загрузки Excel
 * @param accept - типы файлов для выбора
 * @returns Promise с выбранным файлом или null
 */
export function selectExcelFile(accept: string = '.xlsx,.xls'): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      document.body.removeChild(input);
      resolve(file);
    };
    
    input.oncancel = () => {
      document.body.removeChild(input);
      resolve(null);
    };
    
    document.body.appendChild(input);
    input.click();
  });
}

/**
 * Валидирует Excel файл по расширению
 * @param file - файл для проверки
 * @returns true если файл подходит
 */
export function isValidExcelFile(file: File): boolean {
  const validExtensions = ['.xlsx', '.xls'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some(ext => fileName.endsWith(ext));
}
