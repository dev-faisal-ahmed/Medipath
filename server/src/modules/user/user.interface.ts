import { Schema } from "mongoose";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum PROVIDER {
  CREDENTIALS = "CREDENTIALS",
  GOGGLE = "GOOGLE",
}

export interface IUser {
  _id: Schema.Types.ObjectId;
  userId: string;
  name: string;
  password?: string;
  role: USER_ROLE;
  provider: PROVIDER;
  isDeleted: boolean;
}
