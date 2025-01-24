import { axiosInstance } from '@/lib/axios';
import { TServerResponse } from '@/types';
import { apiUrl } from '../api-url';

// queries
export const addExpenseCategory = async (payload: TAddExpenseCategoryPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.addExpenseCategory, payload);
  return data;
};

export const getExpenseCategoryList = async (): Promise<TServerResponse<TExpenseCategoryList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getExpenseCategoryList);
  return data;
};

// type
type TAddExpenseCategoryPayload = { name: string };
type TExpenseCategoryList = { id: string; name: string };
