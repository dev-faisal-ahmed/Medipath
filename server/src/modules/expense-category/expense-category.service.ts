import { generateMeta, getPageParams, getSearchQuery } from '../../helpers';
import { AppError } from '../../utils';
import { TObject } from '../../utils/type';
import { ExpenseCategory } from './expense-category.model';
import { TAddExpenseCategoryPayload } from './expense-category.validation';

const addExpenseCategory = async (payload: TAddExpenseCategoryPayload) => {
  const isExpenseCategoryExist = await ExpenseCategory.exists({ name: payload.name });
  if (isExpenseCategoryExist) throw new AppError('Expense category already exists', 400);

  const expenseCategory = await ExpenseCategory.create(payload);
  if (!expenseCategory) throw new AppError('Expense category not created', 400);

  return 'Expense category added';
};

const getExpenseCategories = async (query: TObject) => {
  const dbQuery = { isDeleted: false, ...getSearchQuery(query, 'name') };
  const { page, limit, skip } = getPageParams(query);

  const expenseCategories = await ExpenseCategory.find(dbQuery, { updatedAt: 0, __v: 0, isDeleted: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await ExpenseCategory.countDocuments(dbQuery);
  const meta = generateMeta({ page, limit, total });

  return { expenseCategories, meta };
};

export const expenseCategoryService = { addExpenseCategory, getExpenseCategories };
