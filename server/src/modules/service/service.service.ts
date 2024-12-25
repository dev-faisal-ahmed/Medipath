import { AppError } from '../../utils';
import { Service } from './service.model';
import { TAddServicePayload } from './service.validation';

async function addService(payload: TAddServicePayload) {
  const isServiceExist = await Service.exists({ name: payload.name });
  if (isServiceExist) throw new AppError('Service already exists', 400);

  const service = await Service.create(payload);
  if (!service) throw new AppError('Service not created', 500);

  return 'Service added successfully';
}

export const serviceService = { addService };
