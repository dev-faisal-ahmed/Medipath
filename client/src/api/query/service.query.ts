import { axiosInstance } from '../axios-instance';
import { removeEmptyProperty } from '@/helper';
import { apiUrl } from '../api-url';
import { IServerResponse } from '@/lib/types';

interface IAddServicePayload {
  name: string;
  price: number;
  roomNo?: string;
}

export async function addService(payload: IAddServicePayload): Promise<IServerResponse<null>> {
  const body = removeEmptyProperty(payload);
  const response = await axiosInstance.post(apiUrl.addService, body);
  return response.data;
}
