import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Button } from "./ui/button";

interface UserCoverProps {
  coverUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserCover({
  coverUrl,
  size,
  className,
}: UserCoverProps) {
  return (
    <>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt="User"
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
            className,
          )}
        />
      ) : (
        <div className="bg-blue-400 w-full h-60 rounded-md"></div>
      )}
    </>
  );
}
