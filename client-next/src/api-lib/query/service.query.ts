import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { IServerResponse, IService, TObject } from '@/types';
import { apiUrl } from '../api-url';

interface IAddServicePayload {
  name: string;
  price: number;
  roomNo?: string;
}

export const addService = async (payload: IAddServicePayload): Promise<IServerResponse<null>> => {
  const body = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addService, body);
  return data;
};

export const getServices = async (args: TObject): Promise<IServerResponse<IService[]>> => {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const { data } = await axiosInstance.get(apiUrl.getServices(searchParams));
  return data;
};

export const updateService = async (payload: Partial<IService>): Promise<IServerResponse<null>> => {
  const { _id: serviceId, ...restPayload } = payload;
  const body = removeEmptyProperty(restPayload);
  const { data } = await axiosInstance.patch(apiUrl.updateService(serviceId!), body);
  return data;
};

export const deleteService = async (serviceId: string): Promise<IServerResponse<null>> => {
  const { data } = await axiosInstance.delete(apiUrl.deleteService(serviceId));
  return data;
};
