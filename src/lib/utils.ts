import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { User } from "lucia";
import { PostData } from "./types";

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
function isOP(post: PostData): boolean {
  return post.user.op === true;
}

// Function to check if the user is verified
function isVerified(post: PostData): boolean {
  return post.user.verified === true;
}

export function badge(post: PostData) {
  if (isOP(post)) {
    return "OP";
  } else if (isVerified(post)) {
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
