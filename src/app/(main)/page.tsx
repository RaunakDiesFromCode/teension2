import Image from "next/image";
import PostEditor from "@/components/posts/editor/postEditor";
import prisma from "@/lib/prisma";
import Post from "@/components/posts/posts";
import { postDataInclude } from "@/lib/types";
import TrendsSidebar from "@/components/TrendsSidebar";

export default async function Home() {

  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: {createdAt: 'desc'},
  });

  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
