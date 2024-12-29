import { apiUrl } from '../api-url';
import { removeEmptyProperty } from '@/helper';
import { IServerResponse, IService } from '@/lib/types';
import { axiosInstance } from '../axios-instance';

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

export async function getServices(args: Record<string, string>): Promise<IServerResponse<IService[]>> {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const { data } = await axiosInstance.get(apiUrl.getServices(searchParams));
  return data;
}
