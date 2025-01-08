import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { authService } from './auth.service';

const loginWithCredentials = catchAsync(async (req, res) => {
  const userInfo = await authService.loginWithCredentials(req.body);
  sendSuccessResponse(res, { message: 'Login successful', data: userInfo });
});

const loginWithGoogle = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginWithGoogle(req.body);
  res.cookie('refresh_token', refreshToken, { httpOnly: true });
  sendSuccessResponse(res, { message: 'Login successful', data: { accessToken } });
});

export const authController = { loginWithCredentials, loginWithGoogle };
