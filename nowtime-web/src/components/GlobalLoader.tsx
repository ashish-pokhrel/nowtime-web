import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
  open: boolean;
};

export default function GlobalLoader({ open }: Props) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: "#fff",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
