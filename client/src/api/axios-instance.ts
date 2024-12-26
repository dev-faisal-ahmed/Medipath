import axios from 'axios';

import { SERVER_ADDRESS } from './api-url';
import { getAccessTokenFromLocal } from '@/helper';

export const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromLocal();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
