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
import { Badge } from "./Badge";

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
          <div className="relative flex max-w-80 flex-col gap-3 break-words p-1 md:min-w-52">
            <div className="absolute inset-0 h-32 w-full overflow-hidden py-1">
              <UserCover
                coverUrl={user.coverUrl}
                size={1000}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10 mt-7 flex flex-col gap-3 p-3">
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
                  <Badge
                    user={user}
                    className="flex items-center gap-1 text-lg font-semibold text-primary hover:underline"
                  />
                  <div className="text-muted-foreground">@{user.username}</div>
                </Link>
              </div>
              {user.bio && (
                <Linkify>
                  <div className="line-clamp-4 whitespace-pre-line text-primary">
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
