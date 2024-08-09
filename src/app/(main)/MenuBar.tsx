import { Button } from "@/components/ui/button";
import { Bell, Dumbbell, Handshake, Home, PawPrint, TreePalm } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
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
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/notifications">
          <Bell />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
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
