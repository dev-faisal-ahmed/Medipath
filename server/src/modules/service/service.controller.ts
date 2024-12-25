import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { serviceService } from './service.service';

const addService = catchAsync(async (req, res) => {
  const message = await serviceService.addService(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const serviceController = { addService };
