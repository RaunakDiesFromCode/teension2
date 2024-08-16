import UserAvatar from "@/components/userAvatar";
import { NotificationData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
import { Heart, MessageSquare, User } from "lucide-react";
import Link from "next/link";

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer?.displayName} came to touch with you`,
      icon: <User className="size-7 text-primary" />,
      href: `/users/${notification.issuer?.username}`,
    },
    COMMENT: {
      message: `${notification.issuer?.displayName} commented on your post`,
      icon: <MessageSquare  className="size-7 text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `${notification.issuer?.displayName} liked your post`,
      icon: <Heart className="size-7 text-primary" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "g3 flex items-center rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1 mr-4">{icon}</div>
        <div className="space-y-3">
          <div className="flex items-center gap-1">
            <UserAvatar avatarUrl={notification.issuer?.avatarUrl} size={26} />
            <span className="font-bold">
              {notification.issuer?.displayName}
            </span>
          </div>
          <div>
            {" "}
            <span className="">{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
