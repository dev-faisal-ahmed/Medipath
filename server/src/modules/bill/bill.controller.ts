import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { billService } from './bill.service';

const addBill = catchAsync(async (req, res) => {
  const { billId } = await billService.addBill(req.body);
  sendSuccessResponse(res, { message: 'Bill added successfully', data: { billId } });
});

const getBillDetails = catchAsync(async (req, res) => {
  const billDetails = await billService.getBillDetails(req.params.billId);
  sendSuccessResponse(res, { message: 'Bill details retrieved successfully', data: billDetails });
});

export const billController = { addBill, getBillDetails };
