'use server';

import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '../lib/auth';

export const singInAction = async (payload: { email: string; password: string }) => {
  try {
    const response = await signIn('credentials', { ...payload, redirect: false });
    return { success: response };
  } catch (error) {
    if (error instanceof AuthError) return { error: error.cause?.err?.message || 'Invalid credentials' };
    return { error: 'Something went wrong' };
  }
};

export const logOut = async () => {
  await signOut();
};

export const getAuth = async () => {
  return await auth();
};
