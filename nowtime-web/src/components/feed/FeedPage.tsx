import * as React from "react";
import { Container, Typography, Chip, CircularProgress, Box } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Header";
import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/feed/PostCard";
import FiltersBar from "../../components/feed/FiltersBar";
import AddPostCard from "../../components/feed/AddPostCard";
import styles from "../../styles/FeedPage.module.css";

function toPositiveInt(value: string | null, fallback: number) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

export default function FeedPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const resolvedGroupId = groupId && groupId !== "all" ? groupId : undefined;

  const skip = toPositiveInt(searchParams.get("skip"), 1);
  const top = toPositiveInt(searchParams.get("top"), 5);

  const searchTerm = searchParams.get("searchTerm") ?? "";
  const postLocation = searchParams.get("postLocation") ?? "";
  const region = searchParams.get("region") ?? "";

  const { data, isLoading, isFetching, isError } = usePosts({
    groupId: resolvedGroupId,
    skip,
    top,
    searchTerm: searchTerm || undefined,
    postLocation: postLocation || undefined,
    region: region || undefined,
  });

  const setParam = React.useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams);

      const trimmed = value.trim();
      if (!trimmed) next.delete(key);
      else next.set(key, trimmed);

      // Reset pagination when filters change
      if (key !== "skip") next.set("skip", "1");

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const posts = data?.posts ?? [];
  const total = data?.count ?? 0;

  return (
    <div className={styles.page}>
      <Header />

      <Container maxWidth="md" className={styles.container}>
        <div className={styles.headRow}>
          <div>
            <Typography className={styles.title}>
              {resolvedGroupId ? resolvedGroupId.replaceAll("-", " ") : "All Posts"}
            </Typography>
            <Typography className={styles.subtitle}>
              Browse posts, filter by location, and search.
            </Typography>
          </div>

          <Chip
            label={`Feed • ${total}`}
            variant="outlined"
            className={styles.badge}
          />
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

        <Box className={styles.listHeader}>
          {isFetching && <CircularProgress size={18} />}
        </Box>

        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Failed to load posts.
          </Typography>
        )}

        {isLoading ? (
          <div className={styles.loading}>Loading…</div>
        ) : posts.length === 0 ? (
          <div className={styles.loading}>No posts found.</div>
        ) : (
          <div className={styles.list}>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}

        <div className={styles.pager}>
          <button
            className={styles.pagerBtn}
            disabled={skip <= 1 || isFetching}
            onClick={() => setParam("skip", String(Math.max(skip - 1, 1)))}
          >
            Prev
          </button>
          <button
            className={styles.pagerBtn}
            disabled={isFetching || posts.length === 0}
            onClick={() => setParam("skip", String(skip + 1))}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
}
