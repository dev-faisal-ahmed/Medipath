import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';
import { transactionService } from './transaction.service';

const addExpense = catchAsync(async (req, res) => {
  const message = await transactionService.addExpense(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const transactionController = { addExpense };
