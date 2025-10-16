# Анализ сущности Client (Клиент)

## Структура TypeScript интерфейса

### Основной интерфейс Client

```typescript
interface Client {
  id: string;
  opf: string; // ОПФ (организационно-правовая форма)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  version: EntityVersion; // управление версиями
  requisites: ClientRequisites; // реквизиты
  documents: ClientDocument[]; // документы
  attachments: ClientAttachment[]; // вложения
  qualifications: ClientQualification[]; // квалификации
  leasingObjects: LeasingObject[]; // предметы лизинга
}
```

### Система управления версиями (EntityVersion)

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

**Жизненный цикл версий:**
- **draft (черновик)**: `startDate` и `endDate` пустые
- **active (действующая)**: `startDate` заполнена, `endDate` пустая
- **archived (архивная)**: обе даты заполнены

### Реквизиты клиента (ClientRequisites)

```typescript
interface ClientRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp?: string;
  ogrn?: string;
  address: string;
  phone?: string;
  email?: string;
  // Дополнительные поля в зависимости от ОПФ
  [key: string]: any;
}
```

**Особенности:**
- Гибкая структура с дополнительными полями для разных ОПФ
- Для ООО: `directorName`, `foundationDate`
- Для АО: аналогичные поля
- Для ИП: `ogrnip`, `registrationDate`

## Система управления документами

### Интерфейс ClientDocument

```typescript
interface ClientDocument {
  id: string;
  type: 'registration' | 'license' | 'permit' | 'passport' | 'inn_certificate' | 
        'bank_statement' | 'financial_report' | 'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Динамические поля в зависимости от типа
  issueDate?: string;
  expiryDate?: string;
  attachments?: ClientAttachment[]; // Вложения к документу
}
```

**Типы документов и их поля:**
- **registration**: `registrationNumber`, `issueDate`, `issuingAuthority`, `registrationAddress`
- **license**: `licenseNumber`, `issueDate`, `expiryDate`, `issuingAuthority`, `scope`, `licenseType`
- **permit**: `permitNumber`, `issueDate`, `expiryDate`, `purpose`, `issuingAuthority`, `territory`
- **passport**: `passportSeries`, `passportNumber`, `issueDate`, `issuingAuthority`, `issuingCode`, `birthDate`, `birthPlace`
- **bank_statement**: `bankName`, `accountNumber`, `statementPeriod`, `issueDate`
- **financial_report**: `reportType`, `reportingPeriod`, `issueDate`, `auditorName`
- **contract**: `contractNumber`, `contractDate`, `contractSubject`, `contractAmount`, `counterparty`

### Система вложений (ClientAttachment)

```typescript
interface ClientAttachment {
  id: string;
  name: string;
  type: string; // MIME-тип файла
  size: number;
  url: string;
  previewUrl?: string; // URL превью для изображений и PDF
  canPreview: boolean; // Возможность предпросмотра
}
```

**Особенности:**
- Поддержка предпросмотра для PDF и изображений
- Автоматическое определение возможности предпросмотра по типу файла
- Генерация превью для поддерживаемых форматов

## Квалификации и предметы лизинга

### ClientQualification

```typescript
interface ClientQualification {
  id: string;
  leasingCompany: string; // Лизинговая компания
  accountTurnover: number; // оборот по счету
  revenue: number; // выручка
  hasLoss: boolean; // убыток/не убыток в отчетном периоде
  reportingPeriod: string;
}
```

### LeasingObject

```typescript
interface LeasingObject {
  id: string;
  name: string; // Наименование предмета лизинга
  identifiers: string[]; // идентификаторы (VIN, серийные номера и т.д.)
  contractPeriod: {
    from: string; // срок договора лизинга (с)
    to: string; // срок договора лизинга (по)
  };
  status: string; // статус
}
```

## Компонентная архитектура

### VersionComponent
- Навигация между версиями сущности
- Отображение статуса версии (черновик/действующая/архивная)
- Функции редактирования и публикации
- Адаптивный дизайн для мобильных устройств

### DocumentsSection
- Отображение списка документов клиента
- Интеграция с системой версий
- Модальные окна для добавления/редактирования документов
- Адаптивная сетка документов

### AttachmentsSection
- Отображение вложений с превью
- Поддержка различных типов файлов
- Функции просмотра и удаления
- Адаптивная сетка вложений

## Связи с другими сущностями

1. **Broker** - через систему сделок и комиссий
2. **LeasingCompany** - через квалификации клиента
3. **User** - через систему управления версиями
4. **Organization** - через корпоративные связи

## Паттерны использования

### Управление версиями
- Создание черновика при редактировании
- Публикация активной версии
- Архивирование предыдущих версий
- Навигация по истории изменений

### Документооборот
- Динамические поля документов по типам
- Связь документов с вложениями
- Валидация обязательных полей
- Система типизации документов

### Вложения
- Автоматическое определение типа файла
- Генерация превью для поддерживаемых форматов
- Оптимизация для мобильных устройств
- Система управления размерами файлов
--
-

# Анализ сущности Broker (Брокер)

## Структура TypeScript интерфейса

### Основной интерфейс Broker

```typescript
interface Broker {
  id: string;
  opf: string; // ОПФ (организационно-правовая форма)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  successRate: number; // процент успешных сделок
  averageDealSize: number; // средний размер сделки
  version: EntityVersion; // управление версиями
  requisites: BrokerRequisites; // реквизиты
  documents: BrokerDocument[]; // документы
  attachments: BrokerAttachment[]; // вложения
}
```

### Реквизиты брокера (BrokerRequisites)

```typescript
interface BrokerRequisites {
  fullName: string; // Полное наименование
  inn: string; // ИНН
  kpp: string; // КПП
  ogrn: string; // ОГРН
  address: string; // Адрес
  phone: string; // Телефон
  email: string; // Email
  directorName: string; // ФИО директора
  foundationDate: string; // Дата основания
  licenseNumber?: string; // Номер лицензии брокера
  licenseDate?: string; // Дата выдачи лицензии
  licenseExpiryDate?: string; // Дата окончания лицензии
  specialization?: string; // Специализация (авто, недвижимость, оборудование)
  experience?: number; // Опыт работы в годах
  rating?: number; // Рейтинг брокера (1-5)
}
```

**Специфические поля брокера:**
- **licenseNumber, licenseDate, licenseExpiryDate**: Лицензирование брокерской деятельности
- **specialization**: Область специализации (автомобильный лизинг, недвижимость, оборудование)
- **experience**: Опыт работы в годах
- **rating**: Рейтинг от 1 до 5 звезд
- **successRate**: Процент успешных сделок
- **averageDealSize**: Средний размер сделки

## Система управления документами брокера

### Интерфейс BrokerDocument

```typescript
interface BrokerDocument {
  id: string;
  type: 'broker_license' | 'charter' | 'registration' | 'bank_statement' | 
        'financial_report' | 'contract' | 'certificate' | 'other';
  title: string;
  fields: Record<string, any>; // Динамические поля в зависимости от типа
  issueDate?: string;
  expiryDate?: string;
  attachments?: BrokerAttachment[]; // Вложения к документу
}
```

**Специфические типы документов брокера:**
- **broker_license**: `number`, `issueDate`, `expiryDate`, `issuer`, `activityType`
- **charter**: `version`, `registrationDate`, `changesDate`, `registrationAuthority`
- **certificate**: `certificateNumber`, `standard`, `issueDate`, `expiryDate`, `issuingOrganization`

### Система вложений брокера (BrokerAttachment)

```typescript
interface BrokerAttachment {
  id: string;
  name: string;
  type: string; // MIME-тип файла
  size: number;
  uploadDate: string; // Дата загрузки
  url?: string;
  thumbnailUrl?: string; // URL миниатюры
}
```

**Отличия от Client:**
- Добавлено поле `uploadDate` для отслеживания времени загрузки
- Используется `thumbnailUrl` вместо `previewUrl`
- Нет поля `canPreview` - определяется автоматически по типу файла

## Система управления сотрудниками

### Интерфейс BrokerEmployee

```typescript
interface BrokerEmployee {
  id: string;
  fullName: string; // Полное имя
  login: string; // Логин
  role: EmployeeRole; // Роль
  status: EmployeeStatus; // Статус
  activeDealsCount: number; // Количество активных сделок
  actions?: React.ReactNode; // Действия
}
```

**Роли сотрудников:**
- **Брокер**: Основная роль для работы со сделками
- **Руководитель брокера**: Управленческая роль
- **Бизнес-администратор**: Административные функции
- **Технический администратор**: Техническое администрирование

**Статусы сотрудников:**
- **Активен**: Сотрудник активен и может работать
- **Ожидает активации**: Требует подтверждения администратора

## Компонентная архитектура брокера

### BrokerRequisitesCard
- Отображение и редактирование реквизитов брокера
- Специальные поля: лицензирование, специализация, рейтинг
- Форматирование рейтинга со звездами
- Форматирование опыта работы с правильными окончаниями

### BrokerEmployeeDataGrid
- Управление сотрудниками брокера
- Цветовое кодирование ролей и статусов
- Функции активации/отклонения сотрудников
- Статистика по активным сделкам сотрудников

### BrokerDocumentsSection
- Управление документами брокера
- Специфические типы документов (лицензии, сертификаты)
- Интеграция с системой версий

### BrokerAttachmentsSection
- Управление вложениями с миниатюрами
- Отслеживание даты загрузки файлов
- Поддержка различных форматов документов

## Метрики производительности

### Ключевые показатели
- **dealsCount**: Общее количество сделок
- **totalCommission**: Общая сумма комиссий
- **successRate**: Процент успешных сделок (94.5%, 91.2%, 96.8%)
- **averageDealSize**: Средний размер сделки

### Утилитарные функции
```typescript
getTotalDealsCount(): number // Общее количество сделок всех брокеров
getTotalCommission(): number // Общая сумма комиссий
getAverageSuccessRate(): number // Средний процент успеха
getBrokersByOpf(opf: string): Broker[] // Фильтрация по ОПФ
```

## Связи с другими сущностями

1. **Client** - через систему сделок и комиссий
2. **LeasingCompany** - через партнерские отношения
3. **User** - через систему сотрудников и управления версиями
4. **Organization** - через корпоративную структуру

## Паттерны использования

### Управление сотрудниками
- Система ролей с различными уровнями доступа
- Процесс активации новых сотрудников
- Отслеживание активных сделок по сотрудникам
- Цветовое кодирование статусов и ролей

### Лицензирование и сертификация
- Отслеживание сроков действия лицензий
- Управление сертификатами соответствия
- Специализация по типам лизинга
- Система рейтингов и оценок

### Метрики и аналитика
- Отслеживание процента успешных сделок
- Расчет среднего размера сделки
- Анализ производительности по сотрудникам
- Сравнительная аналитика между брокерами---


# Анализ сущности LeasingCompany (Лизинговая компания)

## Структура TypeScript интерфейса

### Основной интерфейс LeasingCompany

```typescript
interface LeasingCompany {
  id: string;
  opf: string; // ОПФ (организационно-правовая форма)
  fullName: string; // Полное наименование
  inn: string; // ИНН
  dealsCount: number; // количество сделок
  totalCommission: number; // итого вознаграждение
  version: EntityVersion; // управление версиями
  requisites: LeasingCompanyRequisites; // реквизиты
  documents: LeasingCompanyDocument[]; // документы
  attachments: LeasingCompanyAttachment[]; // вложения
}
```

### Реквизиты лизинговой компании (LeasingCompanyRequisites)

```typescript
interface LeasingCompanyRequisites {
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

**Особенности лизинговых компаний:**
- Упрощенная структура реквизитов по сравнению с брокерами
- Отсутствуют поля специализации, рейтинга и опыта
- Фокус на лицензировании лизинговой деятельности
- Стандартные корпоративные реквизиты

## Система управления документами

### Интерфейс LeasingCompanyDocument

```typescript
interface LeasingCompanyDocument {
  id: string;
  type: 'license' | 'charter' | 'registration' | 'bank_statement' | 
        'financial_report' | 'contract' | 'other';
  title: string;
  fields: Record<string, any>; // Динамические поля в зависимости от типа
  issueDate?: string;
  expiryDate?: string;
  attachments?: LeasingCompanyAttachment[]; // Вложения к документу
}
```

**Типы документов лизинговых компаний:**
- **license**: `number`, `issueDate`, `expiryDate`, `issuer` - лицензия на лизинговую деятельность
- **charter**: `version`, `registrationDate`, `changesDate` - устав общества
- **financial_report**: `auditor`, `reportDate`, `opinion` - аудиторские заключения
- **bank_statement**: `bank`, `accountNumber`, `balance`, `currency` - банковские справки

### Система вложений (LeasingCompanyAttachment)

```typescript
interface LeasingCompanyAttachment {
  id: string;
  name: string;
  type: string; // MIME-тип файла
  size: number;
  uploadDate: string; // Дата загрузки
  url?: string;
  thumbnailUrl?: string; // URL миниатюры
}
```

**Идентична системе брокеров:**
- Отслеживание даты загрузки
- Поддержка миниатюр
- Стандартные метаданные файлов

## Организационно-правовые формы

### Поддерживаемые ОПФ
- **АО** - Акционерное общество
- **ООО** - Общество с ограниченной ответственностью  
- **ПАО** - Публичное акционерное общество

### Примеры из данных
```typescript
// АО "Альфа-Лизинг" - 45 сделок, 1,250,000 руб. комиссий
// ООО "Бета-Лизинг" - 32 сделки, 890,000 руб. комиссий
// ПАО "Гамма-Лизинг" - 78 сделок, 2,100,000 руб. комиссий
```

## Лицензирование и регулирование

### Система лицензий
- **Номер лицензии**: Формат "ЛЗ-XXXXXX"
- **Орган выдачи**: Центральный банк Российской Федерации
- **Срок действия**: Обычно 10-20 лет
- **Отслеживание сроков**: Автоматическое определение истекающих лицензий

### Примеры лицензий
```typescript
{
  licenseNumber: 'ЛЗ-001234',
  licenseDate: '2015-04-01',
  licenseExpiryDate: '2030-04-01',
  issuer: 'Центральный банк Российской Федерации'
}
```

## Компонентная архитектура

### LeasingCompanyRequisitesCard
- Упрощенная форма реквизитов без специальных полей
- Фокус на корпоративной информации и лицензировании
- Стандартное форматирование дат
- Интеграция с системой версий

### LeasingCompanyDocumentsSection
- Управление документами с фокусом на лицензии
- Специальные типы документов для лизинговых компаний
- Отслеживание сроков действия лицензий

### LeasingCompanyAttachmentsSection
- Стандартная система вложений
- Поддержка корпоративных документов
- Интеграция с документооборотом

## Утилитарные функции

### Функции доступа к данным
```typescript
getAllLeasingCompanies(): LeasingCompany[] // Все лизинговые компании
getLeasingCompanyById(id: string): LeasingCompany | undefined // По ID
getLeasingCompanyWithVersion(id: string, versionId: string): LeasingCompany | undefined // С версией
getLeasingCompaniesByOpf(opf: string): LeasingCompany[] // Фильтрация по ОПФ
```

### Агрегатные функции
```typescript
getTotalDealsCount(): number // Общее количество сделок
getTotalCommission(): number // Общая сумма комиссий
createEmptyLeasingCompany(): LeasingCompany // Создание новой компании
```

## Связи с другими сущностями

1. **Client** - через квалификации клиентов и лизинговые объекты
2. **Broker** - через партнерские отношения и совместные сделки
3. **User** - через систему управления версиями
4. **LeasingObject** - через предметы лизинга и договоры

## Паттерны использования

### Корпоративное управление
- Стандартизированные корпоративные реквизиты
- Отслеживание изменений в уставах
- Управление банковскими реквизитами
- Контроль финансовой отчетности

### Лицензионное соответствие
- Мониторинг сроков действия лицензий
- Отслеживание изменений в лицензионных требованиях
- Управление документами соответствия
- Интеграция с регуляторными требованиями

### Деловые отношения
- Отслеживание объемов сделок
- Расчет комиссионных доходов
- Анализ эффективности партнерств
- Управление договорными отношениями

## Отличия от других сущностей

### От Client
- Более простая структура реквизитов
- Фокус на лицензировании, а не на квалификациях
- Отсутствие предметов лизинга (они связаны через отношения)

### От Broker
- Отсутствие системы сотрудников
- Нет метрик производительности (successRate, averageDealSize)
- Упрощенная система документов
- Фокус на корпоративном управлении, а не на операционной деятельности