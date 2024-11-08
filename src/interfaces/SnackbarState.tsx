import { SnackbarOrigin } from "@mui/material";

export default interface State extends SnackbarOrigin {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  message: string | null;
  severity: "success" | "error";
}
