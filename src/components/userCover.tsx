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
  const height = size ?? 90;
  const width = size ? (size * 12) / 9 : 120;
  return (
    <>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt="User"
          width={width}
          height={height}
          className={cn(
            "h-72 w-full flex-none rounded-md bg-secondary object-cover",
            className,
          )}
        />
      ) : (
        <div className="h-60 w-full rounded-md bg-blue-400"></div>
      )}
    </>
  );
}
