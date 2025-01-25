import { AppError } from '../../utils';
import { TObject } from '../../utils/type';
import { Category } from './category.model';
import { TAddCategoryPayload } from './category.validation';

const addCategory = async (payload: TAddCategoryPayload) => {
  const isCategoryExist = await Category.exists({ name: payload.name });
  if (isCategoryExist) throw new AppError('Category already exists', 400);
  await Category.create(payload);

  return 'Category added';
};

const getCategories = async (query: TObject) => {
  const mode = query.mode;
  const categories = await Category.find({ isDeleted: false, mode }, { isDeleted: 0 });
  return categories;
};

export const categoryService = { addCategory, getCategories };
