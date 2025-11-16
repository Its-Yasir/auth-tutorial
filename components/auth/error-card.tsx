

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "./card-wrapper"

interface ErrorCardProps {
  error: string;
}

export const ErrorCard = ({ error }: ErrorCardProps) => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      headerLable="Oops! Something went wring!"
    >
      <div className="w-full justify-center flex items-center gap-5">
        <div className="w-max  bg-destructive/20 p-3 flex items-center gap-5 rounded-xl">
          <ExclamationTriangleIcon className="text-destructive"/>
          <span className="text-destructive">{error}</span>
        </div>
      </div>
    </CardWrapper>
  )
}