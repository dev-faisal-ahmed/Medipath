import { categoryService } from './category.service';
import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { TObject } from '../../utils/type';

const addCategory = catchAsync(async (req, res) => {
  const message = await categoryService.addCategory(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories(req.query as TObject);
  sendSuccessResponse(res, { message: 'Categories retrieved successfully', data: categories });
});

const updateCategory = catchAsync(async (req, res) => {
  const message = await categoryService.updateCategory(req.body, req.params.categoryId);
  sendSuccessResponse(res, { message, data: null });
});

export const categoryController = { addCategory, getCategories, updateCategory };
