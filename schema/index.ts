import { UserRole } from '@/lib/generated/prisma/enums';
import * as z from 'zod';

export const SettingSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled : z.optional(z.boolean()),
  Role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if(data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New Password is requied!",
    path: ["newPassword"],
  })
  .refine((data) => {
    if(!data.password && data.newPassword) {
      return false;
    } return true;
  } , {
    message: "Password is required!",
    path:["password"],  
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