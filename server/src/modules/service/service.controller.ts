import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { serviceService } from './service.service';

const addService = catchAsync(async (req, res) => {
  const message = await serviceService.addService(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getServices = catchAsync(async (req, res) => {
  const { meta, services } = await serviceService.getServices(req.query);
  sendSuccessResponse(res, { message: 'Services retrieved successfully', data: { meta, services } });
});

export const serviceController = { addService, getServices };
