import Credentials from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

import { NextAuthOptions } from 'next-auth';
import { PROVIDER, TLoggedUser, TServerResponse, USER_ROLE } from './types';
import { axiosInstance } from './lib/axios';
import { apiUrl } from './api-lib';
import { AxiosError } from 'axios';
import { generateAccessToken } from './helper';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: TLoggedUser | null;
  }

  interface User {
    role: USER_ROLE;
    provider: PROVIDER;
  }
}

export const authOption: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const response = await axiosInstance.post(apiUrl.loginWithCredentials, { email, password });
          const { data: userInfo } = response.data as TServerResponse<TLoggedUser>;
          return { ...userInfo, role: userInfo.role, provider: PROVIDER.CREDENTIALS, id: userInfo.id };
        } catch (error) {
          let message = 'Invalid credentials';
          if (error instanceof AxiosError) message = error.response?.data.message;
          else if (error instanceof Error) message = error.message;
          throw new Error(message);
        }
      },
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jwt.sign(token!, secret);
      return encodedToken;
    },

    decode: ({ secret, token }) => {
      const decodedToken = jwt.verify(token!, secret) as TLoggedUser;
      return decodedToken;
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.provider = user.provider;
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          provider: token.provider as PROVIDER,
          role: token.role as USER_ROLE,
        };

        session.accessToken = generateAccessToken(token as TLoggedUser);
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
  },
};
