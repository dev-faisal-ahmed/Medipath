import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './sidebar';

export function MainLayout() {
  return (
    <main className="grid h-dvh grid-cols-[280px_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
}
