// Document type configurations for different document field sets

export const documentTypeFields: Record<string, string[]> = {
  registration: [
    'registrationNumber', 
    'issueDate', 
    'issuingAuthority',
    'registrationAddress'
  ],
  license: [
    'licenseNumber', 
    'issueDate', 
    'expiryDate', 
    'issuingAuthority', 
    'scope',
    'licenseType'
  ],
  permit: [
    'permitNumber', 
    'issueDate', 
    'expiryDate', 
    'purpose',
    'issuingAuthority',
    'territory'
  ],
  other: [
    'documentNumber', 
    'issueDate', 
    'description',
    'issuingAuthority'
  ]
};

// Field labels in Russian for UI display
export const documentFieldLabels: Record<string, string> = {
  registrationNumber: 'Регистрационный номер',
  licenseNumber: 'Номер лицензии',
  permitNumber: 'Номер разрешения',
  documentNumber: 'Номер документа',
  issueDate: 'Дата выдачи',
  expiryDate: 'Дата окончания',
  issuingAuthority: 'Орган выдачи',
  scope: 'Область действия',
  purpose: 'Назначение',
  description: 'Описание',
  registrationAddress: 'Адрес регистрации',
  licenseType: 'Тип лицензии',
  territory: 'Территория действия'
};

// Document type labels in Russian
export const documentTypeLabels: Record<string, string> = {
  registration: 'Регистрационные документы',
  license: 'Лицензии',
  permit: 'Разрешения',
  other: 'Прочие документы'
};