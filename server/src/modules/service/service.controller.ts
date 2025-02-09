import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { serviceService } from './service.service';
import { TObject } from '../../utils/type';

const addService = catchAsync(async (req, res) => {
  const message = await serviceService.addService(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getServices = catchAsync(async (req, res) => {
  const { meta, services } = await serviceService.getServices(req.query as TObject);
  sendSuccessResponse(res, { message: 'Services retrieved successfully', data: services, meta });
});

const updateService = catchAsync(async (req, res) => {
  const message = await serviceService.updateService(req.body, req.params.serviceId);
  sendSuccessResponse(res, { message, data: null });
});

const deleteService = catchAsync(async (req, res) => {
  const message = await serviceService.deleteService(req.params.serviceId);
  sendSuccessResponse(res, { message, data: null });
});

const getServiceList = catchAsync(async (req, res) => {
  const services = await serviceService.getServiceList(req.query as TObject);
  sendSuccessResponse(res, { message: 'Service list retrieved successfully', data: services });
});

export const serviceController = { addService, getServices, updateService, deleteService, getServiceList };
