import { AppError } from '../../utils';
import { User } from '../user/user.model';
import { TLoginWithCredentialsPayload, TLoginWithGooglePayload } from './auth.validation';

async function loginWithCredentials(payload: TLoginWithCredentialsPayload) {
  const { userId, password } = payload;
  const user = await User.findOne({ userId });
  if (!user) throw new AppError('User not found', 404);

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) throw new AppError('Password does not match!', 400);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
}

async function loginWithGoogle(payload: TLoginWithGooglePayload) {
  const { userId } = payload;
  const user = await User.findOne({ userId });
  if (!user) throw new AppError('You are not authorized to login', 401);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
}

export const authService = { loginWithCredentials, loginWithGoogle };
