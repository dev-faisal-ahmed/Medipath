import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { billService } from './bill.service';

const addBill = catchAsync(async (req, res) => {
  const { billId } = await billService.addBill(req.body);
  sendSuccessResponse(res, { message: 'Bill added successfully', data: { billId } });
});

export const billController = { addBill };
