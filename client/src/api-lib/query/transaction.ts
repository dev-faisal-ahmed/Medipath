import { TServerResponse, TUtilityExpenseTransaction } from '@/types';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

export const addExpense = async (payload: TAddExpense): Promise<TServerResponse<null>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addExpense, refinedPayload);
  return data;
};

// types
type TAddExpense = Pick<TUtilityExpenseTransaction, 'amount' | 'date' | 'description' | 'mode' | 'categoryId'>;
