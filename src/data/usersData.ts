import type { User, UserAttachment, UserVersion } from '../types/users';
import { ROLE_IDS } from '../types/roles';

// Mock user attachments
const mockAttachments: UserAttachment[] = [
  {
    id: 'att_1',
    name: 'passport_scan.pdf',
    type: 'application/pdf',
    size: 1024000,
    url: '#',
    canPreview: false
  },
  {
    id: 'att_2',
    name: 'employment_contract.pdf',
    type: 'application/pdf',
    size: 2048000,
    url: '#',
    canPreview: false
  },
  {
    id: 'att_3',
    name: 'photo.jpg',
    type: 'image/jpeg',
    size: 512000,
    url: '#',
    canPreview: true
  }
];

// Mock user versions
const mockVersions: UserVersion[] = [
  {
    id: 'v1',
    number: 1,
    status: 'active',
    startDate: '2024-01-15',
    endDate: undefined,
    previousVersionId: undefined,
    nextVersionId: 'v2'
  },
  {
    id: 'v2',
    number: 2,
    status: 'draft',
    startDate: undefined,
    endDate: undefined,
    previousVersionId: 'v1',
    nextVersionId: undefined
  }
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'user_1',
    fullName: 'Иванов Иван Иванович',
    login: 'i.ivanov',
    role: ROLE_IDS.TECH_ADMIN,
    version: mockVersions[0],
    attachments: mockAttachments,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user_2',
    fullName: 'Петров Петр Петрович',
    login: 'p.petrov',
    role: ROLE_IDS.BUSINESS_ADMIN,
    version: mockVersions[0],
    attachments: [mockAttachments[0]],
    createdAt: '2024-01-16T11:30:00Z',
    updatedAt: '2024-01-16T11:30:00Z'
  },
  {
    id: 'user_3',
    fullName: 'Сидорова Анна Владимировна',
    login: 'a.sidorova',
    role: ROLE_IDS.BROKER_MANAGER,
    version: mockVersions[0],
    attachments: [mockAttachments[1], mockAttachments[2]],
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  },
  {
    id: 'user_4',
    fullName: 'Козлов Алексей Сергеевич',
    login: 'a.kozlov',
    role: ROLE_IDS.BROKER,
    version: mockVersions[0],
    attachments: [],
    createdAt: '2024-01-18T14:20:00Z',
    updatedAt: '2024-01-18T14:20:00Z'
  },
  {
    id: 'user_5',
    fullName: 'Морозова Елена Дмитриевна',
    login: 'e.morozova',
    role: ROLE_IDS.BROKER,
    version: mockVersions[0],
    attachments: [mockAttachments[2]],
    createdAt: '2024-01-19T16:45:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: 'user_6',
    fullName: 'Волков Дмитрий Александрович',
    login: 'd.volkov',
    role: ROLE_IDS.BUSINESS_ADMIN,
    version: mockVersions[1],
    attachments: mockAttachments,
    createdAt: '2024-01-20T08:30:00Z',
    updatedAt: '2024-01-20T08:30:00Z'
  },
  {
    id: 'user_7',
    fullName: 'Новикова Ольга Игоревна',
    login: 'o.novikova',
    role: ROLE_IDS.BROKER_MANAGER,
    version: mockVersions[0],
    attachments: [mockAttachments[0], mockAttachments[1]],
    createdAt: '2024-01-21T12:10:00Z',
    updatedAt: '2024-01-21T12:10:00Z'
  },
  {
    id: 'user_8',
    fullName: 'Соколов Михаил Викторович',
    login: 'm.sokolov',
    role: ROLE_IDS.TECH_ADMIN,
    version: mockVersions[0],
    attachments: [],
    createdAt: '2024-01-22T15:25:00Z',
    updatedAt: '2024-01-22T15:25:00Z'
  }
];

// Function to get all users
export const getAllUsers = (): User[] => {
  return [...mockUsers];
};

// Function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Function to create new user
export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  return newUser;
};

// Function to update user
export const updateUser = (id: string, userData: Partial<User>): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return undefined;
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  
  return mockUsers[userIndex];
};

// Function to delete user
export const deleteUser = (id: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  mockUsers.splice(userIndex, 1);
  return true;
};
