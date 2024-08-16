import { CommentData } from "@/lib/types";
import UserTooltip from "../UserTooltip";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import { formatReletiveDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import CommentMoreButton from "./CommentMoreButton";
import Linkify from "../Linkify";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession();

  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="font-medium hover:underline"
            >
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatReletiveDate(comment.createdAt)}
          </span>
        </div>
        <div>
          <Linkify>{comment.content}</Linkify>
        </div>
      </div>
      {user?.id === comment.user.id && (
        <div className="ml-auto">
          <CommentMoreButton
            comment={comment}
            className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
          />
        </div>
      )}
    </div>
  );
}
