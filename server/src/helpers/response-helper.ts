import type { Response } from "express";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ISuccessResponse {
  message: string;
  meta?: IMeta;
  data: unknown;
}

export interface IErrorResponse {
  status: number;
  message: string;
  error: unknown;
}

export function sendSuccessResponse(res: Response, payload: ISuccessResponse) {
  const { message, meta, data } = payload;
  return res.status(200).json({ ok: true, message, meta, data });
}

export function sendErrorResponse(res: Response, payload: IErrorResponse) {
  const { status, message, error } = payload;
  return res.status(status).json({ ok: false, message, error });
}
