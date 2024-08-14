import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
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
        <div className={`bg-blue-300 rounded-full w-fit h-fit `}>
          <div className={`flex justify-center items-center rounded-full p-2`}>
            <User size={size}/>
          </div>
        </div>
      )}
    </>
  );
}

