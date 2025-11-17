"use server"

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schema"
import z from "zod";



export const reset  = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if(!validatedFields.success) {
    return {error: 'Ivalid Email!'}
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if(!existingUser) {
    return {error: 'Email does not exist!'}
  }

  //TODO Generate Token and send email  

  return {success: 'Reset Email sent!'}
}