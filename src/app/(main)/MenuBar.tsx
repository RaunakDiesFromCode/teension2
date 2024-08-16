import { validateRequest } from "@/auth";
import NotificationButton from "@/components/notificationButton";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import {
  Bell,
  Dumbbell,
  Handshake,
  Home,
  PawPrint,
  TreePalm,
} from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const unreadNotificationCount = await prisma.notification.count({
    where: { receipentId: user.id, read: false },
  });

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/messages">
          <Handshake />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/challenges">
          <Dumbbell />
          <span className="hidden lg:inline">Challenges</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/tribes">
          <TreePalm />
          <span className="hidden lg:inline">Tribes</span>
        </Link>
      </Button>
    </div>
  );
}
