import { Toaster } from 'sonner';
import { Providers } from './providers';
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree, context: undefined! });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Toaster richColors duration={3000} />
    </Providers>
  );
}
