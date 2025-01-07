import { z } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function wordCapitalize(words: string) {
  return words
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function removeEmptyProperty(payload: Record<string, any>) {
  return Object.keys(payload).reduce((acc: Record<string, any>, key) => {
    if (payload[key]) acc[key] = payload[key];
    return acc;
  }, {});
}

interface IZodEnumArgs {
  options: string[];
  message: string;
}

export function zodEnum({ options, message }: IZodEnumArgs) {
  return z.enum([...(options as [string, ...string[]])], { message });
}
