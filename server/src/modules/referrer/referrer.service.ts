import { Referrer } from './referrer.model';
import { TAddReferrerPayload } from './referrer.validation';

async function addReferrer(payload: TAddReferrerPayload) {
  await Referrer.create(payload);
  return 'Referrer added';
}

export const referrerService = { addReferrer };
