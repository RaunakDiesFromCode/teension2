import { validateRequest } from "@/auth";
import { YetToCome } from "@/components/beta/YetToCome";
import Selector from "@/components/tribes/selector";
import useTribeInfo from "@/hooks/useTribeInfo";
import React from "react";
import UserTribe from "./text";

export default async function Page() {
  const { user } = await validateRequest();

  if (user?.tribe == "rookie") {
    return (
      <div className="my-auto flex h-full w-full items-center justify-center">
        <Selector userId={user?.id || ""} /> {/* Pass userId to Selector */}
      </div>
    );
  } else {
    return (
      <div className="my-auto flex h-full w-full items-center justify-center">
        <UserTribe userId={user?.id || ""} />
      </div>
    );
  }
}
