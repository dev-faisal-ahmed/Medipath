import { TServerResponse, TService, TObject } from '@/types';
import { removeEmptyProperty } from '@/helper';
import { axiosInstance } from '@/lib/axios';
import { apiUrl } from '../api-url';

export const addService = async (payload: TAddServicePayload): Promise<TServerResponse<null>> => {
  const body = removeEmptyProperty(payload);
  const { data } = await axiosInstance.post(apiUrl.addService, body);
  return data;
};

export const getServices = async (args: TObject): Promise<TServerResponse<TService[]>> => {
  const refinedArgs = removeEmptyProperty(args);
  const searchParams = new URLSearchParams(refinedArgs as TObject).toString();
  const { data } = await axiosInstance.get(apiUrl.getServices(searchParams ? `?${searchParams}` : ''));
  return data;
};

export const updateService = async (payload: Partial<TService>): Promise<TServerResponse<null>> => {
  const { id: serviceId, ...restPayload } = payload;
  const body = removeEmptyProperty(restPayload);
  const { data } = await axiosInstance.patch(apiUrl.updateService(serviceId!), body);
  return data;
};

export const deleteService = async (serviceId: string): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.delete(apiUrl.deleteService(serviceId));
  return data;
};

export const getServiceList = async (): Promise<TServerResponse<TServiceList[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getServiceList);
  return data;
};

// type
type TAddServicePayload = Pick<TService, 'name' | 'price' | 'roomNo'>;
export type TServiceList = Pick<TService, 'id' | 'name' | 'price' | 'roomNo'>;
