import { AppError } from '../../utils';
import { Service } from './service.model';
import { generateMeta, getPageParams, getSearchQuery } from '../../helpers';
import { TAddServicePayload, TUpdateServicePayload } from './service.validation';
import { TObject } from '../../utils/type';

const addService = async (payload: TAddServicePayload) => {
  const isServiceExist = await Service.exists({ name: payload.name });
  if (isServiceExist) throw new AppError('Service already exists', 400);

  const service = await Service.create(payload);
  if (!service) throw new AppError('Service not created', 500);

  return 'Service added successfully';
};

const getServices = async (query: TObject) => {
  const dbQuery = { isDeleted: false, ...getSearchQuery(query, 'name') };
  const { page, limit, skip } = getPageParams(query);

  const services = await Service.find(dbQuery, { updatedAt: 0 }).sort({ name: 1 }).skip(skip).limit(limit);

  const total = await Service.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { services, meta };
};

const updateService = async (payload: TUpdateServicePayload, serviceId: string) => {
  await Service.updateOne({ _id: serviceId }, { $set: payload });
  return 'Service Updated';
};

const deleteService = async (serviceId: string) => {
  await Service.updateOne({ _id: serviceId }, { $set: { isDeleted: true } });
  return 'Service Deleted';
};

// for add bill page
const getServiceList = async (query: TObject) => {
  const dbQuery = { isDeleted: false, ...getSearchQuery(query, 'name') };
  const services = await Service.find(dbQuery, { _id: 1, name: 1, price: 1, roomNo: 1 }).sort({ name: 1 });
  return services;
};

export const serviceService = { addService, getServices, updateService, deleteService, getServiceList };
