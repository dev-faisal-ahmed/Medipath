export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IServerResponse<IData> {
  ok: boolean;
  message: string;
  data: IData;
  meta?: IMeta;
}
