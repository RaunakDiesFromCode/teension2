// src/app/(main)/mehbox/memeFetcher.ts

import { Meme } from "@/lib/types";

export async function fetchMemes(): Promise<Meme[]> {
  const response = await fetch("https://meme-api.com/gimme/5");
  if (!response.ok) {
    throw new Error("Failed to fetch memes");
  }
  const data = await response.json();
  return data.memes; // Adjust according to the API response
}
