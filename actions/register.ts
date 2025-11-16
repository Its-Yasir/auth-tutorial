"use server"

import * as z from 'zod';
import bcrypt from "bcryptjs";
import { RegisterSchema } from '@/schema';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationFields = RegisterSchema.safeParse(values);
  if (!validationFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where:{
      email,
    },
  })

  if(existingUser){
    return {
      error: "Email already taken!"
    }
  }

  await db.user.create({
    data:{
      name, 
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email);
  
  sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )

  return { success: "Verification email sent!" };
};