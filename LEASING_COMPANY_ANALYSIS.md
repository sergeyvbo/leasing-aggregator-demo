# Анализ сущности LeasingCompany

## Структура TypeScript интерфейса

### Основной интерфейс LeasingCompany

```typescript
export interface LeasingCompany {
  id: string;
  opf: string; // ОПФ (организационно-правовая форма)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  version: EntityVersion; // Управление версиями
  requisites: LeasingCompanyRequisites; // Реквизиты компании
  documents: LeasingCompanyDocument[]; // Документы
  attachments: LeasingCompanyAttachment[]; // Вложения
}
```

### Интерфейс реквизитов LeasingCompanyRequisites

```typescript
export interface LeasingCompanyRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp: string; // КПП
  ogrn: string; // ОГРН
  address: string; // Адрес
  phone: string; // Телефон
  email: string; // Email
  directorName: string; // ФИО директора
  foundationDate: string; // Дата основания
  licenseNumber?: string; // Номер лицензии
  licenseDate?: string; // Дата выдачи лицензии
  licenseExpiryDate?: string; // Дата окончания лицензии
}
```

### Интерфейс документов LeasingCompanyDocument

```typescript
export interface LeasingCompanyDocument {
  id: string;
  type: 'license' | 'charter' | 'registration' | 'bank_statement' | 'financial_report' | 'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Динамические поля в зависимости от типа документа
  issueDate?: string;
  expiryDate?: string;
  attachments?: LeasingCompanyAttachment[]; // Вложения, специфичные для документа
}
```

### Интерфейс вложений LeasingCompanyAttachment

```typescript
export interface LeasingCompanyAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url?: string;
  thumbnailUrl?: string;
}
```

## Специфичные поля лицензирования и регулирования

### Лицензионные поля в реквизитах:
- `licenseNumber` - Номер лицензии на лизинговую деятельность
- `licenseDate` - Дата выдачи лицензии
- `licenseExpiryDate` - Дата окончания действия лицензии

### Типы регулятивных документов:
- `license` - Лицензия на осуществление лизинговой деятельности
- `charter` - Устав общества
- `registration` - Регистрационные документы
- `bank_statement` - Справки о состоянии расчетного счета
- `financial_report` - Финансовые отчеты и аудиторские заключения
- `contract` - Договоры и соглашения
- `other` - Прочие документы

### Динамические поля документов:
Каждый тип документа имеет специфичные поля в объекте `fields`:

**Лицензия (`license`):**
```typescript
{
  number: string; // Номер лицензии
  issueDate: string; // Дата выдачи
  expiryDate: string; // Дата окончания
  issuer: string; // Орган, выдавший лицензию
}
```

**Финансовый отчет (`financial_report`):**
```typescript
{
  auditor: string; // Аудиторская компания
  reportDate: string; // Дата отчета
  opinion: string; // Аудиторское заключение
}
```

**Справка банка (`bank_statement`):**
```typescript
{
  bank: string; // Наименование банка
  accountNumber: string; // Номер расчетного счета
  balance: number; // Остаток на счете
  currency: string; // Валюта
}
```

## Связи со сделками и партнерствами с брокерами

### Связь со сделками:
- Поле `dealsCount` - количество заключенных сделок
- Поле `totalCommission` - общая сумма комиссионных вознаграждений
- В отчетах система отслеживает сделки по лизинговым компаниям:
  ```typescript
  {
    dealId: string;
    clientName: string;
    leasingCompany: string; // Название лизинговой компании
    objectType: string; // Тип объекта лизинга
    dealAmount: number; // Сумма сделки
    commission: number; // Комиссия
  }
  ```

### Партнерства с брокерами:
Система управляет связями через `ClientBrokerBindingRule`:
```typescript
{
  id: string;
  leasingCompanyId: string; // ID лизинговой компании
  leasingCompanyName: string; // Название лизинговой компании
  clientInn: string; // ИНН клиента
  brokerId: string; // ID брокера
  brokerName: string; // Название брокера
  restriction: 'allow' | 'deny'; // Разрешение или запрет сотрудничества
}
```

### Связь с объектами лизинга:
Лизинговые компании связаны с типами объектов лизинга через:
```typescript
{
  id: string;
  leasingCompanyId: string; // ID лизинговой компании
  leasingCompanyName: string; // Название компании
  objectTypeId: string; // ID типа объекта
  objectTypeName: string; // Название типа объекта
}
```

### Связь с шаблонами:
Лизинговые компании используют шаблоны для различных типов объектов:
```typescript
{
  id: string;
  leasingCompanyId: string; // ID лизинговой компании
  leasingCompanyName: string; // Название компании
  leasingObjectType: string; // Тип объекта лизинга
  templateNames: string; // Названия шаблонов
}
```

## Паттерны управления документами

### 1. Управление версиями (EntityVersion)
Все лизинговые компании используют систему версионирования:
- `draft` - черновик
- `active` - активная версия
- `archived` - архивная версия

### 2. Двухуровневая система документов
- **Документы (`documents`)** - структурированные документы с типизированными полями
- **Вложения (`attachments`)** - файлы-сканы документов

### 3. Компонентная архитектура документооборота

#### LeasingCompanyDocumentsSection
- Основной компонент для управления документами
- Интеграция с VersionComponent для переключения версий
- Поддержка добавления, редактирования и удаления документов
- Адаптивный дизайн для мобильных устройств

#### LeasingCompanyDocumentCard
- Карточка отдельного документа
- Отображение типа, названия и ключевых полей
- Действия редактирования и удаления

#### LeasingCompanyDocumentModal
- Модальное окно для создания/редактирования документов
- Динамические поля в зависимости от типа документа

#### LeasingCompanyAttachmentsSection
- Управление файловыми вложениями
- Предварительный просмотр файлов
- Загрузка и удаление файлов

### 4. Общие паттерны с другими сущностями
- Использование EntityVersion для всех сущностей
- Единообразная структура attachments
- Общий подход к динамическим полям в documents
- Переиспользование компонентов (VersionComponent, EmptyState)

### 5. Утилитарные функции
```typescript
// Получение всех лизинговых компаний
getAllLeasingCompanies(): LeasingCompany[]

// Получение по ID
getLeasingCompanyById(id: string): LeasingCompany | undefined

// Получение конкретной версии
getLeasingCompanyWithVersion(id: string, versionId: string): LeasingCompany | undefined

// Фильтрация по ОПФ
getLeasingCompaniesByOpf(opf: string): LeasingCompany[]

// Создание пустой компании
createEmptyLeasingCompany(): LeasingCompany
```

## Заключение

Сущность LeasingCompany представляет собой комплексную систему управления лизинговыми компаниями с:
- Полной поддержкой версионирования
- Гибкой системой документооборота с типизированными документами
- Интеграцией с брокерами через правила привязки клиентов
- Связями со сделками и объектами лизинга
- Специализированными полями для лицензирования и регулирования
- Переиспользуемыми компонентами для управления документами и вложениями