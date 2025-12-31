import { Card, CardContent, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import styles from "../../styles/FiltersBar.module.css";

type Props = {
  searchTerm: string;
  postLocation: string;
  region: string;
  onSearchTermChange: (v: string) => void;
  onPostLocationChange: (v: string) => void;
  onRegionChange: (v: string) => void;
};

export default function FiltersBar({
  searchTerm,
  postLocation,
  region,
  onSearchTermChange,
  onPostLocationChange,
  onRegionChange,
}: Props) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.grid}>
          <TextField
            size="small"
            placeholder="Search posts…"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            size="small"
            placeholder="Location"
            value={postLocation}
            onChange={(e) => onPostLocationChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            size="small"
            placeholder="Region"
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
