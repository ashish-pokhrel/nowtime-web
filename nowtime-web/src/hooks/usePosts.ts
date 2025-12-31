import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts.api";
import type { PostsQuery, PostsResponse } from "../api/posts.api";
import { useAxios } from "./useAxios";

export function usePosts(q: PostsQuery) {
  const axios = useAxios();

  return useQuery<PostsResponse>({
    queryKey: ["posts", q],
    queryFn: () => fetchPosts(axios, q),
    staleTime: 15_000,
    placeholderData: keepPreviousData,
    select: (data) => ({
      count: data.count,
      posts: data.posts.filter((p) => p.isActive),
    }),
  });
}
