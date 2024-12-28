import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { userRouter } from '../modules/user/user.router';
import { serviceRouter, servicesRouter } from '../modules/service/service.router';

interface IRoute {
  path: string;
  router: Router;
}

export const appRouter = Router();

const routes: IRoute[] = [
  { path: '/auth', router: authRouter },
  { path: '/user', router: userRouter },
  { path: '/service', router: serviceRouter },
  { path: '/services', router: servicesRouter },
];

routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});
