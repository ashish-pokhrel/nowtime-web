import * as React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

import styles from "../styles/CommunitiesPage.module.css";
import { useGroups } from "../hooks/useGroups";
import Header from "../components/Header";
import type { GroupDto } from "../api/groups.api";
import { useNavigate } from "react-router-dom";

function iconFromApiName(name: string) {
  const key = name?.toLowerCase?.() ?? "";
  if (key.includes("users")) return <PeopleAltOutlinedIcon fontSize="small" />;
  if (key.includes("home")) return <HomeOutlinedIcon fontSize="small" />;
  if (key.includes("shopping")) return <ShoppingCartOutlinedIcon fontSize="small" />;
  if (key.includes("comments")) return <ChatBubbleOutlineOutlinedIcon fontSize="small" />;
  if (key.includes("plane")) return <FlightOutlinedIcon fontSize="small" />;
  if (key.includes("briefcase")) return <WorkOutlineOutlinedIcon fontSize="small" />;
  if (key.includes("health")) return <LocalHospitalOutlinedIcon fontSize="small" />;
  if (key.includes("ride")) return <DirectionsCarFilledOutlinedIcon fontSize="small" />;
  return <PublicOutlinedIcon fontSize="small" />;
}

function GroupCard({ g, onOpen }: { g: GroupDto; onOpen: (id: string) => void }) {
  return (
    <Card className={styles.card}>
      <div className={styles.cardAccent} style={{ backgroundColor: g.color }} />

      <CardContent className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.iconCircle} style={{ borderColor: g.color }}>
            <span className={styles.icon}>{iconFromApiName(g.icon)}</span>
          </div>

          <div className={styles.titleBlock}>
            <Typography className={styles.cardTitle}>{g.title}</Typography>
            <Typography className={styles.cardMeta}>Community</Typography>
          </div>
        </div>

        <Typography className={styles.cardDescription}>{g.description}</Typography>

        <div className={styles.cardFooter}>
          <Chip
            label="Open feed"
            size="small"
            variant="outlined"
            onClick={() => onOpen(g.id)}
          />

          <IconButton size="small" onClick={() => onOpen(g.id)} aria-label="Open feed">
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CommunitiesPage() {
  const { data, isLoading } = useGroups();
  const navigate = useNavigate();

  const openGroup = React.useCallback(
    (id: string) => navigate(`/feed/${id === "All" ? "all" : id}`),
    [navigate]
  );

  return (
    <div className={styles.page}>
      <Header />

      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.hero}>
          <Typography className={styles.title}>Communities</Typography>
          <Typography className={styles.subtitle}>
            Rooms, marketplace, jobs, travel and more — all in one place.
          </Typography>
        </div>

        <Box className={styles.sectionSpacer} />

        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          {isLoading &&
            Array.from({ length: 9 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <div className={styles.skeleton} />
              </Grid>
            ))}

          {!isLoading &&
            data?.map((g) => (
              <Grid key={g.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <GroupCard g={g} onOpen={openGroup} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
