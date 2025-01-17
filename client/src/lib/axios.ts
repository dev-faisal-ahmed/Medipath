import axios from 'axios';

import { SERVER_ADDRESS } from '@/api-lib';
import { getSession } from 'next-auth/react';

export const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: { ['Content-Type']: 'application/json' },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
