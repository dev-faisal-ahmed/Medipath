import { z } from 'zod';

interface IZodEnumArgs {
  options: string[];
  message: string;
}

export const zodEnum = ({ options, message }: IZodEnumArgs) => {
  return z.enum([...(options as [string, ...string[]])], { message });
};
