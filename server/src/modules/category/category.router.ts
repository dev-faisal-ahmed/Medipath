import { Router } from 'express';
import { authGuard, validationHandler } from '../../middlewares';
import { USER_ROLE } from '../user/user.interface';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

export const categoryRouter = Router();

categoryRouter.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  validationHandler(categoryValidation.addCategorySchema),
  categoryController.addCategory,
);

export const categoriesRouter = Router();

categoriesRouter.get('/', authGuard(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), categoryController.getCategories);
