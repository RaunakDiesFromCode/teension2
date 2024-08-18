"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface YetToComeProps {
  feature: string;
}

export function YetToCome({ feature }: YetToComeProps) {
  const router = useRouter();
  return (
    <Card className="w-[350px] text-center">
      <CardHeader>
        <CardTitle>Hold on for now !</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {`${feature} feature is in developement and is yet to come. We seriously don\'t know when you are getting this feature.`}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="https://www.wikihow.com/Calculate-Pi-by-Throwing-Frozen-Hot-Dogs">
            Stay here?
          </Link>
        </Button>
        <Button onClick={() => router.push(`\\`)}>Go back and enjoy!</Button>
      </CardFooter>
    </Card>
  );
}
