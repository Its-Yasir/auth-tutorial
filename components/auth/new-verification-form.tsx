'use client'

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if(!token) {
        setError('Token does not exist!')
        return;
      }
      
      try {
        const data = await newVerification(token);
        setSuccess(data.success);
        setError(data.error);
      } catch {
        setError('Something went wrong!')
      }
    };

    verify();
  }, [token]);

  return (
    <CardWrapper
      headerLable="Confirming your email"
      backButtonLabel="Back to Login Page"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex items-center justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success}/>
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}