import { IUser } from './modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: Pick<IUser, 'id' | 'email' | 'role'>;
    }
  }
}
