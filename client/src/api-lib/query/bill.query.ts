import { TBill, TServerResponse, TObject, TReferrer } from '@/types';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

// queries
export const addBill = async (payload: TAddServicePayload): Promise<TServerResponse<{ billId: string }>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addBill, refinedPayload);
  return data;
};

export const getBills = async (args: TObject): Promise<TServerResponse<TGetBillsResponse[]>> => {
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

export const giveCommission = async (payload: TGiveCommissionPayload): Promise<TServerResponse<null>> => {
  const { billId, ...restPayload } = payload;
  const { data } = await axiosInstance.patch(apiUrl.giveCommission(billId), restPayload);
  return data;
};

export const updateBill = async (payload: TUpdateBillPayload): Promise<TServerResponse<null>> => {
  const { id, visitCommission, referrerCommission, ...restPayload } = payload;
  const refinedPayload = removeEmptyProperty(restPayload);

  const { data } = await axiosInstance.patch(apiUrl.updateBill(id), {
    ...refinedPayload,
    visitCommission,
    referrerCommission,
  });

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

export type TGetBillsResponse = TBill & {
  transactions: { _id: string; totalAmount: number }[];
  agent?: Pick<TReferrer, 'id' | 'name' | 'designation'>;
  doctor?: Pick<TReferrer, 'id' | 'name' | 'designation'>;
};

export type TBillDetails = Pick<
  TBill,
  | 'id'
  | 'billId'
  | 'referrerId'
  | 'visitorId'
  | 'patientInfo'
  | 'price'
  | 'discount'
  | 'paid'
  | 'services'
  | 'createdAt'
> & { agent: { id: string; name: string }; doctor: { id: string; name: string; designation: string } };

type TTakeDuePayload = { billId: string; amount: number };
type TGiveCommissionPayload = { amount: number; referrerId: string; billId: string };

type TUpdateBillPayload = Pick<TBill, 'id' | 'referrerId' | 'visitorId' | 'referrerCommission' | 'visitCommission'>;
