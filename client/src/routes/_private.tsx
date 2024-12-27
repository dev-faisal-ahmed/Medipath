import { MainLayout } from '@/components/layout/main/main-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ location, context }) => {
    if (!context.auth.user) throw redirect({ to: '/login', search: { redirect: location.pathname } });
  },
  component: MainLayout,
});
