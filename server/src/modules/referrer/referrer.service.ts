import { generateMeta, getExactMatchQuery, getPageParams, getSearchQuery } from '../../helpers';
import { TObject } from '../../utils/type';
import { Referrer } from './referrer.model';
import { TAddReferrerPayload } from './referrer.validation';

const addReferrer = async (payload: TAddReferrerPayload) => {
  await Referrer.create(payload);
  return 'Referrer added';
};

const getReferrers = async (query: TObject) => {
  const dbQuery = {
    isDeleted: false,
    ...getSearchQuery(query, 'name', 'designation', 'phone'),
    ...getExactMatchQuery(query, 'type'),
  };

  const { page, limit, skip } = getPageParams(query);
  const referrers = await Referrer.find(dbQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Referrer.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { referrers, meta };
};

export const referrerService = { addReferrer, getReferrers };
