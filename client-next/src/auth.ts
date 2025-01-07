import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { axiosInstance } from './lib/axios';
import { apiUrl } from './api/api-url';
import { IServerResponse } from './lib/types';


interface ICredentialPayload {
  email: string;
  password: string;
}


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials: ICredentialPayload) {
        const { email, password } = credentials;
        const response = await axiosInstance.post(apiUrl.loginWithCredentials, { email, password });
        const { data } = response.data as IServerResponse<{ accessToken: string }>;
        const accessToken = data?.accessToken;
        return accessToken;
      },
    }),
  ],
});
