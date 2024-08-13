import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/userAvatar";
import UserCover from "@/components/userCover";
import prisma from "@/lib/prisma";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
import { badge, formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { CircleCheck, Crown, Pencil, Star } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import UserPosts from "./UserPosts";

interface pageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: { equals: username, mode: "insensitive" },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: pageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: pageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser)
    return (
      <p className="text-destructive">
        You are not allowed to do such sorcery
      </p>
    );

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        {/* <div className="rounded-2xl bg-card p-5 shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
          <h2 className="text-center text-2xl font-medium">
            {user.displayName}&apos;s Posts
          </h2>
        </div> */}
        <UserPosts userId={user.id} />
      </div>
      <TrendsSidebar />
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card py-5">
      <div className="-mb-28 h-fit w-full">
        <UserCover coverUrl={user.coverUrl} />
        <div className="mx-auto w-fit -translate-y-[50%] rounded-full bg-background p-1.5">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            size={200}
            className="mx-auto size-full max-h-60 min-w-60 rounded-full"
          />
        </div>
      </div>

      <div className="flex h-fit flex-col flex-wrap gap-3 sm:flex-nowrap">
        <div className="mx-auto me-auto space-y-3">
          <div className="h-fit text-center">
            {/* -mt-28 */}
            <h1 className="mx-auto flex w-full items-center gap-1 text-3xl font-bold">
              {user.displayName}
              {badge(user) == "OP" && <Crown size={20} color="gold" />}
              {badge(user) == "Verified" && (
                <CircleCheck size={20} color="#1F75FE" />
              )}
            </h1>
          </div>
        </div>

        <div className="rounded-md p-3 text-muted-foreground shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
          <div className="flex justify-between">
            <div>
              <FollowerCount userId={user.id} initialState={followerInfo} />
            </div>
            <div>
              {user.id === loggedInUserId ? (
                <Button className="rounded-full p-2">
                  <Pencil />
                </Button>
              ) : (
                <FollowButton userId={user.id} initialState={followerInfo} />
              )}
            </div>
          </div>
          <hr className="my-1" />
          <div className="flex justify-between">
            <div className="text-muted-foreground">@{user.username}</div>
            <div className="flex items-center gap-1 text-muted-foreground">
              {user.stars}
              <Star size={20} color="gold" />
            </div>
          </div>
          <div className="flex justify-between">
            <div>Member since {formatDate(user.createdAt, "MMM d, yyyy")}</div>
            <div className="italic text-muted-foreground">{user.tribe}</div>
          </div>
          <hr className="my-1" />
          {user.bio && (
            <div className="overflow-hidden whitespace-pre-line break-words text-muted-foreground">
              {user.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
