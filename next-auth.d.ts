import { DefaultSession } from "next-auth";
import { UserRole } from "./lib/generated/prisma/enums";

export type ExtendedUser =  DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}