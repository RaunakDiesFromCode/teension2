"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=1",
        );
        const data = await response.json();
        if (data && data[0] && data[0].url) {
          setCatImageUrl(data[0].url);
        }
      } catch (error) {
        console.error("Error fetching cat image:", error);
      }
    };

    fetchCatImage();
  }, []);

  return (
    <div className="my-11 h-full w-full space-y-3 text-center">
      <div className="text-center">
        <h1 className="mb-4 p-0 text-[20rem] font-semibold">
          <span className="relative inline-block">
            {catImageUrl && (
              <Image
                src={catImageUrl}
                alt="Random cat"
                className="absolute inset-0 -z-50 mx-auto my-auto flex h-52 w-28 items-center justify-center rounded-full object-cover"
                height={200}
                width={200}
              />
            )}
            <div className="z-50 flex items-center">
              <div className="text-red-500 [text-shadow:_15px_15px_0px_#94e3fe]">
                4
              </div>
              <div className="text-[22rem] text-red-500">0</div>
              <div className="text-red-500 [text-shadow:_15px_15px_0px_#94e3fe]">
                4
              </div>
            </div>
          </span>
        </h1>
        <p className="mb-4 text-lg text-foreground">
          Oops! Looks like you&apos;re lost.
        </p>
        <p className="mt-4 text-foreground">
          Let&apos;s get you back{" "}
          <Link href="/" className="text-blue-500">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
