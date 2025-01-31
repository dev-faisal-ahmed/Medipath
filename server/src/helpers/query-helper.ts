import { TObject } from '../utils/type';
import { IMeta } from './response-helper';

export const getPageParams = (query: TObject, defaultLimit?: number) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || defaultLimit || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

interface IGenerateMetaArgs {
  page: number;
  limit: number;
  total: number;
}

export const generateMeta = ({ page, limit, total }: IGenerateMetaArgs): IMeta => {
  const totalPages = Math.ceil(total / limit);
  return { page, limit, total, totalPages };
};

export const getSearchQuery = (query: TObject, ...fields: string[]) => {
  const searchTerm = query.searchTerm;
  if (!searchTerm || fields.length === 0) return {};
  const searchFields = fields.map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } }));
  return { $or: searchFields };
};

export const getExactMatchQuery = (query: TObject, ...fields: string[]) => {
  const keys = Object.keys(query);
  if (!keys.length) return {};

  return keys.reduce((acc: Record<string, any>, key) => {
    if (fields.includes(key)) acc[key] = query[key];
    return acc;
  }, {});
};

export const getPartialFilterQuery = (query: TObject, ...fields: string[]) => {
  return Object.keys(query).reduce((acc: Record<string, any>, key) => {
    if (fields.includes(key.toLowerCase())) acc[key] = { $regex: query[key], $options: 'i' };
    return acc;
  }, {});
};

const OFFSET = 6 * 60 * 1000; // 6 * 60 * 1000;
export const getMonthRangeQuery = (year: number, month: number) => {
  // Start of the month
  const startDate = new Date(year, month, 1);
  const startTimeInBangladesh = new Date(startDate.getTime() + OFFSET);
  startTimeInBangladesh.setHours(0, 0, 0, 0);

  // End of the month
  const endDate = new Date(year, month + 1, 0); // Day 0 of the next month is the last day of the current month
  const endTimeInBangladesh = new Date(endDate.getTime() + OFFSET);
  endTimeInBangladesh.setHours(23, 59, 59, 999);

  return { $gte: startTimeInBangladesh, $lte: endTimeInBangladesh };
};

export const getDateRangeQuery = (date: Date) => {
  // to convert bangladeshi time zone
  const startDate = new Date(date.getTime() + OFFSET);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date.getTime() + OFFSET);
  endDate.setHours(23, 59, 59, 999);

  return { $gte: startDate, $lte: endDate };
};
