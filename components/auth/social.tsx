"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () =>{

  const onClick = (provider: "google" | "github") => {
    signIn(provider,{
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full justify-center gap-x-7">
      <Button 
        className="w-[42px] h-[42px]"
        variant={'outline'}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-7 w-7" />
      </Button>
      <Button 
        className="w-[42px] h-[42px]"
        variant={'outline'}
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-7 w-7" />
      </Button>
    </div>
  );

}