import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { expenseCategoryService } from './expense-category.service';

const addExpenseCategory = catchAsync(async (req, res) => {
  const message = await expenseCategoryService.addExpenseCategory(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const expenseCategoryController = { addExpenseCategory };
