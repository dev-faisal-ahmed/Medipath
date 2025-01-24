import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { authService } from './auth.service';

const loginWithCredentials = catchAsync(async (req, res) => {
  const userInfo = await authService.loginWithCredentials(req.body);
  sendSuccessResponse(res, { message: 'Login successful', data: userInfo });
});

const loginWithGoogle = catchAsync(async (req, res) => {
  const user = await authService.loginWithGoogle(req.body);
  sendSuccessResponse(res, { message: 'Login successful', data: user });
});

export const authController = { loginWithCredentials, loginWithGoogle };
