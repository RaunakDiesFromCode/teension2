// src/app/(main)/mehbox/Meme.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchMeme } from "./memeFetcher";
import { Meme as MemeType } from "@/lib/types"; // Import the interface
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Meme = () => {
  const [meme, setMeme] = useState<MemeType | null>(null); // Use the Meme interface here
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMeme = async () => {
      try {
        const memeData = await fetchMeme();
        setMeme(memeData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getMeme();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!meme) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-h-full min-w-[50%]">
      <CardHeader>
        <a href={meme.postLink} target="_blank">
          <CardTitle>{meme.title}</CardTitle>
          <CardDescription>
            posted on r/{meme.subreddit} by u/{meme.author}
          </CardDescription>
        </a>
      </CardHeader>
      <CardContent>
        <Image
          src={meme.url}
          alt={meme.title}
          height={1000}
          width={1000}
          className="h-full w-full rounded-sm"
        />
      </CardContent>
    </Card>
  );
};

export default Meme;
