import Credentials from "next-auth/providers/credentials"; 
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schema"; 
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import  Google  from "next-auth/providers/google";
import  Github  from "next-auth/providers/github";

const providers: NextAuthConfig["providers"] = [
  Credentials({
    async authorize(credentials) {
      try {
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
      } catch (error) {
        console.error("Authorization error:", error);
        return null;
      }
    }
  })
];

// Only add OAuth providers if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

export default { 
  pages : {
    error:'/auth/error'
  },  
  providers,
} satisfies NextAuthConfig