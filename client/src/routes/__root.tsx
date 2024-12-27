import { IAuthContext } from '@/providers/auth/auth-context';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface IRouterContext {
  auth: IAuthContext;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => <Outlet />,
});
