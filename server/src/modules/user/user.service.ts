import { User } from './user.model';
import { AppError } from '../../utils';
import { userHelper } from './user.helper';
import { PROVIDER } from './user.interface';
import { TAddUserPayload } from './user.validation';

async function addUser(payload: TAddUserPayload) {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) throw new AppError('User already exists', 400);
  let password: string = '';

  if (payload.provider === PROVIDER.CREDENTIALS) {
    password = userHelper.generateRandomPassword();
    payload.password = password;
  }

  const user = await User.create({ ...payload });
  if (!user) throw new AppError('User not created', 400);

  return { password };
}

export const userService = { addUser };
