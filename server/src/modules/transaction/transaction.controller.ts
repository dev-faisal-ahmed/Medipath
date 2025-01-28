import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { transactionService } from './transaction.service';
import { TObject } from '../../utils/type';

const addExpense = catchAsync(async (req, res) => {
  const message = await transactionService.addExpense(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getMonthlyExpenses = catchAsync(async (req, res) => {
  const result = await transactionService.getMonthlyExpenses(req.query as TObject);
  sendSuccessResponse(res, { message: 'Expenses fetched', data: result });
});

const getReferrerExpense = catchAsync(async (req, res) => {
  const result = await transactionService.getReferrerExpenses(req.query as TObject);
  sendSuccessResponse(res, { message: 'Referrer expense fetched', data: result });
});

export const transactionController = { addExpense, getMonthlyExpenses, getReferrerExpense };
