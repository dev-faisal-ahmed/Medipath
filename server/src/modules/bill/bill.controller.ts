import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { TObject } from '../../utils/type';
import { billService } from './bill.service';

const addBill = catchAsync(async (req, res) => {
  const { billId } = await billService.addBill(req.body);
  sendSuccessResponse(res, { message: 'Bill added successfully', data: { billId } });
});

const getBills = catchAsync(async (req, res) => {
  const { bills, meta } = await billService.getBills(req.query as TObject);
  sendSuccessResponse(res, { message: 'Bill retrieved successfully', meta, data: bills });
});

const getBillDetails = catchAsync(async (req, res) => {
  const billDetails = await billService.getBillDetails(req.params.billId);
  sendSuccessResponse(res, { message: 'Bill details retrieved successfully', data: billDetails });
});

const takeDue = catchAsync(async (req, res) => {
  const message = await billService.takeDue(req.body, req.params.billId);
  sendSuccessResponse(res, { message, data: null });
});

export const billController = { addBill, getBills, getBillDetails, takeDue };
