import { DataGrid } from './DataGrid';
import type { ColumnDefinition } from './types';

// Тестовые данные
interface TestItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

const testData: TestItem[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "Рога и копыта"',
    position: 'Генеральный директор',
    status: 'Активный',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria.sidorova@example.com',
    phone: '+7 (999) 234-56-78',
    company: 'ИП Сидорова М.А.',
    position: 'Индивидуальный предприниматель',
    status: 'На рассмотрении',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    email: 'alexey.kozlov@example.com',
    phone: '+7 (999) 345-67-89',
    company: 'АО "Большая компания с очень длинным названием"',
    position: 'Финансовый директор',
    status: 'Заблокирован',
    createdAt: '2024-01-17'
  }
];

// Определение колонок
const columns: ColumnDefinition<TestItem>[] = [
  {
    key: 'name',
    title: 'Имя',
    sortable: true,
    width: 'w-48'
  },
  {
    key: 'email',
    title: 'Email',
    sortable: true,
    width: 'w-64'
  },
  {
    key: 'phone',
    title: 'Телефон',
    sortable: false,
    width: 'w-40'
  },
  {
    key: 'company',
    title: 'Компания',
    sortable: true,
    width: 'w-80'
  },
  {
    key: 'position',
    title: 'Должность',
    sortable: true,
    width: 'w-48'
  },
  {
    key: 'status',
    title: 'Статус',
    sortable: true,
    width: 'w-32',
    render: (value: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Активный' ? 'bg-green-100 text-green-800' :
        value === 'На рассмотрении' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'createdAt',
    title: 'Дата создания',
    sortable: true,
    width: 'w-32'
  }
];

export function DataGridTest() {
  const handleAdd = () => {
    // TODO: Implement add functionality
  };

  const handleEdit = (_item: TestItem) => {
    // TODO: Implement edit functionality
  };

  const handleDelete = (_id: string | number) => {
    // TODO: Implement delete functionality
  };

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Тест DataGrid с фиксированной колонкой действий</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600">
          Этот тест демонстрирует DataGrid с фиксированной колонкой действий. 
          Попробуйте изменить размер окна браузера - колонка "Действия" всегда остается видимой справа, 
          а основное содержимое таблицы прокручивается горизонтально при необходимости.
        </p>
      </div>

      <DataGrid
        data={testData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
        pageSize={10}
        className="max-w-full"
      />
    </div>
  );
}