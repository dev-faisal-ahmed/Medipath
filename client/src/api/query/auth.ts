import { apiUrl } from '../api-url';
import { IServerResponse } from '@/lib/types';
import { axiosInstance } from '../axios-instance';

interface ILoginWithCredentialsPayload {
  email: string;
  password: string;
}

interface ILoginWithCredentialsResponse {
  accessToken: string;
}

export async function loginWithCredentials({
  email,
  password,
}: ILoginWithCredentialsPayload): Promise<IServerResponse<ILoginWithCredentialsResponse>> {
  const response = await axiosInstance.post(apiUrl.loginWithCredentials, { email, password });
  return response?.data;
}
