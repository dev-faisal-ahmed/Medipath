import { TServerResponse } from '@/types';
import { GetNextPageParamFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { z } from 'zod';

export const removeEmptyProperty = (payload: Record<string, unknown>) => {
  return Object.keys(payload).reduce((acc: Record<string, unknown>, key) => {
    if (payload[key]) acc[key] = payload[key];
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
  return z.string().refine((value) => !value || Number(value) >= min, { message });
};

export const generateNextPageParams = (): GetNextPageParamFunction<number, TServerResponse<unknown>> => {
  return (lastPage) => {
    if (!lastPage) return undefined;

    const currentPage = lastPage.meta?.page || 1;
    const totalPages = lastPage.meta?.totalPages || 1;

    if (totalPages > currentPage) return currentPage + 1;
    return undefined;
  };
};

export const hasPreviousMonth = ({ currentDate, targetDate }: { currentDate: Date; targetDate: Date }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  if (currentYear > targetYear) return true;
  if (currentYear === targetYear && currentMonth > targetMonth) return true;

  return false;
};

export const hasNextMonth = ({ currentDate, targetDate }: { currentDate: Date; targetDate: Date }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  if (currentYear < targetYear) return true;
  if (currentYear === targetYear && currentMonth < targetMonth) return true;

  return false;
};

export const getDateForQueryKey = (date: Date) => {
  const [datePart] = date.toISOString().split('T');
  return datePart;
};

export const formatDate = (date: Date | string) => format(new Date(date), 'dd MMM, yyyy');
