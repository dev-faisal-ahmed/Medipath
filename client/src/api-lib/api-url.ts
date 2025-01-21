export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';

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
};
