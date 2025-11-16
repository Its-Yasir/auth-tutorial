'use client'

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect } from "react";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const  onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLable="Confirming your email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login Page"
    >
      <div className="w-full flex items-center justify-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  )
}