import { TObject } from '../../utils/type';
import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { referrerService } from './referrer.service';

const addReferrer = catchAsync(async (req, res) => {
  const message = await referrerService.addReferrer(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getReferrers = catchAsync(async (req, res) => {
  const { referrers, meta } = await referrerService.getReferrers(req.query as TObject);
  sendSuccessResponse(res, { message: 'Referrers retrieved successfully', meta, data: referrers });
});

const updateReferrer = catchAsync(async (req, res) => {
  const message = await referrerService.updateReferrer(req.body, req.params.referrerId);
  sendSuccessResponse(res, { message, data: null });
});

const deleteReferrer = catchAsync(async (req, res) => {
  const message = await referrerService.deleteReferrer(req.params.referrerId);
  sendSuccessResponse(res, { message, data: null });
});

const getReferrersList = catchAsync(async (req, res) => {
  const { meta, referrers } = await referrerService.getReferrersList(req.query as TObject);
  sendSuccessResponse(res, { message: 'Referrers list retrieved successfully', meta, data: referrers });
});

export const referrerController = { addReferrer, getReferrers, updateReferrer, deleteReferrer, getReferrersList };
