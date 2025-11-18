import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "./lib/generated/prisma/enums"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"



export const { auth, handlers, signIn, signOut } = NextAuth({
  events:{
    async linkAccount({ user }) {
      await db.user.update({
        where: {id: user.id},
        data:{ emailVerified: new Date() }
      })
    },
  },
  callbacks: ({

    async signIn({ user, account }) {
      if(account?.provider !== "credentials") return true;
      if(!user.id) return false;
      const existingUser = await getUserById(user.id);
      if(!existingUser?.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if(!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete(
          {
            where:{
              id:twoFactorConfirmation.id
            }
          }
        )
      }

      return true;
    },

    async session({ token, session }) {
      console.log("Session toekn: ", session);
      if(session.user && token.sub) {
        session.user.id = token.sub;
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if(!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;
      
      token.role = existingUser.Role;
      console.log("Token: ", token);
      return token;
    },
  }),
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
}) 