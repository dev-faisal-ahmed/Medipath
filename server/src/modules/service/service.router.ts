import { Router } from 'express';
import { validationHandler } from '../../middlewares';
import { serviceValidation } from './service.validation';
import { serviceController } from './service.controller';

export const serviceRouter = Router();

serviceRouter.post('/', validationHandler(serviceValidation.addService), serviceController.addService);
