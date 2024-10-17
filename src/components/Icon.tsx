"use client";
import { cn } from "@/lib/utils";
import { Hammer, Heart } from "lucide-react";
import { useTheme } from "next-themes";

interface IconProps {
  className?: string;
  size?: number;
}

export default function Icon({ className, size = 30 }: IconProps) {
  const theme = useTheme().resolvedTheme;
  const textSize = size; // Adjust the text size relative to the icon size
  const betaSize = textSize / 2; // Adjust the "beta" size relative to the text size

  return (
    <header className="sticky top-0 z-50 flex items-center">
      <div className="">
        <div className="flex items-center gap-2">
          <Heart
            width={size}
            height={size}
            fill="red"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "lucide lucide-heart text-black dark:text-white",
              className,
            )}
            color={theme == "dark" ? "white" : "black"}
          />
          <div className="flex">
            <h1
              className="text-black dark:text-white"
              style={{ fontSize: `${textSize}px` }}
            >
              teension
            </h1>
            <h1
              className="hidden md:block"
              style={{ fontSize: `${betaSize}px` }}
            >
              beta
            </h1>
            <Hammer size={betaSize} className="block md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
