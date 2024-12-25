import { Router } from 'express';
import { USER_ROLE } from './user.interface';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
import { authGuard, validationHandler } from '../../middlewares';

export const userRouter = Router();

userRouter.post(
  '/',
  authGuard(USER_ROLE.SUPER_ADMIN),
  validationHandler(userValidation.addUserSchema),
  userController.addUser,
);
