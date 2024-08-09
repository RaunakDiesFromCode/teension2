import { Bell, Search } from "lucide-react";
import Link from "next/link";
import UserButton from "./userButton";
import SearchField from "./searchField";
import { Button } from "./ui/button";
import NotificationButton from "./notificationButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-9 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          <div className="rounded-md border-2 border-primary p-1 text-lg font-bold leading-none text-primary transition-colors duration-100">
            teen
            <br />
            sion
          </div>
        </Link>
        <SearchField />
        <div className="flex gap-4">
          <NotificationButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
