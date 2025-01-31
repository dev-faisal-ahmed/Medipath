import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { TObject } from '../../utils/type';
import { overviewService } from './overview.service';

const getOverview = catchAsync(async (req, res) => {
  const result = await overviewService.getOverview(req.query as TObject);
  sendSuccessResponse(res, { message: 'Overview fetched successfully', data: result });
});

export const overviewController = { getOverview };
