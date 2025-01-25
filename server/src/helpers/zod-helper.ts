import { Types } from 'mongoose';
import { z } from 'zod';

interface IZodEnumArgs {
  options: string[];
  message: string;
}

export const zodEnum = ({ options, message }: IZodEnumArgs) => {
  return z.enum([...(options as [string, ...string[]])], { message });
};

export const zodMongoObjectId = (message: string = 'Invalid Object Id') => {
  return z.string().refine((val) => Types.ObjectId.isValid(val), { message });
};

// parsing date
const dateSchema = z.union([z.string().date(), z.string().datetime()]);
export const parseDate = (value: string) => {
  const { success } = dateSchema.safeParse(value);
  if (!success) return new Date();
  return new Date(value);
};
