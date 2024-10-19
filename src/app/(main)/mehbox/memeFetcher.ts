// src/app/(main)/mehbox/memeFetcher.ts

import { Meme } from "@/lib/types";

export async function fetchMeme(): Promise<Meme> {
  const response = await fetch("https://meme-api.com/gimme");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  const meme: Meme = {
    url: data.url,
    title: data.title,
    subreddit: data.subreddit,
    author: data.author,
    nsfw: data.nsfw,
    postLink: data.postLink,
  };

  return meme;
}
