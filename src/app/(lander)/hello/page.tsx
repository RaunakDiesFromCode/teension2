"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

const features = [
  {
    title: "it's the touch game",
    description:
      "Follow people you admire...or just stalk them virtually (we won't tell).",
    image: "touch_ss",
  },
  {
    title: "it's your playground",
    description:
      "Post your thoughts, pictures, and cat memes (mostly cat memes).",
    image: "post_ss",
  },
  {
    title: "like 'em tiger",
    description:
      "Like posts to show appreciation...or just because everyone else is doing it.",
    image: "likes_ss",
  },
  {
    title: "spread the words",
    description:
      "Comment on posts to join the conversation...or start a friendly debate (keyboard warriors welcome).",
    image: "comments_ss",
  },
  {
    title: "turn up the volume",
    description:
      "Receive notifications that make you feel popular, even if it's just someone liking your post from 2017.",
    image: "notification_ss",
  },
  {
    title: "Get that tribe",
    description:
      "Customize your profile to show off your personality (or at least a version of it).",
    image: "profile_ss",
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-[4rem] font-extrabold text-transparent">
        Welcome to
      </span>
      <span className="m-5 text-center text-[5rem] font-extrabold text-foreground">
        The Second Page of the Internet
      </span>
      <span className="mt-4 text-center text-[1.5rem] font-medium text-gray-500">
        {`(Because the front page is already taken by Google)`}
      </span>
      <Button
        className="mx-auto mt-12 w-fit rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 text-[1.5rem] font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-lg"
        onClick={() => {
          router.push("/login");
        }}
      >
        Join the Fun
      </Button>
      <p className="mt-8 text-center text-[1.2rem] font-normal text-gray-400">
        {" Get ready to dive into a world, which is just your\'s to explore."}
      </p>

      <ul className="mt-6 w-full list-none space-y-4 text-center text-[1.2rem] font-normal text-gray-500">
        {features.map((feature, index) => (
          <li key={index}>
            <Card className="flex w-full items-center">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="flex px-7 text-xl">
                  <span>{feature.description}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={`/images/screenshots/${feature.image}.png`}
                  alt={feature.image}
                  width="676"
                  height="894"
                  className="z-50 mt-5 rounded-xl"
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-[1.2rem] font-normal text-gray-500">
        {`It's like a social network, but cooler. And with fewer ads. Probably.`}
      </p>

      <Button
        className="mx-auto mt-12 w-fit rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 text-[1.5rem] font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-lg"
        onClick={() => {
          router.push("/login");
        }}
      >
        Join the Fun
      </Button>

      <p className="mt-8 text-center text-[1.2rem] font-normal text-gray-300">
        {`Are you still reading this? You should be signing up by now.`}
      </p>

      <span className="mb-32 mt-8 text-center text-[1rem] font-medium text-gray-400">
        *No humans were harmed in the making of this site, but a few brain cells
        were mildly inconvenienced.
      </span>
    </div>
  );
};

export default Page;
