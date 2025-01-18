import { IServerResponse } from '@/types';
import { GetNextPageParamFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

export const removeEmptyProperty = (payload: Record<string, unknown>) => {
  return Object.keys(payload).reduce((acc: Record<string, unknown>, key) => {
    if (payload[key]) acc[key] = JSON.stringify(payload[key]);
    return acc;
  }, {});
};

export const wordCapitalize = (words: string) => {
  return words
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const errorMessageGen = (error: unknown, defaultMessage: string = 'Something went wrong') => {
  let message = defaultMessage;
  console.log(typeof error);
  if (error instanceof AxiosError) message = error.response?.data?.message;
  else if (error instanceof Error) message = error.message;
  return message;
};

interface IZodNumberArgs {
  min: number;
  message: string;
}

export const zodNumber = ({ min, message }: IZodNumberArgs) => {
  return z.string().refine((value) => value && Number(value) >= min, { message });
};

export const generateNextPageParams = (): GetNextPageParamFunction<number, IServerResponse<unknown>> => {
  return (lastPage) => {
    if (!lastPage) return undefined;

    const currentPage = lastPage.meta?.page || 1;
    const totalPages = lastPage.meta?.totalPages || 1;

    if (totalPages > currentPage) return currentPage + 1;
    return undefined;
  };
};
