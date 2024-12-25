import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';

export const appRouter = Router();

const routes: { path: string; router: Router }[] = [{ path: '/auth', router: authRouter }];

routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});
