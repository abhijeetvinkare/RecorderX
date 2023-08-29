import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    fetch("http://localhost:5000/users/dashboard", {
      method: "POST",
      credentials: "include", // This sends cookies with the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Authorization Faild!");
        }
      })
      .catch((error) => {
        alert(error.message);
        navigate("/");
      });
  }, []);

  const handleLogoutClick = () => {
    // Handle the logout action here
    // For example, send a request to log the user out and then navigate to the login page
    axios
      .get("http://localhost:5000/users/logout", { withCredentials: true })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 2}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <VideoChatIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1,fontSize: 35 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RecorderX
            </Typography>

            <VideoChatIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: 30 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 0,
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              RecorderX
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Profile Menu Item */}
                <MenuItem>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                {/* Logout Menu Item */}
                <MenuItem onClick={handleLogoutClick}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
