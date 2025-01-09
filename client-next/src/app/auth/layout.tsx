import { getAuth } from '@/actions';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getAuth();
  if (session?.user) redirect('/');

  return children;
}
