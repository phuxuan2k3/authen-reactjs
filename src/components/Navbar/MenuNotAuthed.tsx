import {
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function MenuNotAuthed() {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null); // updated type
  const open = Boolean(anchor);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        open={open}
        onClose={handleClose} // Close when clicking outside
      >
        <MenuItem
          onClick={() => {
            navigate("/");
            setAnchor(null);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography variant="h6">Home</Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate("/signin")}> Sign in</MenuItem>
        <MenuItem onClick={() => navigate("/register")}> Sign up</MenuItem>
      </Menu>
    </>
  );
}
