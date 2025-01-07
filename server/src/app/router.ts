import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { userRouter } from '../modules/user/user.router';
import { serviceRouter, servicesRouter } from '../modules/service/service.router';
import { referrerRouter, referrersRouter } from '../modules/referrer/referrer.router';
import { billRouter } from '../modules/bill/bill.router';

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
  { path: '/referrer', router: referrerRouter },
  { path: '/referrers', router: referrersRouter },
  { path: '/bill', router: billRouter },
];

routes.forEach(({ path, router }) => {
  appRouter.use(path, router);
});
