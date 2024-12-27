import { Toaster } from 'sonner';
import { Providers } from './providers';
import { routeTree } from './routeTree.gen';
import { useAuth } from './providers/auth/use-auth';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const router = createRouter({ routeTree, context: undefined! });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function Router() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <Providers>
      <Router />
      <Toaster richColors duration={3000} />
    </Providers>
  );
}
