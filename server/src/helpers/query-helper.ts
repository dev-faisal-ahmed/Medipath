import { TObject } from '../utils/type';
import { IMeta } from './response-helper';

export function getPageParams(query: TObject, defaultLimit?: number) {
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

export function getSearchFilterQuery(query: TObject, ...fields: string[]) {
  const searchTerm = query.searchTerm;
  if (!searchTerm || fields.length === 0) return {};
  const searchFields = fields.map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } }));
  return { $or: searchFields };
}

export function getExactMatchQuery(query: TObject, ...fields: string[]) {
  const keys = Object.keys(query);
  if (!!keys.length) return {};

  return keys.reduce((acc: Record<string, any>, key) => {
    if (fields.includes(key)) acc[key] = query[key];
    return acc;
  }, {});
}

export function getPartialFilterQuery(query: TObject, ...fields: string[]) {
  return Object.keys(query).reduce((acc: Record<string, any>, key) => {
    if (fields.includes(key.toLowerCase())) acc[key] = { $regex: query[key], $options: 'i' };
    return acc;
  }, {});
}
