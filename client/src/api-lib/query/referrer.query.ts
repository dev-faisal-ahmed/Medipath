import { apiUrl } from '../api-url';
import { removeEmptyProperty } from '@/helper';
import { IServerResponse, TObject, IReferrer } from '@/types';
import { axiosInstance } from '@/lib/axios';

type TAddReferrerPayload = Pick<IReferrer, 'name' | 'designation' | 'type' | 'phone'>;
export const addReferrer = async (payload: TAddReferrerPayload): Promise<IServerResponse<null>> => {
  const refinedBody = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addReferrer, refinedBody);
  return data;
};

export const getReferrers = async (args: TObject): Promise<IServerResponse<IReferrer[]>> => {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs as TObject).toString();
  const { data } = await axiosInstance.get(apiUrl.getReferrers(searchParams ? `?${searchParams}` : ''));
  return data;
};

type TUpdateReferrerPayload = Pick<IReferrer, '_id' | 'name' | 'designation' | 'type' | 'phone'>;
export const updateReferrer = async (payload: TUpdateReferrerPayload): Promise<IServerResponse<null>> => {
  const { _id, ...rest } = payload;
  const refinedBody = removeEmptyProperty(rest);
  const { data } = await axiosInstance.patch(apiUrl.updateReferrer(_id), refinedBody);
  return data;
};

export const deleteReferrer = async (referrerId: string): Promise<IServerResponse<null>> => {
  const { data } = await axiosInstance.delete(apiUrl.deleteReferrer(referrerId));
  return data;
};

export type TReferrerList = Pick<IReferrer, '_id' | 'name' | 'type' | 'designation'>;
export const getReferrerList = async (): Promise<IServerResponse<TReferrerList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getReferrerList);
  return data;
};
