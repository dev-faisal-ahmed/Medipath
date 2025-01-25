import { MODE, TServerResponse, TUtilityExpenseTransaction } from '@/types';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

export const addExpense = async (payload: TAddExpense): Promise<TServerResponse<null>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addExpense, refinedPayload);
  return data;
};

export const getMonthlyExpenses = async (args: TGetMonthlyExpenseArgs): Promise<TServerResponse<TMonthlyExpense>> => {
  const searchParams = new URLSearchParams(args).toString();
  const { data } = await axiosInstance.get(apiUrl.getMonthlyExpenses(`?${searchParams}`));
  return data;
};

// types
type TAddExpense = Pick<TUtilityExpenseTransaction, 'amount' | 'date' | 'description' | 'mode' | 'categoryId'>;
type TGetMonthlyExpenseArgs = { dateTime: string; mode: MODE };
export type TMonthlyExpense = {
  firstExpenseDate: string;
  lastExpenseDate: string;
  expenses: (TUtilityExpenseTransaction & { categoryName: string })[];
};
