import { AppError } from '../../utils';
import { Service } from './service.model';
import { generateMeta, getPageParams, getSearchQuery } from '../../helpers';
import { TAddServicePayload, TUpdateServicePayload } from './service.validation';
import { TObject } from '../../utils/type';

async function addService(payload: TAddServicePayload) {
  const isServiceExist = await Service.exists({ name: payload.name });
  if (isServiceExist) throw new AppError('Service already exists', 400);

  const service = await Service.create(payload);
  if (!service) throw new AppError('Service not created', 500);

  return 'Service added successfully';
}

async function getServices(query: TObject) {
  const dbQuery = { isDeleted: false, ...getSearchQuery(query, 'name') };
  const { page, limit, skip } = getPageParams(query);

  const services = await Service.find(dbQuery, { updatedAt: 0, __v: 0, isDeleted: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { services, meta };
}

async function updateService(payload: TUpdateServicePayload, serviceId: string) {
  await Service.updateOne({ _id: serviceId }, { $set: payload });
  return 'Service Updated';
}

async function deleteService(serviceId: string) {
  await Service.updateOne({ _id: serviceId }, { $set: { isDeleted: true } });
  return 'Service Deleted';
}

export const serviceService = { addService, getServices, updateService, deleteService };
