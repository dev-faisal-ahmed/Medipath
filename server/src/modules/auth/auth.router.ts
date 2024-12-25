import { Router } from 'express';
import { validationHandler } from '../../middlewares';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

export const authRouter = Router();

authRouter.post(
  '/login/credentials',
  validationHandler(authValidation.loginWithCredentialsSchema),
  authController.loginWithCredentials,
);

authRouter.post(
  '/login/google',
  validationHandler(authValidation.loginWithGoogleSchema),
  authController.loginWithGoogle,
);
