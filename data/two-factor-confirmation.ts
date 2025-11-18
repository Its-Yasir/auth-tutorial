import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (UserId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { UserId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
