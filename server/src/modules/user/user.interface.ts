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
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  password?: string;
  role: USER_ROLE;
  provider: PROVIDER;
  isDeleted: boolean;
}

export interface IUserMethods {
  comparePassword(givenPassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  verifyAccessToken(token: string): TAccessTokenData;
  verifyRefreshToken(token: string): TRefreshTokenData;
}

export type TAccessTokenData = Pick<IUser, '_id' | 'email' | 'name' | 'role' | 'provider'>;
export type TRefreshTokenData = Pick<IUser, '_id' | 'email'>;
