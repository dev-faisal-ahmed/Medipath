import { removeEmptyProperty } from '@/helper';
import { IServerResponse } from '@/lib/types';
import { IReferrer } from '@/lib/types/referrer';
import { axiosInstance } from '../axios-instance';
import { apiUrl } from '../api-url';

type TAddReferrerPayload = Pick<IReferrer, 'name' | 'designation' | 'type' | 'phone'>;

export async function addReferrer(payload: TAddReferrerPayload): Promise<IServerResponse<null>> {
  const refinedBody = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addReferrer, refinedBody);
  return data;
}
