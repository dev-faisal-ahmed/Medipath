import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { axiosInstance } from './axios';
import { IServerResponse, PROVIDER, TLoggedUser, USER_ROLE } from '../types';
import { generateAccessToken } from '@/helper';
import { AxiosError } from 'axios';
import { apiUrl } from '@/api-lib';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: TLoggedUser | null;
  }

  interface User {
    _id: string;
    role: USER_ROLE;
    provider: PROVIDER;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const response = await axiosInstance.post(apiUrl.loginWithCredentials, { email, password });
          const { data: userInfo } = response.data as IServerResponse<TLoggedUser>;
          return userInfo;
        } catch (error) {
          let message = 'Invalid credentials';
          if (error instanceof AxiosError) message = error.response?.data.message;
          else if (error instanceof Error) message = error.message;
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const accessToken = generateAccessToken({ ...user, name: user.name!, email: user.email! });
        Object.assign(token, { user, accessToken });
      }
      return token;
    },

    session: ({ session, token }) => {
      const user = token.user;
      const accessToken = token.accessToken;
      Object.assign(session, { user, accessToken });
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
  },
});
