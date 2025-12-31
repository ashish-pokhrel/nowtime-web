import * as React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import styles from "../../styles/PostImages.module.css";

export default function PostImages({ images }: { images: string[] }) {
  const urls = images.filter(Boolean);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);

  const isSlider = urls.length > 1;

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children.item(idx) as HTMLElement | null;
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    setActive(Math.max(0, Math.min(idx, urls.length - 1)));
  };

  if (urls.length === 0) return null;

  // ✅ Single image: do NOT let it dominate the feed
  if (!isSlider) {
    return (
      <div className={styles.singleWrap}>
        <img className={styles.singleImg} src={urls[0]} alt="post image" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={styles.sliderWrap}>
      {/* Top-right badge: show "2+" when >2 images */}
      {urls.length > 2 && <div className={styles.moreBadge}>2+</div>}

      {/* Slider */}
      <div className={styles.scroller} ref={scrollerRef} onScroll={onScroll}>
        {urls.map((src, idx) => (
          <div key={`${src}-${idx}`} className={styles.slide}>
            <img className={styles.slideImg} src={src} alt={`post image ${idx + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className={styles.nav}>
        <IconButton
          size="small"
          className={styles.navBtn}
          disabled={active === 0}
          onClick={() => scrollToIndex(active - 1)}
          aria-label="Previous image"
        >
          <ChevronLeftRoundedIcon />
        </IconButton>

        <div className={styles.dots}>
          {urls.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <IconButton
          size="small"
          className={styles.navBtn}
          disabled={active === urls.length - 1}
          onClick={() => scrollToIndex(active + 1)}
          aria-label="Next image"
        >
          <ChevronRightRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}
