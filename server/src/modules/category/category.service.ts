import { AppError } from '../../utils';
import { Category } from './category.model';
import { TAddCategoryPayload } from './category.validation';

const addCategory = async (payload: TAddCategoryPayload) => {
  const isCategoryExist = await Category.exists({ name: payload.name });
  if (isCategoryExist) throw new AppError('Category already exists', 400);
  await Category.create(payload);

  return 'Category added';
};

export const categoryService = { addCategory };
