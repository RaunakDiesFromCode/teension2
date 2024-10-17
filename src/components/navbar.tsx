"use client";
import Link from "next/link";
import UserButton from "./userButton";
import SearchField from "./searchField";
import Icon from "./Icon";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-background shadow-sm md:px-12">
      <div className="mx-auto flex w-full items-center justify-between px-9 py-3">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-primary"
        >
          {/* Use responsive sizes for the Icon */}
          <Icon className="" size={30} />
        </Link>
        <div className="flex items-center gap-4">
          <Button
            className="block xl:hidden"
            variant="ghost"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <SearchIcon className="size-7 cursor-pointer text-muted-foreground" />
          </Button>

          <div className="hidden xl:block">
            <SearchField />
          </div>

          <UserButton />
        </div>
      </div>

      <div className="">
        {isSearchOpen && (
          <div className="w-full mb-3">
            <SearchField beautify />
          </div>
        )}
      </div>
    </header>
  );
}
