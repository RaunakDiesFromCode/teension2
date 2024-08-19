"use client";
import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import { formatReletiveDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";
import { Media } from "@prisma/client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LikeButton from "./LikeButton";
import { useState } from "react";
import Comments from "../comments/Comments";
import { Badge } from "../Badge";

interface PostsProps {
  post: PostData;
}

export default function Posts({ post }: PostsProps) {
  const { user } = useSession();

  const [showComments, setShowComments] = useState(false);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
      <div className="flex justify-between gap-3">
        {" "}
        <Link
          href={`/posts/${post.id}`}
          className="w-full"
          suppressHydrationWarning
        >
          <div className="flex flex-wrap gap-2">
            <UserTooltip user={post.user}>
              <div className="flex gap-1">
                <UserAvatar avatarUrl={post.user.avatarUrl} />

                <div>
                  <Badge user={post.user} />
                  <span
                    className="block text-xs text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {formatReletiveDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </UserTooltip>
          </div>
        </Link>
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
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex items-center gap-5">
        <LikeButton
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some((like) => like.userId === user?.id),
          }}
        />
        <CommentButton
          post={post}
          onClick={() => setShowComments(!showComments)}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

export function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        {attachments.length > 1 && (
          <CarouselPrevious className="absolute left-0 top-1/2 z-10 mx-4 -translate-y-1/2 transform" />
        )}
        <CarouselContent className="w-full flex items-center">
          {attachments.map((m) => (
            <MediaPreview key={m.id} media={m} />
          ))}
        </CarouselContent>
        {attachments.length > 1 && (
          <CarouselNext className="absolute right-0 top-1/2 z-10 mx-4 -translate-y-1/2 transform" />
        )}
      </Carousel>
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <CarouselItem className="w-full">
        <Image
          src={media.url}
          alt="where's the IMAGEEEE!!!!????"
          width={1000}
          height={1000}
          className="mx-auto h-auto max-h-[35rem] w-full rounded-2xl object-contain"
        />
      </CarouselItem>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <CarouselItem className="w-full">
        <div className="rounded-2xl">
          <video
            controls
            // className="mx-auto size-fit max-h-[30rem] rounded-2xl"
            className="mx-auto h-auto max-h-[35rem] w-full rounded-2xl object-contain"
          >
            <source src={media.url} type="video/mp4" />
            Your crappy browser does not support the video .
          </video>
        </div>
      </CarouselItem>
    );
  }

  return (
    <p className="text-destructive">
      Look at the sky and think about the universe. You won&appos;t find the
      media here.
    </p>
  );
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
