import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import { badge, formatReletiveDate } from "@/lib/utils";
import { CircleCheck, Crown } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";

interface PostsProps {
  post: PostData;
}

export default function Posts({ post }: PostsProps) {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`} className="flex gap-1">
              <UserAvatar avatarUrl={post.user.avatarUrl} />

              <div>
                <span className="flex items-center gap-1 font-medium hover:underline">
                  {post.user.displayName}
                  {badge(post.user) == "OP" && <Crown size={17} color="gold" />}
                  {badge(post.user) == "Verified" && (
                    <CircleCheck size={17} color="#1F75FE" />
                  )}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatReletiveDate(post.createdAt)}
                </span>
              </div>
            </Link>
          </UserTooltip>
        </div>
        {post.user.id === user?.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  );
}
