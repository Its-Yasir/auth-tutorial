"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () =>{
  return (
    <div className="flex w-full justify-center gap-x-7">
      <Button 
        className="w-[42px] h-[42px]"
        variant={'outline'}
        onClick={() => {}}
      >
        <FcGoogle className="h-7 w-7" />
      </Button>
      <Button 
        className="w-[42px] h-[42px]"
        variant={'outline'}
        onClick={() => {}}
      >
        <FaGithub className="h-7 w-7" />
      </Button>
    </div>
  );

}