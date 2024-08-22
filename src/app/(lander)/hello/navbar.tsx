import Icon from "@/components/Icon";
import Link from "next/link";
import React from "react";

const navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center">
      <div className="px-auto mx-auto flex max-w-7xl items-center justify-between gap-5 px-9 py-3">
        <Link
          href="/"
          className="flex size-9 items-center justify-center font-bold text-foreground"
        >
          <div className="flex items-center gap-2">
            <Icon className="md:size-8" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default navbar;
