import Image from "next/image";
import PostEditor from "@/components/posts/editor/postEditor";

export default function Home() {
  return (
    <main className="h-[300vh] w-full bg-red-400">
      <div className="w-full">
        <PostEditor />
      </div>
    </main>
  );
}
