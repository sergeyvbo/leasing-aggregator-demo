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
  passport: [
    'passportSeries',
    'passportNumber',
    'issueDate',
    'issuingAuthority',
    'issuingCode',
    'birthDate',
    'birthPlace'
  ],
  inn_certificate: [
    'innNumber',
    'issueDate',
    'issuingAuthority'
  ],
  bank_statement: [
    'bankName',
    'accountNumber',
    'statementPeriod',
    'issueDate'
  ],
  financial_report: [
    'reportType',
    'reportingPeriod',
    'issueDate',
    'auditorName'
  ],
  contract: [
    'contractNumber',
    'contractDate',
    'contractSubject',
    'contractAmount',
    'counterparty'
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
  territory: 'Территория действия',
  passportSeries: 'Серия паспорта',
  passportNumber: 'Номер паспорта',
  issuingCode: 'Код подразделения',
  birthDate: 'Дата рождения',
  birthPlace: 'Место рождения',
  innNumber: 'ИНН',
  bankName: 'Наименование банка',
  accountNumber: 'Номер счета',
  statementPeriod: 'Период выписки',
  reportType: 'Тип отчета',
  reportingPeriod: 'Отчетный период',
  auditorName: 'Аудитор',
  contractNumber: 'Номер договора',
  contractDate: 'Дата договора',
  contractSubject: 'Предмет договора',
  contractAmount: 'Сумма договора',
  counterparty: 'Контрагент'
};

// Document type labels in Russian
export const documentTypeLabels: Record<string, string> = {
  registration: 'Регистрационные документы',
  license: 'Лицензии',
  permit: 'Разрешения',
  passport: 'Паспорт',
  inn_certificate: 'Справка об ИНН',
  bank_statement: 'Банковская выписка',
  financial_report: 'Финансовая отчетность',
  contract: 'Договор',
  other: 'Прочие документы'
};