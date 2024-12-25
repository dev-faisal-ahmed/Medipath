import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { userService } from './user.service';

const addUser = catchAsync(async (req, res) => {
  const { password } = await userService.addUser(req.body);
  sendSuccessResponse(res, { message: 'User added successfully', data: { password } });
});

export const userController = { addUser };
