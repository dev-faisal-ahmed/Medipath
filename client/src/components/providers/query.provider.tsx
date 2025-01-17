import { isServer, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

const TIME = 20 * 60 * 1000;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: TIME } },
    queryCache: new QueryCache(),
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="top-left" />
      {children}
    </QueryClientProvider>
  );
};
