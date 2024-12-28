import { IMeta } from './response-helper';

export function getPageParams(query: Record<string, unknown>, defaultLimit?: number) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

interface IGenerateMetaArgs {
  page: number;
  limit: number;
  total: number;
}

export function generateMeta({ page, limit, total }: IGenerateMetaArgs): IMeta {
  const totalPages = Math.ceil(total / limit);
  return { page, limit, total, totalPages };
}

export function getPartialFilterParams(query: Record<string, unknown>, ...fields: string[]) {
  return Object.keys(query).reduce((acc: Record<string, any>, key) => {
    if (fields.includes(key.toLowerCase())) acc[key] = { $regex: query[key], $options: 'i' };
    return acc;
  }, {});
}
