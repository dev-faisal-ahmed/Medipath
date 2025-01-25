import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { USER_ROLE } from '../user/user.interface';
import { transactionController } from './transaction.controller';
import { transactionValidation } from './transaction.validation';

export const transactionRouter = Router();

transactionRouter.post(
  '/expense',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(transactionValidation.addExpenseSchema),
  transactionController.addExpense,
);

export const transactionsRouter = Router();

transactionsRouter.get(
  '/expenses/monthly',
  // authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  transactionController.getMonthlyExpenses,
);
