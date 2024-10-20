// src/components/UserCard.tsx
import { Star } from "lucide-react";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import UserTooltip from "@/components/UserTooltip";
import { UserData } from "@/lib/types";
import UserAvatar from "./userAvatar";
import { Card } from "./ui/card";
import { Badge } from "./Badge";

interface UserCardProps {
  user: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <article className="group/post space-y-3 flex w-full justify-between items-center rounded-2xl bg-card p-5 mb-5 shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
      <UserTooltip user={user}>
        <Link
          href={`/users/${user.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
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
    </article>
  );
};

export default UserCard;
