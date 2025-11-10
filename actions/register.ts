"use server"

import * as z from 'zod';
import { RegisterSchema } from '@/schema';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);
  if (!validationFields.success) {
    return { error: "Invalid Fields!" };
  }
  return { success: "Email Sent!" };
};