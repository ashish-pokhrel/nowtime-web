import { Container, Typography, Card, CardContent, Chip, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "../styles/CommunitiesPage.module.css";
import { useGroups } from "../hooks/useGroups";
import Header from "../components/Header";
import type { GroupDto } from "../api/groups.api";

function GroupCard({ g }: { g: GroupDto }) {
  return (
    <Card className={styles.card}>
      <div className={styles.cardAccent} style={{ backgroundColor: g.color }} />

      <CardContent className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconCircle}>
            <span className={styles.icon}>{g.title[0]}</span>
          </div>
          <Typography className={styles.cardTitle}>{g.title}</Typography>
        </div>

        <Typography className={styles.cardDescription}>
          {g.description}
        </Typography>

        <div className={styles.cardFooter}>
          <Chip label="Open feed" size="small" variant="outlined" />
          <IconButton size="small">
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CommunitiesPage() {
  const { data, isLoading } = useGroups();

  return (
    <div className={styles.page}>
      <Header />

      <Container maxWidth="lg" className={styles.container}>
        <Typography className={styles.title}>Communities</Typography>
        <Typography className={styles.subtitle}>
          Rooms, marketplace, jobs, travel and more — all in one place.
        </Typography>

        <Grid container spacing={2}>
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <div className={styles.skeleton} />
              </Grid>
            ))}

          {!isLoading &&
            data?.map((g) => (
              <Grid key={g.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <GroupCard g={g} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
