import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { IServerResponse, IService, TObject } from '@/types';
import { apiUrl } from '../api-url';

interface IAddServicePayload {
  name: string;
  price: number;
  roomNo?: string;
}

export async function addService(payload: IAddServicePayload): Promise<IServerResponse<null>> {
  const body = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addService, body);
  return data;
}

export async function getServices(args: TObject): Promise<IServerResponse<IService[]>> {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const { data } = await axiosInstance.get(apiUrl.getServices(searchParams));
  return data;
}
