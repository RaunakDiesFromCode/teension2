import Link from "next/link";
import UserButton from "./userButton";
import SearchField from "./searchField";
import NotificationButton from "./notificationButton";
import Icon from "./Icon";

export default function Navbar() {
  return (
    <header className="sticky flex items-center justify-center top-0 bg-card shadow-sm z-50">
      <div className="px-auto flex max-w-7xl items-center justify-between mx-auto gap-5 px-9 py-3">
        <Link href="/" className="text-2xl font-bold text-primary size-9 flex items-center justify-center">
          <Icon />
        </Link>
        <SearchField />
        <div className="flex gap-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
