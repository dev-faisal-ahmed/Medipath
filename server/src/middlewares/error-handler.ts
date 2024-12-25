import { NODE_ENV } from '../app/config';
import { ErrorRequestHandler } from 'express';
import { sendErrorResponse } from '../helpers';

interface IZodIssue {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

export const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  let status: number = error.status || 500;
  let message: string = error.message || 'something went wrong';

  // handling error for zod
  if (error.name === 'ZodError') {
    message = error.issues
      .map((issue: IZodIssue) => {
        const { code, expected, received, path, message } = issue;
        let msg: string = '';
        if (code === 'invalid_type') msg = `In ${path[0]} expected "${expected}" received "${received}"`;
        else msg = message;
        return msg;
      })
      .join(' | ');
  }

  const errorInfo = NODE_ENV === 'development' ? error : null;

  sendErrorResponse(res, { message, error: errorInfo, status });
};
