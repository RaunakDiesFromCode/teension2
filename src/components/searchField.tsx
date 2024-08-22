"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

interface SearchFieldProps {
  beautify?: boolean;
}

export default function SearchField({ beautify }: SearchFieldProps) {
  const router = useRouter();

  function handleIconClick(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const form = e.currentTarget.closest("form") as HTMLFormElement;
    if (form) {
      const q = (form.q as HTMLInputElement).value.trim();
      if (!q) return;
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search"
          className={`transition-all duration-200 ${beautify ? `w-[90vw]` : `w-[35rem]`} `}
        />
        <SearchIcon
          className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform cursor-pointer text-muted-foreground"
          onClick={handleIconClick}
        />
      </div>
    </form>
  );
}
