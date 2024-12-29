import { AppError } from '../../utils';
import { Service } from './service.model';
import { generateMeta, getPageParams, getPartialFilterParams } from '../../helpers';
import { TAddServicePayload } from './service.validation';

async function addService(payload: TAddServicePayload) {
  const isServiceExist = await Service.exists({ name: payload.name });
  if (isServiceExist) throw new AppError('Service already exists', 400);

  const service = await Service.create(payload);
  if (!service) throw new AppError('Service not created', 500);

  return 'Service added successfully';
}

async function getServices(query: Record<string, unknown>) {
  const { page, limit, skip } = getPageParams(query);
  const dbQuery = { isDeleted: false, ...getPartialFilterParams(query, 'name') };
  const total = await Service.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });
  const services = await Service.find(dbQuery, { updatedAt: 0, __v: 0, isDeleted: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return { services, meta };
}

export const serviceService = { addService, getServices };
