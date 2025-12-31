import type { AxiosInstance } from "axios";

export type PostImageDto = {
  id: number;
  postId: string;
  imageUrl: string;
};

export type PostDto = {
  id: string;
  groupId: string;
  userId: string;
  userFullName: string;
  profileImage: string | null;

  description: string | null;

  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalReported: number;

  isActive: boolean;
  postLocation: string | null;
  timePosted: string;
  timeElapsed: string;

  images: PostImageDto[] | null;
  isLikedByCurrentUser: boolean;
};

export type PostsResponse = {
  count: number;
  posts: PostDto[];
};

export type PostsQuery = {
  groupId?: string; // omit for All
  skip: number;
  top: number;
  searchTerm?: string;
  postLocation?: string;
  region?: string;
};

export async function fetchPosts(
  axios: AxiosInstance,
  q: PostsQuery
): Promise<PostsResponse> {
  const params = new URLSearchParams();
  params.set("skip", String(q.skip));
  params.set("top", String(q.top));

  if (q.groupId) params.set("groupId", q.groupId);
  if (q.searchTerm) params.set("searchTerm", q.searchTerm);
  if (q.postLocation) params.set("postLocation", q.postLocation);
  if (q.region) params.set("region", q.region);

  const res = await axios.get<PostsResponse>(`/api/Post?${params.toString()}`);
  return res.data;
}
