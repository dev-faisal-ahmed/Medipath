import { PropsWithChildren } from 'react';
import { QUERY_KEYS } from '@/api-lib/query-keys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuth } from '@/actions';
import { MainLayout } from './_components/main-layout';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: [QUERY_KEYS.AUTH], queryFn: async () => await getAuth() });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainLayout>{children}</MainLayout>
    </HydrationBoundary>
  );
}
