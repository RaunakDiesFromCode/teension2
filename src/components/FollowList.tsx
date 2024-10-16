// components/FollowList.tsx

import React from "react";
import { validateRequest } from "../auth";
import { Badge } from "@/components/Badge";
import FollowButton from "@/components/FollowButton";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/userAvatar";
import UserTooltip from "@/components/UserTooltip";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";

interface FollowListProps {
  thresold?: number;
  className?: string;
  beautify?: boolean;
}

export async function FollowList({
  thresold,
  className,
  beautify,
}: FollowListProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: thresold || 100,
  });

  return (
    <div className={cn(`flex w-full flex-col space-y-5`, className)}>
      {usersToFollow.map((user) => (
        <div
          key={user.id}
          className={`${beautify ? `grid grid-cols-1 justify-center px-7` : `flex justify-between`} w-full items-center gap-3`}
        >
          {!beautify ? (
            <>
              <UserTooltip user={user}>
                <Link
                  href={`/users/${user.username}`}
                  className="flex items-center gap-3"
                >
                  <UserAvatar
                    avatarUrl={user.avatarUrl}
                    className="flex-none"
                  />
                  <div>
                    <Badge
                      user={user}
                      className="line-clamp-1 flex items-center gap-1 break-all font-semibold hover:underline"
                    />
                    <p className="line-clamp-1 break-all text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              </UserTooltip>
              <FollowButton
                userId={user.id}
                initialState={{
                  followers: user._count.followers,
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === user.id,
                  ),
                }}
              />
            </>
          ) : (
            <Card className="flex w-full flex-row items-center justify-between p-5">
              <UserTooltip user={user}>
                <Link
                  href={`/users/${user.username}`}
                  className="flex items-center gap-3"
                >
                  <UserAvatar
                    avatarUrl={user.avatarUrl}
                    className="flex-none"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Badge
                        user={user}
                        className="line-clamp-1 flex items-center gap-1 break-all font-semibold text-foreground hover:underline"
                      />
                      <div className="hidden items-center gap-1 md:flex">
                        {" • "}
                        {user.stars}
                        <Star color="gold" size={15} />
                        {" • "}
                        {user.tribe}
                      </div>
                    </div>
                    <p className="line-clamp-1 break-all text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              </UserTooltip>
              <FollowButton
                userId={user.id}
                initialState={{
                  followers: user._count.followers,
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === user.id,
                  ),
                }}
              />
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}
