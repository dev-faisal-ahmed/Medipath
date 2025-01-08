'use server';

import { auth, signIn } from '../lib/auth';

export async function singInAction(payload: { email: string; password: string }) {
  return await signIn('credentials', { ...payload, redirect: false });
}

export async function getAuth() {
  return await auth();
}
