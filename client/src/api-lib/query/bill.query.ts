import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { IBill, IPatient, IServerResponse, IService } from '@/types';
import { apiUrl } from '../api-url';

// **** query **** \\
export const addBill = async (payload: TAddServicePayload): Promise<IServerResponse<{ billId: string }>> => {
  const refinedPayload = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addBill, refinedPayload);
  return data;
};

export const getBillDetails = async (billId: string): Promise<IServerResponse<IBillDetails>> => {
  const { data } = await axiosInstance.get(apiUrl.getBillDetails(billId));
  return data;
};

// types
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

interface IBillDetails {
  _id: string;
  referrerId: string;
  visitorId: string;
  billId: string;
  services: Omit<IService, '_id'>[];
  patientInfo: IPatient;
  date: string;
  price: number;
  discount?: number;
  paid?: number;
  agent: { _id: string; name: string };
  doctor: { _id: string; name: string };
  createdAt: string;
}
