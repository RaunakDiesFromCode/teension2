"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import Link from "next/link";
import { PropsWithChildren } from "react";
import FollowButton from "./FollowButton";
import FollowerCount from "./FollowerCount";
import Linkify from "./Linkify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./userAvatar";
import UserCover from "./userCover";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser?.id,
    ),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="relative flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="absolute inset-0 h-32 w-full overflow-hidden">
              <UserCover
                coverUrl={user.coverUrl}
                size={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 "></div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 p-3 mt-7">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/users/${user.username}`}>
                  <UserAvatar size={70} avatarUrl={user.avatarUrl} />
                </Link>
                {loggedInUser?.id !== user.id && (
                  <FollowButton userId={user.id} initialState={followerState} />
                )}
              </div>
              <div>
                <Link href={`/users/${user.username}`}>
                  <div className="text-lg font-semibold text-white hover:underline">
                    {user.displayName}
                  </div>
                  <div className="text-muted-foreground text-white">
                    @{user.username}
                  </div>
                </Link>
              </div>
              {user.bio && (
                <Linkify>
                  <div className="line-clamp-4 whitespace-pre-line text-white">
                    {user.bio}
                  </div>
                </Linkify>
              )}
              <FollowerCount userId={user.id} initialState={followerState} />
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
