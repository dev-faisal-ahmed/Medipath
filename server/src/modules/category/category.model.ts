import { model, Schema } from 'mongoose';
import { ICategory } from './category.interface';
import { MODE } from '../../utils/type';
import { MODEL } from '../model-names';
import { transformJson } from '../../helpers';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    mode: { type: String, enum: Object.values(MODE) },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const Category = model<ICategory>(MODEL.CATEGORY, categorySchema);
