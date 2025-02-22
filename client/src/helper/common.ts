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

export const errorMessageGen = (error: unknown, defaultMessage: string = 'Something went wrong') => {
  let message = defaultMessage;
  if (error instanceof AxiosError) message = error.response?.data?.message;
  else if (error instanceof Error) message = error.message;
  return message;
};

type TZodNumberArgs = { min: number; message: string };

export const zodNumber = ({ min, message }: TZodNumberArgs) => {
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

export const formatDate = (date: Date | string, type: 'date-month' | 'month' = 'date-month') => {
  if (type === 'date-month') return format(new Date(date), 'dd MMM, yyyy');
  return format(new Date(date), 'MMMM - yyyy');
};
