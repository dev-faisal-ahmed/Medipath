import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { userRouter } from '../modules/user/user.router';

interface IRoute {
  path: string;
  router: Router;
}

export const appRouter = Router();

const routes: IRoute[] = [
  { path: '/auth', router: authRouter },
  { path: '/user', router: userRouter },
];

routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});
