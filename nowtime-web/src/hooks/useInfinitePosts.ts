import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts.api";
import type { PostsQuery, PostsResponse } from "../api/posts.api";
import { useAxios } from "./useAxios";

type InfinitePostsQuery = Omit<PostsQuery, "skip">;

export function useInfinitePosts(q: InfinitePostsQuery) {
  const axios = useAxios();

  return useInfiniteQuery<
    PostsResponse,                 // queryFn returns one page
    Error,                         // error
    InfiniteData<PostsResponse>,    // ✅ data shape has .pages
    readonly ["posts", InfinitePostsQuery],
    number                         // pageParam type
  >({
    queryKey: ["posts", q],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchPosts(axios, {
        ...q,
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, p) => sum + p.posts.length, 0);
      if (loaded >= lastPage.count) return undefined;
      return allPages.length + 1; // next page (1-based)
    },
    staleTime: 15_000,
  });
}
