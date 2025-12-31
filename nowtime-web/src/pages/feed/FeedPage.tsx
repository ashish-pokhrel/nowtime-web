import * as React from "react";
import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import PostCard from "./PostCard";
import FiltersBar from "./FiltersBar";
import AddPostCard from "./AddPostCard";
import styles from "../../styles/FeedPage.module.css";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";

function toPositiveInt(value: string | null, fallback: number) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

export default function FeedPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const resolvedGroupId = groupId && groupId !== "all" ? groupId : undefined;

  const top = toPositiveInt(searchParams.get("top"), 5);
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const postLocation = searchParams.get("postLocation") ?? "";
  const region = searchParams.get("region") ?? "";

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfinitePosts({
    groupId: resolvedGroupId,
    top,
    searchTerm: searchTerm || undefined,
    postLocation: postLocation || undefined,
    region: region || undefined,
  });

  // ✅ Flatten pages safely
  const posts = data?.pages?.flatMap((page) => page.posts) ?? [];
  const total = data?.pages?.[0]?.count ?? 0;

  // ✅ Safe param update (does NOT wipe other params)
  const setParam = React.useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams);
      const trimmed = value.trim();

      if (!trimmed) next.delete(key);
      else next.set(key, trimmed);

      // Keep top stable in URL if you want
      if (!next.get("top")) next.set("top", String(top));

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams, top]
  );

  /* ------------------ Infinite scroll observer ------------------ */
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    // stop if no more pages
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ✅ prevent repeated calls while already fetching
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  /* -------------------------------------------------------------- */

  return (
    <div className={styles.page}>
      <Header />

      <Container maxWidth="md" className={styles.container}>
        <div className={styles.headRow}>
          <div>
            <RouterLink to="/" className={styles.backLink}>
              <ArrowBackRoundedIcon fontSize="small" />
              Communities
            </RouterLink>

            <Typography className={styles.title}>
              {resolvedGroupId
                ? resolvedGroupId.replaceAll("-", " ")
                : "All Posts"}
            </Typography>
            <Typography className={styles.subtitle}>
              Browse posts, filter by location, and search.
            </Typography>
          </div>

          <Chip label={`Feed • ${total}`} variant="outlined" />
        </div>

        <div className={styles.section}>
          <AddPostCard onCreate={() => console.log("open create post modal")} />
        </div>

        <div className={styles.section}>
          <FiltersBar
            searchTerm={searchTerm}
            postLocation={postLocation}
            region={region}
            onSearchTermChange={(v) => setParam("searchTerm", v)}
            onPostLocationChange={(v) => setParam("postLocation", v)}
            onRegionChange={(v) => setParam("region", v)}
          />
        </div>

        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Failed to load posts.
          </Typography>
        )}

        <div className={styles.list}>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>

        {/* Sentinel */}
        <Box
          ref={loadMoreRef}
          sx={{ display: "flex", justifyContent: "center", py: 3 }}
        >
          {(isLoading || isFetchingNextPage) && <CircularProgress size={22} />}
          {!hasNextPage && posts.length > 0 && (
            <Typography sx={{ opacity: 0.6 }}>
              You’ve reached the end
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}
