import { z } from 'zod';
import { MODE } from '../../utils/type';

const addCategorySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  mode: z.nativeEnum(MODE),
});

export const categoryValidation = { addCategorySchema };

export type TAddCategoryPayload = z.infer<typeof addCategorySchema>;
