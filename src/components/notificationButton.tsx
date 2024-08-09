import Link from "next/link";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3 rounded-full p-2"
      title="Home"
      asChild
    >
      <Link href="/notifications">
        <Bell />
      </Link>
    </Button>
  );
}
