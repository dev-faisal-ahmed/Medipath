import { StrictMode } from 'react';
import { routeTree } from './routeTree.gen';
import { createRoot } from 'react-dom/client';
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
    <RouterProvider router={router} />
  </StrictMode>,
);