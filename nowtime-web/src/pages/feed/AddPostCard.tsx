import { Card, CardContent, IconButton, Avatar, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "../../styles/AddPostCard.module.css";

type Props = {
  onCreate?: () => void; // later open dialog
};

export default function AddPostCard({ onCreate }: Props) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.row}>
          <Avatar className={styles.avatar}>U</Avatar>

          <button
            type="button"
            className={styles.inputLike}
            onClick={() => onCreate?.()}
            aria-label="Create post"
          >
            <div className={styles.inputTitle}>What’s on your mind?</div>
            <div className={styles.inputSub}>Add post</div>
          </button>

          <div className={styles.actions}>
            <Tooltip title="Create post">
              <IconButton onClick={() => onCreate?.()} aria-label="Create post">
                <AddIcon />
              </IconButton>
            </Tooltip>

            <IconButton onClick={() => onCreate?.()} aria-label="Open composer">
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
