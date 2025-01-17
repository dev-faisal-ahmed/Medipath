import { generateMeta, getExactMatchQuery, getPageParams, getSearchQuery } from '../../helpers';
import { TAddReferrerPayload, TUpdateReferrerPayload } from './referrer.validation';
import { TObject } from '../../utils/type';
import { Referrer } from './referrer.model';

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

const updateReferrer = async (payload: TUpdateReferrerPayload, referrerId: string) => {
  await Referrer.updateOne({ _id: referrerId }, { $set: payload });
  return 'Referrer updated';
};

const deleteReferrer = async (referrerId: string) => {
  await Referrer.deleteOne({ _id: referrerId });
  return 'Referrer Deleted';
};

// this will used to get referrer list on abb bill page
const getReferrersList = async (query: TObject) => {
  const dbQuery = {
    isDeleted: false,
    ...getSearchQuery(query, 'name', 'phone'),
    ...getExactMatchQuery(query, 'type'),
  };

  const { page, limit, skip } = getPageParams(query);

  const referrers = await Referrer.find(dbQuery, { _id: 1, name: 1, type: 1 })
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit);
  const total = await Referrer.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { referrers, meta };
};

export const referrerService = { addReferrer, getReferrers, updateReferrer, deleteReferrer, getReferrersList };
