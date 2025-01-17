import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyProperty = (payload: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(payload).reduce((acc: Record<string, any>, key) => {
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
