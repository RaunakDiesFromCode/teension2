import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import { badge, formatReletiveDate } from "@/lib/utils";
import { CircleCheck, Crown } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";

interface PostsProps {
  post: PostData;
}

export default function Posts({ post }: PostsProps) {

  const {user} = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="flex items-center gap-1 font-medium hover:underline"
            >
              {post.user.displayName}
              {badge(post) == "OP" && <Crown size={17} color="gold" />}
              {badge(post) == "Verified" && (
                <CircleCheck size={17} color="blue" />
              )}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-xs text-muted-foreground hover:underline"
            >
              {formatReletiveDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user?.id && (
          <PostMoreButton post={post} className="opacity-0 transition-opacity group-hover/post:opacity-100" />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
