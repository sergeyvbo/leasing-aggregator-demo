# Анализ общих паттернов системы

## Паттерн EntityVersion - Управление версиями

### Единая система версионирования

```typescript
interface EntityVersion {
  id: string;
  number: number;
  startDate?: string; // начало периода действия (пустое для черновика)
  endDate?: string; // окончание периода действия (пустое для действующей и черновика)
  status: 'draft' | 'active' | 'archived'; // черновик | действующая | архивная
  previousVersionId?: string;
  nextVersionId?: string;
}
```

### Жизненный цикл версий

**1. Draft (Черновик)**
- `startDate` и `endDate` пустые
- Статус: 'draft'
- Возможность редактирования
- Не влияет на основные данные

**2. Active (Действующая)**
- `startDate` заполнена (дата активации)
- `endDate` пустая
- Статус: 'active'
- Основная рабочая версия

**3. Archived (Архивная)**
- Обе даты заполнены
- Статус: 'archived'
- Только для просмотра
- Историческая версия

### Навигация между версиями

```typescript
// Связи между версиями
previousVersionId?: string; // Ссылка на предыдущую версию
nextVersionId?: string; // Ссылка на следующую версию

// Компонент навигации
<VersionComponent
  version={version}
  onVersionChange={onVersionChange}
  onEditStart={handleEditStart}
  onEditEnd={handleEditEnd}
/>
```

---

## Паттерн Attachment - Управление вложениями

### Единая структура вложений

```typescript
// Базовая структура (Client)
interface ClientAttachment {
  id: string;
  name: string;
  type: string; // MIME-тип
  size: number;
  url: string;
  previewUrl?: string; // URL превью
  canPreview: boolean; // Возможность предпросмотра
}

// Расширенная структура (Broker, LeasingCompany, Organization)
interface BrokerAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string; // Дата загрузки
  url?: string;
  thumbnailUrl?: string; // URL миниатюры
}
```

### Типы поддерживаемых файлов

**Документы:**
- PDF: `application/pdf` - поддержка превью
- Word: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Excel: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

**Изображения:**
- JPEG: `image/jpeg` - поддержка превью
- PNG: `image/png` - поддержка превью

### Компоненты управления вложениями

```typescript
// Секция вложений
<AttachmentsSection
  attachments={attachments}
  onAddAttachment={handleAddAttachment}
  onDeleteAttachment={handleDeleteAttachment}
/>

// Превью вложения
<AttachmentPreview
  attachment={attachment}
  onView={handleViewAttachment}
  onDelete={handleDeleteAttachment}
/>
```

---

## Паттерн Document - Управление документами

### Гибкая система документов

```typescript
interface ClientDocument {
  id: string;
  type: 'registration' | 'license' | 'permit' | 'passport' | 
        'inn_certificate' | 'bank_statement' | 'financial_report' | 
        'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Динамические поля
  issueDate?: string;
  expiryDate?: string;
  attachments?: ClientAttachment[]; // Связанные вложения
}
```

### Конфигурация типов документов

```typescript
// Поля для каждого типа документа
export const documentTypeFields: Record<string, string[]> = {
  registration: ['registrationNumber', 'issueDate', 'issuingAuthority', 'registrationAddress'],
  license: ['licenseNumber', 'issueDate', 'expiryDate', 'issuingAuthority', 'scope', 'licenseType'],
  passport: ['passportSeries', 'passportNumber', 'issueDate', 'issuingAuthority', 'issuingCode'],
  // ... другие типы
};

// Локализация полей
export const documentFieldLabels: Record<string, string> = {
  registrationNumber: 'Регистрационный номер',
  licenseNumber: 'Номер лицензии',
  issueDate: 'Дата выдачи',
  // ... другие поля
};
```

### Компоненты управления документами

```typescript
// Секция документов
<DocumentsSection
  documents={documents}
  version={version}
  onVersionChange={onVersionChange}
  onAddDocument={handleAddDocument}
  onEditDocument={handleEditDocument}
  onDeleteDocument={handleDeleteDocument}
/>

// Карточка документа
<DocumentCard
  document={document}
  onEdit={handleEditDocument}
  onDelete={handleDeleteDocument}
/>
```

---

## Паттерн DataGrid - Универсальная таблица

### Типизированная система колонок

```typescript
interface ColumnDefinition<T> {
  key: keyof T; // Ключ из объекта данных
  title: string; // Заголовок колонки
  sortable?: boolean; // Возможность сортировки
  render?: (value: any, item: T) => ReactNode; // Кастомный рендер
  width?: string; // CSS класс ширины
}
```

### Функциональность DataGrid

**Основные возможности:**
- Сортировка по колонкам
- Поиск по всем полям
- Пагинация
- Суммарная строка
- Действия над строками (редактирование, удаление)
- Импорт/экспорт Excel

**Пример использования:**
```typescript
<DataGrid
  data={clients}
  columns={clientColumns}
  onAdd={handleAddClient}
  onEdit={handleEditClient}
  onDelete={handleDeleteClient}
  searchable={true}
  sortable={true}
  pageSize={10}
  summary={summaryConfig}
/>
```

### Конфигурация суммарной строки

```typescript
interface SummaryConfig<T> {
  calculate: (data: T[]) => Record<string, any>; // Расчет данных
  render: (summaryData: Record<string, any>) => React.ReactNode; // Рендер
}

// Пример для клиентов
const summaryConfig: SummaryConfig<Client> = {
  calculate: (data: Client[]) => ({
    totalClients: data.length,
    totalDeals: data.reduce((sum, client) => sum + client.dealsCount, 0),
    totalCommission: data.reduce((sum, client) => sum + client.totalCommission, 0)
  }),
  render: (summaryData) => (
    <div className="summary-row">
      <span>Всего клиентов: {summaryData.totalClients}</span>
      <span>Всего сделок: {summaryData.totalDeals}</span>
      <span>Общая комиссия: {summaryData.totalCommission.toLocaleString()} ₽</span>
    </div>
  )
};
```

---

## Паттерн CRUD Operations - Операции с данными

### Стандартные функции доступа

```typescript
// Получение всех записей
export const getAllClients = (): Client[] => mockClients;

// Получение по ID
export const getClientById = (id: string): Client | undefined => 
  mockClients.find(client => client.id === id);

// Получение с версией
export const getClientWithVersion = (clientId: string, versionId?: string): Client | undefined => {
  if (versionId) return clientVersions[versionId];
  return getClientById(clientId);
};

// Создание новой записи
export const createEmptyClient = (): Client => ({
  id: `client-new-${Date.now()}`,
  // ... остальные поля
});
```

### Утилитарные функции

```typescript
// Фильтрация по ОПФ
export const getClientsByOpf = (opf: string): Client[] => 
  mockClients.filter(client => client.opf === opf);

// Агрегатные функции
export const getTotalDealsCount = (): number => 
  mockClients.reduce((total, client) => total + client.dealsCount, 0);

export const getTotalCommission = (): number => 
  mockClients.reduce((total, client) => total + client.totalCommission, 0);
```

---

## Паттерн Responsive Design - Адаптивный дизайн

### Система брейкпоинтов

```css
/* Tailwind CSS брейкпоинты */
sm: 640px   /* Мобильные устройства */
md: 768px   /* Планшеты */
lg: 1024px  /* Десктоп */
xl: 1280px  /* Большие экраны */
```

### Адаптивные компоненты

```typescript
// Адаптивная сетка
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

// Адаптивные отступы
<div className="px-4 md:px-6 py-4 md:py-6">

// Адаптивные кнопки
<button className="w-full sm:w-auto min-h-[44px] md:min-h-[auto] touch-manipulation">

// Адаптивный текст
<h3 className="text-base md:text-lg font-semibold">
```

### Мобильная оптимизация

**Принципы:**
- Минимальная высота кнопок 44px для touch-устройств
- Класс `touch-manipulation` для улучшения отзывчивости
- Адаптивные сетки с изменением количества колонок
- Скрытие/показ элементов на разных экранах

---

## Паттерн State Management - Управление состоянием

### Локальное состояние компонентов

```typescript
// Состояние редактирования
const [isEditing, setIsEditing] = useState(false);
const [editingData, setEditingData] = useState(initialData);

// Состояние модальных окон
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | undefined>();

// Состояние версий
const [currentVersion, setCurrentVersion] = useState(version);
```

### Обработчики событий

```typescript
// Стандартные обработчики
const handleEditStart = () => {
  setIsEditing(true);
  setEditingData({ ...currentData });
};

const handleEditEnd = () => {
  setIsEditing(false);
  // Сохранение данных
};

const handleVersionChange = (versionId: string) => {
  const newVersion = getVersionById(versionId);
  setCurrentVersion(newVersion);
};
```

---

## Паттерн Error Handling - Обработка ошибок

### Состояния компонентов

```typescript
// Состояния загрузки и ошибок
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Обработка асинхронных операций
const handleAsyncOperation = async () => {
  try {
    setLoading(true);
    setError(null);
    await performOperation();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Компоненты состояний

```typescript
// Состояние загрузки
<LoadingState message="Загрузка данных..." size="md" />

// Пустое состояние
<EmptyState
  icon={<DocumentIcon />}
  title="Нет документов"
  description="У данного клиента пока нет загруженных документов"
/>
```

---

## Общие принципы архитектуры

### 1. Единообразие интерфейсов
- Все сущности используют одинаковые паттерны версионирования
- Стандартизированные компоненты для общих операций
- Единая система типизации TypeScript

### 2. Переиспользование компонентов
- VersionComponent для всех сущностей
- DataGrid для всех табличных данных
- EmptyState и LoadingState для состояний

### 3. Адаптивность
- Мобильно-ориентированный дизайн
- Прогрессивное улучшение для больших экранов
- Touch-friendly интерфейсы

### 4. Типобезопасность
- Строгая типизация всех интерфейсов
- Генерики для переиспользуемых компонентов
- Валидация на уровне типов

### 5. Масштабируемость
- Модульная архитектура компонентов
- Конфигурируемые системы (документы, роли)
- Расширяемые паттерны данных