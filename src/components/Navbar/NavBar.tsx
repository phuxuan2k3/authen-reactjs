import { AppBar, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import MenuNotAuthed from "./MenuNotAuthed";

export default function Navbar() {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();

  return (
    <AppBar style={{ marginBottom: "20px" }} position="static">
      <Toolbar>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Phu Xuan Web app
        </Typography>
        {isLoggedIn ? <UserAvatar /> : <MenuNotAuthed></MenuNotAuthed>}
      </Toolbar>
    </AppBar>
  );
}
