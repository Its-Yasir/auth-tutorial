"use server"

import * as z from 'zod';
import { LoginSchema } from '@/schema';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validationFields = LoginSchema.safeParse(values);
  if (!validationFields.success) {
    return { error: "Invalid Fields!" };
  }
  return { success: "Email Sent!" };
};