"use client";

import React from "react";
import useTribeInfo from "@/hooks/useTribeInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tribesInfo } from "@/lib/types";
import { Playfair_Display } from "next/font/google";
import { Separator } from "@/components/ui/seperator";

const font = Playfair_Display({
  weight: "600",
  subsets: ["latin"],
  style: "italic",
});

const UserTribe = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useTribeInfo(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.tribe ? (
        <div className="flex h-full flex-col items-center text-center">
          <CardDescription className="italic text-lg">You are a</CardDescription>
          <Card className="w-fit">
            <CardHeader>
              <CardTitle className="text-9xl">
                <span className={font.className}>{data.tribe}</span>
              </CardTitle>
              <CardDescription className="pt-10 text-xl text-muted-foreground">
                {tribesInfo[data.tribe]}
              </CardDescription>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent>
              <h1>Stay tuned for more :)</h1>
            </CardContent>
          </Card>
        </div>
      ) : (
        "No tribe information available"
      )}
    </div>
  );
};

export default UserTribe;
