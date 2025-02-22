import { TCategory } from '@/types';

// export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';
export const SERVER_ADDRESS = 'https://medipath-server-beta.vercel.app/api/v1';

export const apiUrl = {
  // auth
  loginWithCredentials: `/auth/login/credentials`,
  // service
  addService: `/service`,
  getServices: (searchParams: string) => `/services${searchParams}`,
  deleteService: (serviceId: string) => `/service/${serviceId}`,
  updateService: (serviceId: string) => `/service/${serviceId}`,
  getServiceList: `/services/list`,
  // referrer
  addReferrer: `/referrer`,
  getReferrers: (searchParams: string) => `/referrers${searchParams}`,
  updateReferrer: (referrerId: string) => `/referrer/${referrerId}`,
  deleteReferrer: (referrerId: string) => `/referrer/${referrerId}`,
  getReferrerList: `/referrers/list`,
  // bill
  addBill: `/bill`,
  getBillDetails: (billId: string) => `/bill/${billId}`,
  getBills: (searchParams: string) => `/bills${searchParams}`,
  takeDue: (billId: string) => `/bill/${billId}/take-due`,
  giveCommission: (billId: string) => `/bill/${billId}/give-commission`,
  updateBill: (billId: string) => `/bill/${billId}`,
  // expense category
  addCategory: `/category`,
  getCategories: (mode: TCategory['mode']) => `/categories?mode=${mode}`,
  updateCategory: (categoryId: string) => `/category/${categoryId}`,
  deleteCategory: (categoryId: string) => `/category/${categoryId}`,
  // transaction
  addExpense: `/transaction/expense`,
  getMonthlyExpenses: (searchParams: string) => `/transactions/expenses/monthly${searchParams}`,
  getReferrerExpenses: (searchParams: string) => `/transactions/expenses/referrer${searchParams}`,
  getTransactionSummary: (searchParams: string) => `/transactions/summary${searchParams}`,
  // overview
  getOverview: (searchParams: string) => `/overview${searchParams}`,
};
