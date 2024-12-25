import { AnyZodObject, ZodEffects } from 'zod';
import { catchAsync } from './catch-async';

export function validationHandler(schema: AnyZodObject | ZodEffects<AnyZodObject>) {
  return catchAsync(async (req, _, next) => {
    const payload = await schema.parseAsync(req.body);
    req.body = payload;
    next();
  });
}
