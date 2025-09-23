# Интеграция с Excel для DataGrid

## Обзор

Добавлена полная поддержка работы с Excel файлами для компонента DataGrid:
- **Загрузка данных из Excel** - импорт данных из .xlsx/.xls файлов
- **Выгрузка данных в Excel** - экспорт данных таблицы в Excel файл

## Компоненты

### 1. Утилиты Excel (`src/utils/excelUtils.ts`)

Основные функции для работы с Excel:

- `readExcelFile<T>(file, config)` - чтение Excel файла
- `exportToExcel<T>(data, config)` - экспорт данных в Excel
- `selectExcelFile(accept)` - диалог выбора файла
- `isValidExcelFile(file)` - валидация файла

### 2. Хук useExcelData (`src/hooks/useExcelData.ts`)

Удобный хук для управления Excel данными:

```typescript
const {
  data,
  isLoading,
  error,
  handleUploadExcel,
  handleDownloadExcel,
  updateData,
  clearError,
} = useExcelData(initialData, importConfig, exportConfig);
```

### 3. Обновленный CommandBar

Кнопки "Загрузить из Excel" и "Выгрузить в Excel" теперь полностью функциональны.

## Использование

### Базовое использование

```typescript
import { useExcelData } from '../hooks/useExcelData';
import { ExcelImportConfig, ExcelExportConfig } from '../utils/excelUtils';

// Конфигурация импорта
const importConfig: ExcelImportConfig<YourDataType> = {
  validateData: (data) => {
    // Валидация данных
    const errors = [];
    data.forEach((item, index) => {
      if (!item.requiredField) {
        errors.push(`Строка ${index + 2}: отсутствует обязательное поле`);
      }
    });
    return { isValid: errors.length === 0, errors };
  },
  transformData: (data) => {
    // Преобразование данных
    return data.map(item => ({
      ...item,
      numericField: Number(item.numericField) || 0,
    }));
  }
};

// Конфигурация экспорта
const exportConfig: ExcelExportConfig<YourDataType> = {
  fileName: 'my-data',
  sheetName: 'Данные',
  transformData: (data) => {
    return data.map(item => ({
      'ID': item.id,
      'Название': item.name,
      'Сумма': item.amount,
    }));
  }
};

// Использование в компоненте
const MyComponent = () => {
  const {
    data,
    isLoading,
    error,
    handleUploadExcel,
    handleDownloadExcel,
  } = useExcelData(initialData, importConfig, exportConfig);

  return (
    <DataGrid
      data={data}
      columns={columns}
      onUploadExcel={handleUploadExcel}
      onDownloadExcel={handleDownloadExcel}
      // ... другие пропсы
    />
  );
};
```

### Расширенная конфигурация

```typescript
const advancedImportConfig: ExcelImportConfig<Client> = {
  // Указать конкретный лист
  sheetName: 'Клиенты',
  
  // Начать чтение с определенной строки (пропустить заголовки)
  startRow: 2,
  
  // Валидация данных
  validateData: (data) => {
    const errors = [];
    data.forEach((item, index) => {
      if (!item.id) errors.push(`Строка ${index + 2}: отсутствует ID`);
      if (!item.name) errors.push(`Строка ${index + 2}: отсутствует название`);
      if (!/^\d{10}$/.test(item.inn)) {
        errors.push(`Строка ${index + 2}: неверный формат ИНН`);
      }
    });
    return { isValid: errors.length === 0, errors };
  },
  
  // Преобразование данных
  transformData: (data) => {
    return data.map(item => ({
      id: String(item.id),
      name: String(item.name).trim(),
      inn: String(item.inn),
      amount: Number(item.amount) || 0,
      date: new Date(item.date),
    }));
  }
};
```

## Формат Excel файла

### Для импорта

Excel файл должен содержать:
1. **Заголовки в первой строке** - названия колонок
2. **Данные начиная со второй строки**
3. **Поддерживаемые форматы**: .xlsx, .xls

Пример структуры:
```
ID  | Название        | ИНН         | Сумма
1   | Компания А      | 1234567890  | 100000
2   | Компания Б      | 0987654321  | 200000
```

### Для экспорта

Данные автоматически экспортируются с:
- Заголовками колонок
- Правильным форматированием
- Поддержкой кириллицы

## Обработка ошибок

Система включает полную обработку ошибок:

1. **Валидация файла** - проверка расширения
2. **Валидация данных** - проверка содержимого
3. **Обработка ошибок чтения** - проблемы с файлом
4. **Отображение ошибок** - пользовательские уведомления

## Зависимости

Добавлены следующие пакеты:
- `xlsx` - для работы с Excel файлами
- `file-saver` - для сохранения файлов
- `@types/file-saver` - типы TypeScript

## Примеры использования

См. обновленную страницу `ClientsPage.tsx` для полного примера интеграции.

## Ограничения

1. Максимальный размер файла ограничен браузером
2. Поддерживаются только .xlsx и .xls форматы
3. Валидация данных должна быть настроена вручную
4. Требуется настройка преобразования данных для каждого типа
