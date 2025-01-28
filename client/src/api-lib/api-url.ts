import { TCategory } from '@/types';

export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';
// export const SERVER_ADDRESS = 'https://medipath-server-beta.vercel.app/api/v1';

export const apiUrl = {
  // auth
  loginWithCredentials: `${SERVER_ADDRESS}/auth/login/credentials`,
  // service
  addService: `${SERVER_ADDRESS}/service`,
  getServices: (searchParams: string) => `${SERVER_ADDRESS}/services${searchParams}`,
  deleteService: (serviceId: string) => `${SERVER_ADDRESS}/service/${serviceId}`,
  updateService: (serviceId: string) => `${SERVER_ADDRESS}/service/${serviceId}`,
  getServiceList: `${SERVER_ADDRESS}/services/list`,
  // referrer
  addReferrer: `${SERVER_ADDRESS}/referrer`,
  getReferrers: (searchParams: string) => `${SERVER_ADDRESS}/referrers${searchParams}`,
  updateReferrer: (referrerId: string) => `${SERVER_ADDRESS}/referrer/${referrerId}`,
  deleteReferrer: (referrerId: string) => `${SERVER_ADDRESS}/referrer/${referrerId}`,
  getReferrerList: `${SERVER_ADDRESS}/referrers/list`,
  // bill
  addBill: `${SERVER_ADDRESS}/bill`,
  getBillDetails: (billId: string) => `${SERVER_ADDRESS}/bill/${billId}`,
  getBills: (searchParams: string) => `${SERVER_ADDRESS}/bills${searchParams}`,
  takeDue: (billId: string) => `${SERVER_ADDRESS}/bill/${billId}/take-due`,
  giveCommission: (billId: string) => `${SERVER_ADDRESS}/bill/${billId}/give-commission`,
  // expense category
  addCategory: `${SERVER_ADDRESS}/category`,
  getCategories: (mode: TCategory['mode']) => `${SERVER_ADDRESS}/categories?mode=${mode}`,
  updateCategory: (categoryId: string) => `${SERVER_ADDRESS}/category/${categoryId}`,
  deleteCategory: (categoryId: string) => `${SERVER_ADDRESS}/category/${categoryId}`,
  // transaction
  addExpense: `${SERVER_ADDRESS}/transaction/expense`,
  getMonthlyExpenses: (searchParams: string) => `${SERVER_ADDRESS}/transactions/expenses/monthly${searchParams}`,
};
