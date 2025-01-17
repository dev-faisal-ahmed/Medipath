import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { USER_ROLE } from '../user/user.interface';
import { referrerValidation } from './referrer.validation';
import { referrerController } from './referrer.controller';

export const referrerRouter = Router();

referrerRouter.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(referrerValidation.addReferrerSchema),
  referrerController.addReferrer,
);

referrerRouter.patch(
  '/:referrerId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(referrerValidation.updateReferrerSchema),
  referrerController.updateReferrer,
);

referrerRouter.delete(
  '/:referrerId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  referrerController.deleteReferrer,
);

export const referrersRouter = Router();

referrersRouter.get('/', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), referrerController.getReferrers);
