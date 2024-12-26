import { getLoggedUser } from '@/helper';
import { LoginPage } from '@/pages/login/login-page';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const user = getLoggedUser();
    if (user) throw redirect({ to: '/' });
  },
  component: LoginPage,
});
