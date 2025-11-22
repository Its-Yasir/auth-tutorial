import { UserRole } from '@/lib/enums';
import * as z from 'zod';

export const SettingSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled : z.optional(z.boolean()),
  Role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.string().optional(),
  newPassword: z.string().optional(),
})
  .refine((data) => {
    // Treat empty strings as undefined
    const password = data.password === "" ? undefined : data.password;
    const newPassword = data.newPassword === "" ? undefined : data.newPassword;
    
    if(password && !newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New Password is requied!",
    path: ["newPassword"],
  })
  .refine((data) => {
    // Treat empty strings as undefined
    const password = data.password === "" ? undefined : data.password;
    const newPassword = data.newPassword === "" ? undefined : data.newPassword;
    
    if(!password && newPassword) {
      return false;
    } return true;
  } , {
    message: "Password is required!",
    path:["password"],  
  })
  .refine((data) => {
    // Validate password length only if it's not empty
    if(data.password && data.password !== "" && data.password.length < 6) {
      return false;
    }
    return true;
  }, {
    message: "Password must be at least 6 characters!",
    path: ["password"],
  })
  .refine((data) => {
    // Validate newPassword length only if it's not empty
    if(data.newPassword && data.newPassword !== "" && data.newPassword.length < 6) {
      return false;
    }
    return true;
  }, {
    message: "New Password must be at least 6 characters!",
    path: ["newPassword"],
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