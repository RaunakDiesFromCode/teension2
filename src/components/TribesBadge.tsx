import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";

const font = Playfair_Display({
  weight: "600",
  subsets: ["latin"],
  style: "italic",
});

interface TribeBadgeProps {
  user: UserData;
  className?: string;
}

export function TribeBadge({ user, className }: TribeBadgeProps) {
  return (
    <span
      className={cn(
        "font-cursive absolute inset-0 flex items-center justify-center text-[8rem] text-muted-foreground opacity-40",
        className,
      )}
    >
      <div className={font.className}>{user.tribe}</div>
    </span>
  );
}
