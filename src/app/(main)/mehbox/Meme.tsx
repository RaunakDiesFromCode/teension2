// src/app/(main)/mehbox/Meme.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Meme as MemeType } from "@/lib/types"; // Import the interface
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Meme( {meme}: {meme: MemeType} ) {

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
