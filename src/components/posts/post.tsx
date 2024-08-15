"use client"
import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../userAvatar";
import { badge, cn, formatReletiveDate } from "@/lib/utils";
import { CircleCheck, Crown } from "lucide-react";
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

interface PostsProps {
  post: PostData;
}

export default function Posts({ post }: PostsProps) {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-[0_3px_15px_rgb(0,0,0,0.12)]">
      <Link href={`/posts/${post.id}`} suppressHydrationWarning>
        <div className="flex justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <UserTooltip user={post.user}>
              <div className="flex gap-1">
                <UserAvatar avatarUrl={post.user.avatarUrl} />

                <div>
                  <span className="flex items-center gap-1 font-medium hover:underline">
                    {post.user.displayName}
                    {badge(post.user) == "OP" && (
                      <Crown size={17} color="gold" />
                    )}
                    {badge(post.user) == "Verified" && (
                      <CircleCheck size={17} color="#1F75FE" />
                    )}
                  </span>
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
          {post.user.id === user?.id && (
            <PostMoreButton
              post={post}
              className="opacity-0 transition-opacity group-hover/post:opacity-100"
            />
          )}
        </div>
      </Link>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
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
        <CarouselContent className="w-full">
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
          width={500}
          height={500}
          className="mx-auto size-full max-h-[30rem] rounded-2xl"
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
            className="mx-auto size-fit max-h-[30rem] rounded-2xl"
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
