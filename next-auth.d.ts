import { DefaultSession } from "next-auth";
import { UserRole } from "./lib/enums";

export type ExtendedUser =  DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    isTwoFactorEnabled: boolean;
  }
}