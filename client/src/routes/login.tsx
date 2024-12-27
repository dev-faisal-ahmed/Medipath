import { getLoggedUser } from '@/helper';
import { LoginPage } from '@/pages/login/login-page';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, string>) => {
    return { redirect: search.redirect || '' };
  },

  beforeLoad: async () => {
    const user = getLoggedUser();
    if (user) throw redirect({ to: '/' });
  },
  component: LoginPage,
});
