import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { IBill, IServerResponse } from '@/types';
import { apiUrl } from '../api-url';

type TAddServicePayload = Pick<
  IBill,
  | 'services'
  | 'patientInfo'
  | 'visitorId'
  | 'referrerId'
  | 'visitCommission'
  | 'referrerCommission'
  | 'discount'
  | 'paid'
>;

export const addBill = async (payload: TAddServicePayload): Promise<IServerResponse<{ billId: string }>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addBill, refinedPayload);
  return data;
};
