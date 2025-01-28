import { PropsWithChildren } from 'react';
import { QK } from '@/api-lib/query-keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuth } from '@/actions';
import { MainLayout } from './_ui/main-layout';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: [QK.AUTH], queryFn: async () => await getAuth() });

  const session = await getAuth();
  if (!session?.user) redirect('/auth/login');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainLayout>{children}</MainLayout>
    </HydrationBoundary>
  );
}
