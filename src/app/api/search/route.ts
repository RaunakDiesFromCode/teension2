import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    // Create a lowercase version of the search query for case-insensitive matching
    const searchQuery = q.toLowerCase().trim();

    if (searchQuery.length < 3) {
      return Response.json(
        { error: "Search term must be at least 3 characters long" },
        { status: 400 },
      );
    }

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find posts where content or user's display name or username contains the search query
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchQuery,
              mode: "insensitive", // For case-insensitive matching
            },
          },
          {
            user: {
              displayName: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              username: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
