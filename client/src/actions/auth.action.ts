'use server';

import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '../lib/auth';

export const singInAction = async (payload: { email: string; password: string }) => {
  try {
    const response = await signIn('credentials', { ...payload, redirect: false });
    console.log(response);
    return { success: response };
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AuthError) message = error.cause?.err?.message || 'Invalid credentials';
    throw new Error(message);
  }
};

export const logOut = async () => {
  await signOut();
};

export const getAuth = async () => {
  return await auth();
};
