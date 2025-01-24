import { sendSuccessResponse } from '../../helpers';
import { catchAsync } from '../../middlewares';
import { categoryService } from './category.service';

const addCategory = catchAsync(async (req, res) => {
  const message = await categoryService.addCategory(req.body);
  sendSuccessResponse(res, { message, data: null });
});

export const categoryController = { addCategory };
