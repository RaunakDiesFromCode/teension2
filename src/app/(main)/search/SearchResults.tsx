"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import UserCard from "@/components/UserCard";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import Post from "@/components/posts/post";
import kyInstance from "@/lib/ky";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const isQueryValid = query.length >= 3;

  if (!isQueryValid) {
    return (
      <p className="text-center text-muted-foreground">
        Please enter at least 3 characters to search.
      </p>
    );
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useInfiniteQuery({
    queryKey: ["post-feed", "search", query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/search", {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  // Make sure users and posts are always arrays (default to empty if undefined)
  const posts = data?.pages.flatMap((page) => page.posts) || [];
  const users = data?.pages.flatMap((page) => page.users ?? []) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !users.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">Wow. Such empty :/</p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading results.
      </p>
    );
  }

  return (
    <main className="m-0 flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <InfiniteScrollContainer
              className="space-y-5"
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
            >
              {users.length > 0 ? (
                users.map(
                  (user) => user && <UserCard key={user.id} user={user} />, // Add check to ensure 'user' exists
                )
              ) : (
                <p className="text-center text-muted-foreground">
                  No users found.
                </p>
              )}
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-3 animate-spin" />
              )}
            </InfiniteScrollContainer>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <InfiniteScrollContainer
              className="space-y-5"
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
            >
              {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
              ) : (
                <p className="text-center text-muted-foreground">
                  No posts found.
                </p>
              )}
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-3 animate-spin" />
              )}
            </InfiniteScrollContainer>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
