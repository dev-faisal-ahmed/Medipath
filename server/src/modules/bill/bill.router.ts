import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { USER_ROLE } from '../user/user.interface';
import { billController } from './bill.controller';
import { billValidation } from './bill.validation';

export const billRouter = Router();

billRouter.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(billValidation.addBillSchema),
  billController.addBill,
);

// billRouter.get('/:billId', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), billController.getBillDetails);
billRouter.get('/:billId', billController.getBillDetails);
