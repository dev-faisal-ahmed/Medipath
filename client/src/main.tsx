import { Toaster } from 'sonner';
import { StrictMode } from 'react';
import { routeTree } from './routeTree.gen';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './providers/query-provider';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './index.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster richColors duration={3000} />
    </QueryProvider>
  </StrictMode>,
);
