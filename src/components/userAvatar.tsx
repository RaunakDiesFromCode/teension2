import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.webp";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

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
          width={size ?? 40}
          height={size ?? 40}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
            className,
          )}
        />
      ) : (
        <Image
          src={avatarPlaceholder}
          alt="User"
          width={size ?? 40}
            height={size ?? 40}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover bg-blue-400",
            className,
          )}
        />
      )}
    </>
  );
}

