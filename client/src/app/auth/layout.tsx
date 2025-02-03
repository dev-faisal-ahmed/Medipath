import { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';
import { authOption } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOption);
  if (session?.user) redirect('/');

  return <>{children}</>;
}
