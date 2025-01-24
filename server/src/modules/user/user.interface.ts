import { Model, Schema } from 'mongoose';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum PROVIDER {
  CREDENTIALS = 'CREDENTIALS',
  GOGGLE = 'GOOGLE',
}

export interface IUser {
  id: Schema.Types.ObjectId;
  email: string;
  name: string;
  password?: string;
  role: USER_ROLE;
  provider: PROVIDER;
  isDeleted: boolean;
}

export interface IUserMethods {
  comparePassword(givenPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  verifyAccessToken(token: string): TAccessTokenData;
}

export type TAccessTokenData = Pick<IUser, 'id' | 'email' | 'name' | 'role' | 'provider'>;
