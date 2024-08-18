import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { User } from "lucia";
import { UserData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReletiveDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000)
    return formatDistanceToNowStrict(from, { addSuffix: true });
  else {
    if (currentDate.getFullYear() === from.getFullYear())
      return formatDate(from, "MMM d");
    else formatDate(from, "MMM d, yyy");
  }
}

// Function to check if the user is the Original Poster (OP)
function isOP(user: UserData): boolean {
  return user.op === true;
}

// Function to check if the user is verified
function isVerified(user: UserData): boolean {
  return user.verified === true;
}

export function badge(user: UserData) {
  if (isOP(user)) {
    return "OP";
  } else if (isVerified(user)) {
    return "Verified";
  }
  return "";
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
