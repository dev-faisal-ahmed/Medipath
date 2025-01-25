import { AppError } from '../../utils';
import { TObject } from '../../utils/type';
import { Category } from './category.model';
import { TAddCategoryPayload, TUpdateCategoryPayload } from './category.validation';

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

const updateCategory = async (payload: TUpdateCategoryPayload, categoryId: string) => {
  const category = await Category.exists({ _id: categoryId });
  if (!category) throw new AppError('Category not found', 400);

  await Category.updateOne({ _id: categoryId }, { $set: payload });
  return 'Category updated';
};

const deleteCategory = async (categoryId: string) => {
  await Category.updateOne({ _id: categoryId }, { $set: { isDeleted: true } });
  return 'Category deleted';
};

export const categoryService = { addCategory, getCategories, updateCategory, deleteCategory };
