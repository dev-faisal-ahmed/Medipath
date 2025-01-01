import { getLoggedUser } from '@/helper';
import { TObject } from '@/lib/types';
import { LoginPage } from '@/pages/login/login.page';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  validateSearch: (search: TObject) => {
    return { redirect: search.redirect || '' };
  },

  beforeLoad: async () => {
    const user = getLoggedUser();
    if (user) throw redirect({ to: '/' });
  },
  component: LoginPage,
});
