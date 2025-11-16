import Credentials from "next-auth/providers/credentials"; 
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schema"; 
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import  Google  from "next-auth/providers/google";
import  Github  from "next-auth/providers/github";

export default { 
  pages : {
    error:'/auth/error'
  },  
  providers: [
  Google({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  }),
  Github({
    clientId:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
  }),
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