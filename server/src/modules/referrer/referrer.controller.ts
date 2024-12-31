import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { referrerService } from './referrer.service';

const addReferrer = catchAsync(async (req, res) => {
  const message = await referrerService.addReferrer(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const referrerController = { addReferrer };
