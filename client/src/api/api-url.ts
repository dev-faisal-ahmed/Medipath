export const SERVER_ADDRESS = 'http://localhost:5000/api/v1';

export const apiUrl = {
  // auth
  loginWithCredentials: `${SERVER_ADDRESS}/auth/login/credentials`,
  // service
  addService: `${SERVER_ADDRESS}/service`,
  getServices: (searchParams: string) => `${SERVER_ADDRESS}/services?${searchParams}`,
  deleteService: (serviceId: string) => `${SERVER_ADDRESS}/service/${serviceId}`,
};
