import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
interface formErrorMessage {
  message?: string;
};

export const FormError = (
    {message}:
    formErrorMessage
  ) => {

    if(!message) return null;

    return (      
      <div
        className="bg-destructive/15 flex p-3 rounded-md text-sm gap-x-2 items-center text-destructive"
      >
        <ExclamationTriangleIcon 
          className="w-4 h-4"
        />
        <p>{message}</p>
      </div>
    )
}