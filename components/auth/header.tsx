import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-black text-3xl", font.className)}>
        🔐 Auth
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
};
