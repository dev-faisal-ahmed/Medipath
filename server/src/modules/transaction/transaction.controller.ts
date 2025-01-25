import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { transactionService } from './transaction.service';
import { TObject } from '../../utils/type';

const addExpense = catchAsync(async (req, res) => {
  const message = await transactionService.addExpense(req.body);
  sendSuccessResponse(res, { message, data: null });
});

const getMonthlyExpenses = catchAsync(async (req, res) => {
  const { expenses, firstExpenseDate, lastExpenseDate } = await transactionService.getMonthlyExpenses(
    req.query as TObject,
  );
  sendSuccessResponse(res, { message: 'Expenses fetched', data: { firstExpenseDate, lastExpenseDate, expenses } });
});

export const transactionController = { addExpense, getMonthlyExpenses };
