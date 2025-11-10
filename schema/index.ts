import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Email is required!"
  }),
  password: z.string().min(1,{
    message:"Password is required!"
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message:"Email is required!"
  }).min(6,{
    error:"6 characters required in password!"
  }),
  password: z.string().min(1,{
    message:"Password is required!"
  }),
  name: z.string({
    error:"Name is required!"
  })
});