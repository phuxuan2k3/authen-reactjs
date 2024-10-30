import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function Home() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null); // updated type
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isAuthen, setIsAuthen] = React.useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (
      token !== null &&
      token !== "" &&
      token !== undefined &&
      token !== "undefined" &&
      token !== "null"
    ) {
      setIsAuthen(true);
    }
    console.log(isAuthen);
  }, []);

  const open = Boolean(anchor);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null); // Closes the menu
  };

  const handleHomeClick = () => {
    console.log("Navigating to Home"); // Replace this with actual navigation
    setAnchor(null); // Close menu after clicking
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Example
          </Typography>
          {isMobile ? (
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
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleHomeClick}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Home</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : isAuthen ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="U" src="/static/images/avatar/1.jpg" />
              <nav>
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <li style={{ margin: "0 10px" }}>
                    <Link
                      to="/signin"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsAuthen(false);
                      }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </nav>
            </Box>
          ) : (
            <nav>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li style={{ margin: "0 10px" }}>
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign in
                  </Link>
                </li>
                <li style={{ margin: "0 10px" }}>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Home;
