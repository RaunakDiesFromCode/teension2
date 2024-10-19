import { YetToCome } from "@/components/beta/YetToCome";
import React from "react";
import Meme from "./Meme";

const page = () => {
  return (
    <div className="my-auto flex h-full w-full items-center justify-center">
      {/* <YetToCome feature="MehBox" /> */}
      <Meme/>
    </div>
  );
};

export default page;
