export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TServerResponse<TData> {
  ok: boolean;
  message: string;
  data: TData;
  meta?: TMeta;
}

export type TObject<TData = string> = Record<string, TData>;
