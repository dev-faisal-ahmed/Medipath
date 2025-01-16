import { AppError } from '../../utils';
import { User } from '../user/user.model';
import { TLoginWithCredentialsPayload, TLoginWithGooglePayload } from './auth.validation';

const loginWithCredentials = async (payload: TLoginWithCredentialsPayload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }, { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });
  if (!user) throw new AppError('User not found', 404);

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) throw new AppError('Password does not match!', 400);

  const { password: _, ...restInfo } = user.toObject();
  return restInfo;
};

const loginWithGoogle = async (payload: TLoginWithGooglePayload) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('You are not authorized to login', 401);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
};

export const authService = { loginWithCredentials, loginWithGoogle };
