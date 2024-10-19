import { YetToCome } from "@/components/beta/YetToCome";
import React from "react";
import Meme from "./Meme";
import MemeRenderer from "./MemeRenderer";

const page = () => {
  return (
    <div className="my-auto flex h-full w-full items-center justify-center">
      {/* <YetToCome feature="MehBox" /> */}
      <MemeRenderer/>
    </div>
  );
};

export default page;
