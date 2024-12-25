import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { serviceValidation } from './service.validation';
import { serviceController } from './service.controller';
import { USER_ROLE } from '../user/user.interface';

export const serviceRouter = Router();

serviceRouter.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(serviceValidation.addService),
  serviceController.addService,
);
