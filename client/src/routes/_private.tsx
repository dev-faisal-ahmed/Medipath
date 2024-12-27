import { MainLayout } from '@/components/layout/main/main-layout';
import { getLoggedUser } from '@/helper';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ location }) => {
    const user = getLoggedUser();
    if (!user) throw redirect({ to: '/login', search: { redirect: location.href } });
  },
  component: MainLayout,
});
