import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

export function MainLayout() {
  return (
    <main className="grid h-dvh grid-cols-[280px_1fr]">
      <Sidebar />
      <main>
        <TopBar />
        <Outlet />
      </main>
    </main>
  );
}
