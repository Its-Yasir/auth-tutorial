"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingSchema } from "@/schema";
import * as z from "zod";

export const settings = async (
  values: z.infer<typeof SettingSchema>
) => {
  const user = await currentUser();

  if(!user) {
    return {error:"Unauthrorized!"}
  }

  const dbUser = await getUserById(user.id);

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