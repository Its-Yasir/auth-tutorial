import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4} from "uuid"
import crypto from 'crypto'
import { db } from "./db";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorTokenByEmail = async (
  email: string
) => {
  const token = crypto.randomInt(100_000, 1000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email);
  if(existingToken) {
    await db.twoFactorToken.delete({
      where:{
        id: existingToken.id
      }
    })
  };
  
  const twoFactorToken = await db.twoFactorToken.create({
    data:{
      email,
      token,
      expires
    }
  })
  return twoFactorToken;  
};


export const generatePasswordResetToken = async (email:string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 100)

  const existingToken = await db.passwordResetToken.findFirst({
    where:{email}
  });

  if(existingToken) {
    await db.passwordResetToken.delete({
      where:{id:existingToken.id}
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data:{
      token,
      expires,
      email,
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (
  email: string
) => {
  const token = uuidv4();
  const existingToken = await getVerificationTokenByEmail(email);
  const expires = new Date(new Date().getTime() + 3600 * 100)

  if(existingToken) {
    await db.verificationToken.delete({
      where:{ id: existingToken.id }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  })
  return verificationToken;
} 