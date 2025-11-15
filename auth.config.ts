import Credentials from "next-auth/providers/credentials"; 
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schema"; 
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default { providers: [
  Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);
      if(!validatedFields.success) {
        return null;
      }

      const { email, password } = validatedFields.data;

      const user = await getUserByEmail(email);

      if(!user || !user.password) return null;

      const passwordMatched = await bcrypt.compare(
        password, 
        user.password
      ); 

      if(passwordMatched) {
        return user;
      }

      return null;
    }
  })
] } satisfies NextAuthConfig