import { apiUrl } from '../api-url';
import { axiosInstance } from '@/lib/axios';
import { MODE, TBill, TReferrer, TServerResponse } from '@/types';

export const getOverview = async (args: TGetOverViewArgs): Promise<TServerResponse<TOverview>> => {
  const searchParams = new URLSearchParams({ ...args, dateTime: args.dateTime.toISOString() });
  const { data } = await axiosInstance.get(apiUrl.getOverview(`?${searchParams}`));
  return data;
};

// types
export enum OVERVIEW_TYPE {
  DAILY = 'daily',
  MONTHLY = 'monthly',
}

type TGetOverViewArgs = { type: OVERVIEW_TYPE; dateTime: Date; mode: MODE };

export type TOverview = {
  totalCollection: number;
  utilityExpense: number;
  referredExpense: number;
  doctorsPcExpense: number;
  revenue: number;
  due: number;
  referredCommissionToPay: number;
  doctorPcCommissionToPay: number;
  bills: TBillInfo[];
  totalBills: number;
};

type TBillInfo = TBill & {
  doctor?: Pick<TReferrer, 'id' | 'name' | 'designation'>;
  agent?: Pick<TReferrer, 'id' | 'name' | 'designation'>;
};
