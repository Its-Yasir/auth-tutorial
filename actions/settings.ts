"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingSchema } from "@/schema";
import * as z from "zod";

export const settings = async (
  values: z.infer<typeof SettingSchema>
) => {
  const user = await currentUser();

  if(!user) {
    return {error:"Unauthrorized!"}
  }

  const dbUser = await getUserById(user.id as string);

  if(user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnable = undefined;
  }

  if(values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if(existingUser && existingUser.id !== user.id) {
      return {error: "Email alredy in use!"}
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Verification email sent!"
    }
  }

  if(!dbUser) {
    return {error: "Unauthorized!"}
  }

  await db.user.update({
    where:{id: dbUser.id},
    data:{
      ...values,
    }
  })

} 