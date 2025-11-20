import { auth } from "@/auth"

export const currentUser =  async () => {
  const session  = await auth();
  const user = session?.user;
  return user;
}