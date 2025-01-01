import { generateMeta, getExactMatchQuery, getPageParams, getSearchFilterQuery } from '../../helpers';
import { TObject } from '../../utils/type';
import { Referrer } from './referrer.model';
import { TAddReferrerPayload } from './referrer.validation';

async function addReferrer(payload: TAddReferrerPayload) {
  await Referrer.create(payload);
  return 'Referrer added';
}

async function getReferrers(query: TObject) {
  const dbQuery = {
    isDeleted: false,
    ...getSearchFilterQuery(query, 'name', 'designation', 'phone'),
    ...getExactMatchQuery(query, 'type'),
  };

  const { page, limit, skip } = getPageParams(query);
  const referrers = await Referrer.find(dbQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Referrer.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { referrers, meta };
}

export const referrerService = { addReferrer, getReferrers };
