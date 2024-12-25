import { AppError } from '../utils';
import { catchAsync } from './catch-async';
import { User } from '../modules/user/user.model';
import { USER_ROLE } from '../modules/user/user.interface';

const BEARER = 'bearer';

export function authGuard(...requiredRoles: USER_ROLE[]) {
  return catchAsync(async (req, _, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new AppError('No token found', 404);

    const [bearer, token] = accessToken.split(' ');
    if (BEARER !== bearer.toLowerCase() || !token) throw new AppError('Invalid token formate', 400);

    const decodedUser = User.verifyAccessToken(token);
    if (!decodedUser) throw new AppError('Invalid token', 400);

    const { email } = decodedUser;
    const isUserExist = await User.findOne({ email }, { _id: 1, email: 1, role: 1 });

    if (!isUserExist) throw new AppError('User not found', 404);

    if (requiredRoles.length && !requiredRoles.includes(isUserExist.role))
      throw new AppError('You are not authorized to access this route', 403);

    req.user = isUserExist;
    next();
  });
}
