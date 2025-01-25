import { z } from 'zod';
import { MODE } from '../../utils/type';

const addCategorySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  mode: z.nativeEnum(MODE),
});

const updateCategorySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
});

export const categoryValidation = { addCategorySchema, updateCategorySchema };

export type TAddCategoryPayload = z.infer<typeof addCategorySchema>;
export type TUpdateCategoryPayload = z.infer<typeof updateCategorySchema>;
