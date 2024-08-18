import { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CircleCheck, Crown } from "lucide-react";

interface BadgeProps {
  user: UserData;
  className?: string;
}

export function Badge({ user, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 font-medium hover:underline",
        className,
      )}
    >
      {user.displayName}
      {user?.badge == "op" && <Crown size={17} color="gold" />}
      {user?.badge == "verified" && <CircleCheck size={17} color="#1F75FE" />}
    </span>
  );
}
