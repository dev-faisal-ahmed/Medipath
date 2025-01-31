import { Router } from 'express';
import { authGuard } from '../../middlewares';
import { USER_ROLE } from '../user/user.interface';
import { overviewController } from './overview.controller';

export const overviewRouter = Router();

overviewRouter.get('/', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), overviewController.getOverview);
