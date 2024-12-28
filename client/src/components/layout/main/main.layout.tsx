import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './sidebar';
import { HeaderProvider } from '@/providers/header/header.provider';

export function MainLayout() {
  return (
    <main className="grid h-dvh grid-cols-[280px_1fr]">
      <Sidebar />
      <main>
        <HeaderProvider>
          <Outlet />
        </HeaderProvider>
      </main>
    </main>
  );
}
