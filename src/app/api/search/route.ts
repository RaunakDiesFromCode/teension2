// src/app/api/search/route.ts
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, getUserDataSelect, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

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

    // Fetch posts matching the search query
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchQuery,
              mode: "insensitive",
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

    // Fetch users matching the search query
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            displayName: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      select: getUserDataSelect(user.id),
      take: pageSize, // You can adjust this to match the pagination logic for users if needed
    });

    // Determine if there is a next cursor for posts
    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize), // Return posts
      users, // Return users
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
