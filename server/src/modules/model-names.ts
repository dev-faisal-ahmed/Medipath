export const MODEL = {
  BILL: 'bills',
  REFERRER: 'referrers',
  SERVICE: 'services',
  TRANSACTION: 'transactions',
  USER: 'users',
  EXPENSE_CATEGORY: 'expense-categories',
  DOCTOR: 'doctors',
} as const;

export const TRANSACTION_CATEGORY_TYPE = {
  BILL_TRANSACTION: 'bill-transaction',
  DOCTOR_OPERATION_TRANSACTION: 'doctor-operation-transaction',
  REFERRER_TRANSACTION: 'referrer-transaction',
  UTILITY_TRANSACTION: 'utility-transaction',
  ADMISSION_TRANSACTION: 'admission-transaction',
} as const;
