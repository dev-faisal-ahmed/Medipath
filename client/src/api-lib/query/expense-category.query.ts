import { axiosInstance } from '@/lib/axios';
import { IServerResponse } from '@/types';
import { apiUrl } from '../api-url';

export const addExpenseCategory = async (payload: TAddExpenseCategoryPayload): Promise<IServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.addExpenseCategory, payload);
  return data;
};

export const getExpenseCategoryList = async (): Promise<IServerResponse<TExpenseCategoryList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getExpenseCategoryList);
  return data;
};

type TAddExpenseCategoryPayload = { name: string };
type TExpenseCategoryList = { _id: string; name: string };
