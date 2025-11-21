import * as z from 'zod';

export const SettingSchema = z.object({
  name: z.optional(z.string()),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6,{
    message:"Password is required!"
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message:"Email is required!"
  }),
});
export const LoginSchema = z.object({
  email: z.string().email({
    message:"Email is required!"
  }),
  password: z.string().min(1,{
    message:"Password is required!"
  }),
  code: z.optional(z.string()),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message:"Email is required!"
  }),
  password: z.string().min(6,{
    error:"6 characters required in password!"
  }),
  name: z.string({
    error:"Name is required!"
  })
});