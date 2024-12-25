import { Router } from 'express';
import { validationHandler } from '../../middlewares';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

export const userRouter = Router();

userRouter.post('/', validationHandler(userValidation.addUserSchema), userController.addUser);
