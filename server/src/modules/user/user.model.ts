import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUser, IUserMethods, PROVIDER, TAccessTokenData, IUserModel, USER_ROLE } from './user.interface';
import { CallbackError, model, Schema } from 'mongoose';
import { ACCESS_TOKEN_SECRET } from '../../app/config';
import { MODEL } from '../model-names';
import { transformJson } from '../../helpers';

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String },
    role: { type: String, enum: Object.values(USER_ROLE), default: USER_ROLE.ADMIN },
    provider: { type: String, enum: Object.values(PROVIDER), default: PROVIDER.CREDENTIALS },
    isDeleted: { type: Boolean, default: false },
  },
  {
    methods: {
      comparePassword: async function (givenPassword: string) {
        if (this.provider !== PROVIDER.CREDENTIALS) return false;
        const isPasswordMatch = await bcrypt.compare(givenPassword, this.password!);
        return isPasswordMatch;
      },
    },
    statics: {
      verifyAccessToken: function (token: string) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET!) as TAccessTokenData;
      },
    },
    timestamps: true,
    toJSON: { transform: transformJson },
  },
);

// hooks
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    if (this.password) this.password = await bcrypt.hash(this.password, 6);
    return next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

export const User = model<IUser, IUserModel>(MODEL.USER, userSchema);
