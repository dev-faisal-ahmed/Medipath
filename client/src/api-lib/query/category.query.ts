import { TCategory, TServerResponse } from '@/types';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

// queries
export const addCategory = async (payload: TAddExpenseCategoryPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.addCategory, payload);
  return data;
};

export const getCategories = async (mode: TCategory['mode']): Promise<TServerResponse<TExpenseCategoryList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getCategories(mode));
  return data;
};

// type
type TAddExpenseCategoryPayload = Pick<TCategory, 'name' | 'mode'>;
type TExpenseCategoryList = Pick<TCategory, 'id' | 'name' | 'mode'>;
