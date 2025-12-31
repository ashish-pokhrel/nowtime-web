import * as React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import type { PostDto } from "../../api/posts.api";
import styles from "../../styles/PostCard.module.css";
import PostImages from "./PostImages";
import { toAssetUrl } from "../../utils/assetUrl";

export default function PostCard({ post }: { post: PostDto }) {
  const [expanded, setExpanded] = React.useState(false);

  const avatarLetter = (post.userFullName?.[0] ?? "U").toUpperCase();
  const profileSrc = post.profileImage ? toAssetUrl(post.profileImage) : null;

  const imageUrls =
    post.images?.map((x) => x.imageUrl).filter(Boolean).map(toAssetUrl) ?? [];

  const text = post.description?.trim() ?? "";
  const shouldShowToggle = text.length > 180; // simple threshold

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.metaRow}>
          {profileSrc ? (
            <img className={styles.avatarImg} src={profileSrc} alt={post.userFullName} />
          ) : (
            <div className={styles.avatar}>{avatarLetter}</div>
          )}

          <div className={styles.metaText}>
            <Typography className={styles.author}>{post.userFullName}</Typography>
            <Typography className={styles.meta}>
              {post.timeElapsed}
              {post.postLocation ? ` • ${post.postLocation}` : ""}
            </Typography>
          </div>
        </div>

        {text && (
          <>
            <Typography
              className={`${styles.postText} ${expanded ? styles.postTextExpanded : ""}`}
            >
              {text}
            </Typography>

            {shouldShowToggle && (
              <Button
                size="small"
                className={styles.showMoreBtn}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "Show less" : "Show more"}
              </Button>
            )}
          </>
        )}

        {imageUrls.length > 0 && <PostImages images={imageUrls} />}
      </CardContent>
    </Card>
  );
}
