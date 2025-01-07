import axios from 'axios';

import { SERVER_ADDRESS } from '@/api/api-url';
import { getAccessToken } from './actions';

export const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
