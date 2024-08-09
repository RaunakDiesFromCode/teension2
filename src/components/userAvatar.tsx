import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Button } from "./ui/button";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="User"
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
            className,
          )}
        />
      ) : (
        <Button
          variant="ghost"
          className="flex items-center justify-start p-2 rounded-full"
        >
          <User />
        </Button>
      )}
    </>
  );
}
