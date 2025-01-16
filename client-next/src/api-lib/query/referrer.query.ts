import { removeEmptyProperty } from '@/helper';
import { IServerResponse, TObject, IReferrer } from '@/types';
import { apiUrl } from '../api-url';
import { axiosInstance } from '@/lib/axios';

type TAddReferrerPayload = Pick<IReferrer, 'name' | 'designation' | 'type' | 'phone'>;

export async function addReferrer(payload: TAddReferrerPayload): Promise<IServerResponse<null>> {
  const refinedBody = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addReferrer, refinedBody);
  return data;
}

export async function getReferrers(args: TObject): Promise<IServerResponse<IReferrer[]>> {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const { data } = await axiosInstance.get(apiUrl.getReferrers(searchParams));
  return data;
}
