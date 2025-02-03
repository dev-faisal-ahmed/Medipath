import { PropsWithChildren } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { MainLayout } from './_ui/main-layout';
import { getServerSession } from 'next-auth';
import { authOption } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  const session = await getServerSession(authOption);
  if (!session?.user) redirect('/auth/login');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainLayout>{children}</MainLayout>
    </HydrationBoundary>
  );
}
