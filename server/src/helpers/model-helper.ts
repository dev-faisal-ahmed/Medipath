import { Schema } from 'mongoose';

export const transformJson = (_: unknown, ret: Record<string, unknown>) => {
  ret.id = (ret._id as Schema.Types.ObjectId).toString();
  delete ret._id;
  delete ret.__v;
  delete ret.updatedAt;
  return ret;
};
