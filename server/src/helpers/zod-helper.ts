import { Types } from 'mongoose';
import { z } from 'zod';

interface IZodEnumArgs {
  options: string[];
  message: string;
}

export function zodEnum({ options, message }: IZodEnumArgs) {
  return z.enum([...(options as [string, ...string[]])], { message });
}

export function zodMongoObjectId(message: string = 'Invalid Object Id') {
  return z.string().refine((val) => Types.ObjectId.isValid(val), { message });
}
