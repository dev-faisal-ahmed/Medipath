import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CallbackError, Schema } from "mongoose";
import { IUser, PROVIDER, USER_ROLE } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: Object.values(USER_ROLE), default: USER_ROLE.ADMIN },
    provider: { type: String, enum: Object.values(PROVIDER), default: PROVIDER.CREDENTIALS },
    isDeleted: { type: Boolean, default: false },
  },
  {
    methods: {
      comparePassword: async function (givenPassword: string) {
        if (this.provider === PROVIDER.CREDENTIALS) {
          const isPasswordMatch = await bcrypt.compare(this.password!, givenPassword);
          return isPasswordMatch;
        }
      },
      generateAccessToken: async function () {
        return;
      },
    },
    statics: {},
    timestamps: true,
  }
);

// hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 50);
      return next();
    }
  } catch (error) {
    return next(error as CallbackError);
  }
});
