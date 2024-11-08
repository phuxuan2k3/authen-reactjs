import { Alert, Snackbar } from "@mui/material";
import SnackbarState from "../interfaces/SnackbarState";

export default function Notification({
  state,
  handleCloseSnackbar,
}: {
  state: SnackbarState;
  handleCloseSnackbar: (event: any, reason: any) => void;
}) {
  return (
    <Snackbar
      open={state.open}
      onClose={(event, reason) => handleCloseSnackbar(event, reason)}
      anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
      key={state.vertical + state.horizontal}
      sx={{ width: "60%" }}
    >
      <Alert
        onClose={(event) => handleCloseSnackbar(event, null)}
        severity={state.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
