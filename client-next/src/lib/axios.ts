import axios from 'axios';

import { SERVER_ADDRESS } from '@/lib/api';

export const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: { ['Content-Type']: 'application/json' },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
