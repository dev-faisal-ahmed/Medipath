import { expenseCategoryService } from './expense-category.service';
import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { TObject } from '../../utils/type';

const addExpenseCategory = catchAsync(async (req, res) => {
  const message = await expenseCategoryService.addExpenseCategory(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getExpenseCategories = catchAsync(async (req, res) => {
  const { expenseCategories, meta } = await expenseCategoryService.getExpenseCategories(req.query as TObject);
  sendSuccessResponse(res, { message: 'Expense categories retrieved successfully', meta, data: expenseCategories });
});

const getExpenseCategoryList = catchAsync(async (_, res) => {
  const expenseCategories = await expenseCategoryService.getExpenseCategoryList();
  sendSuccessResponse(res, { message: 'Expense categories list retrieved successfully', data: expenseCategories });
});

export const expenseCategoryController = { addExpenseCategory, getExpenseCategories, getExpenseCategoryList };
