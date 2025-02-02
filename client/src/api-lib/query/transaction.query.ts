import {
  MODE,
  REFERRER_TYPE,
  TReferrer,
  TReferrerExpenseTransaction,
  TServerResponse,
  TUtilityExpenseTransaction,
} from '@/types';

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

export const getReferrerExpenses = async (
  args: TGetReferrerExpenseArgs,
): Promise<TServerResponse<TReferrerExpense>> => {
  const searchParams = new URLSearchParams(args).toString();
  const { data } = await axiosInstance.get(apiUrl.getReferrerExpenses(`?${searchParams}`));
  return data;
};

// types
type TAddExpense = Pick<TUtilityExpenseTransaction, 'amount' | 'date' | 'description' | 'mode' | 'categoryId'>;

type TGetMonthlyExpenseArgs = { dateTime: string; mode: MODE };
export type TMonthlyExpense = {
  firstExpenseDate: string;
  lastExpenseDate: string;
  total: number;
  expenses: (TUtilityExpenseTransaction & { categoryName: string })[];
};

type TGetReferrerExpenseArgs = { dateTime: string; referrerType: REFERRER_TYPE };
export type TReferrerExpense = {
  firstTransactionDate: string;
  lastTransactionDate: string;
  total: number;
  transactions: (Pick<TReferrerExpenseTransaction, 'id' | 'amount' | 'date' | 'description'> & {
    referrer: Pick<TReferrer, 'id' | 'name' | 'designation'>;
  })[];
};
