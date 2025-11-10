import { CheckCircledIcon } from "@radix-ui/react-icons"
interface formSuccessMessage {
  message?: string;
};

export const FormSuccess = (
    {message}:
    formSuccessMessage
  ) => {

    if(!message) return null;

    return (
      <div
        className="bg-emerald-500/15 flex p-3 rounded-md text-sm gap-x-2 items-center"
      >
        <CheckCircledIcon 
          className="w-4 h-4 text-emerald-500"
        />
        <p
          className="text-emerald-500"
        >{message}</p>
      </div>
    )
}