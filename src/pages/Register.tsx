import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import LinkMUI from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "../CustomIcons";
import AppTheme from "./theme/AppTheme";
import ColorModeSelect from "./theme/ColorModeSelect";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  FormLabel,
  Snackbar,
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [passwordAgainError, setPasswordAgainError] = React.useState(false);
  const [passwordAgainErrorMessage, setPasswordAgainErrorMessage] =
    React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const [stateSnackbar, setStateSnackbar] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      setStateSnackbar({ ...stateSnackbar, open: false });
      return;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError || passwordAgainError) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/user/register`,
        data
      );
      localStorage.setItem("token", response.data.access_token);
      setMessage("");
      setSuccess(true);
      setStateSnackbar({ ...stateSnackbar, open: true });
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setStateSnackbar({ ...stateSnackbar, open: true });
      if (axios.isAxiosError(err) && err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordAgain = document.getElementById(
      "passwordAgain"
    ) as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!password.value || passwordAgain.value != password.value) {
      setPasswordAgainError(true);
      setPasswordAgainErrorMessage(
        "Password again must be the same as password."
      );
      isValid = false;
    } else {
      setPasswordAgainError(false);
      setPasswordAgainErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      <Snackbar
        open={stateSnackbar.open}
        onClose={(event, reason) => handleCloseSnackbar(event, reason)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={stateSnackbar.vertical + stateSnackbar.horizontal}
        sx={{ width: "30%" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success ? "Sign up successfully" : message}
        </Alert>
      </Snackbar>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />
          <Card variant="outlined">
            <SitemarkIcon />
            Authenticate ReactJS
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password Again</FormLabel>
                </Box>
                <TextField
                  error={passwordAgainError}
                  helperText={passwordAgainErrorMessage}
                  name="passwordAgain"
                  placeholder="••••••"
                  type="password"
                  id="passwordAgain"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordAgainError ? "error" : "primary"}
                />
              </FormControl>

              {isLoading && (
                <Typography sx={{ textAlign: "center" }}>
                  <CircularProgress size="30px" />
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{ marginTop: 2 }}
              >
                Sign up
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link to="/signin">Sign in</Link>
                </span>
              </Typography>
            </Box>
            {/* <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box> */}
          </Card>
        </SignInContainer>
      </AppTheme>
    </>
  );
}
