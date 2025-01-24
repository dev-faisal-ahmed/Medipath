import { TBill, TServerResponse, TService, TObject } from '@/types';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

// queries
export const addBill = async (payload: TAddServicePayload): Promise<TServerResponse<{ billId: string }>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addBill, refinedPayload);
  return data;
};

export const getBills = async (args: TObject): Promise<TServerResponse<TBill[]>> => {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs as TObject).toString();
  const { data } = await axiosInstance.get(apiUrl.getBills(searchParams ? `?${searchParams}` : ''));
  return data;
};

export const getBillDetails = async (billId: string): Promise<TServerResponse<TBillDetails>> => {
  const { data } = await axiosInstance.get(apiUrl.getBillDetails(billId));
  return data;
};

export const takeDue = async ({ amount, billId }: TTakeDuePayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.patch(apiUrl.takeDue(billId), { amount });
  return data;
};

// types
type TAddServicePayload = Pick<
  TBill,
  | 'services'
  | 'patientInfo'
  | 'visitorId'
  | 'referrerId'
  | 'visitCommission'
  | 'referrerCommission'
  | 'discount'
  | 'paid'
>;

export type TBillDetails = Pick<
  TBill,
  'id' | 'billId' | 'referrerId' | 'visitorId' | 'patientInfo' | 'date' | 'price' | 'discount' | 'paid'
> & { services: Omit<TService, 'id'>[]; agent: { id: string; name: string }; doctor: { id: string; name: string } };

type TTakeDuePayload = { billId: string; amount: number };
