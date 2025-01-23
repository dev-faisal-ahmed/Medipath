import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { expenseCategoryController } from './expense-category.controller';
import { expenseCategoryValidation } from './expense-category.validation';
import { USER_ROLE } from '../user/user.interface';

export const expenseCategoryRouter = Router();

expenseCategoryRouter.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(expenseCategoryValidation.addExpenseCategory),
  expenseCategoryController.addExpenseCategory,
);

export const expenseCategoriesRouter = Router();

expenseCategoriesRouter.get(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  expenseCategoryController.getExpenseCategories,
);
