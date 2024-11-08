import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Person } from "@mui/icons-material";
import { logout } from "../../store/authSlice";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";

export default function MenuAuthed({ open, anchor, setAnchor }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchor(null);
  };

  function handleProfile(): void {
    setAnchor(null);
    navigate("/profile");
  }

  function Logout(): void {
    localStorage.removeItem("token");
    navigate("/");
    dispatch(logout());
  }

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchor}
      open={open}
      onClose={handleClose} // Close when clicking outside
    >
      <MenuItem onClick={() => navigate("/")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Typography variant="h6">Home</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfile}>
        {" "}
        <Person></Person>Profile
      </MenuItem>
      <MenuItem onClick={Logout}>
        {" "}
        <LogoutIcon />
        Logout
      </MenuItem>
    </Menu>
  );
}
