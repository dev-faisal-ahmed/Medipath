import { apiUrl } from '../api-url';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { TServerResponse, TObject, TReferrer } from '@/types';

// queries
export const addReferrer = async (payload: TAddReferrerPayload): Promise<TServerResponse<null>> => {
  const refinedBody = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addReferrer, refinedBody);
  return data;
};

export const getReferrers = async (args: TObject): Promise<TServerResponse<TGetReferrersQueryResponse[]>> => {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs as TObject).toString();
  const { data } = await axiosInstance.get(apiUrl.getReferrers(searchParams ? `?${searchParams}` : ''));
  return data;
};

export const updateReferrer = async (payload: TUpdateReferrerPayload): Promise<TServerResponse<null>> => {
  const { id, ...rest } = payload;
  const refinedBody = removeEmptyProperty(rest);
  const { data } = await axiosInstance.patch(apiUrl.updateReferrer(id), refinedBody);
  return data;
};

export const deleteReferrer = async (referrerId: string): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.delete(apiUrl.deleteReferrer(referrerId));
  return data;
};

export const getReferrerList = async (): Promise<TServerResponse<TReferrerList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getReferrerList);
  return data;
};

// type
export type TGetReferrersQueryResponse = Pick<TReferrer, 'id' | 'name' | 'designation' | 'type' | 'phone'> & {
  visit: number;
  referrer: number;
  paid: number;
};

type TAddReferrerPayload = Pick<TReferrer, 'name' | 'designation' | 'type' | 'phone'>;
type TUpdateReferrerPayload = Pick<TReferrer, 'id' | 'name' | 'designation' | 'type' | 'phone'>;
export type TReferrerList = Pick<TReferrer, 'id' | 'name' | 'type' | 'designation'>;
