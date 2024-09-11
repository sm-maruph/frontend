import React from "react";
import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Modal, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";

import MessageIcon from "@mui/icons-material/Message";

import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../Auth/AuthContext";
import { GuestMainNav, StudentMainNav, AlumniMainNav } from "./MainNavigation";
import { Student, Guest, Alumni } from "./Navigation";

import "./Header.css";
import Login from "./Login";

function Header() {
  const location = useLocation();
  let sx;
  if (location.pathname !== "/") {
    sx = { color: "black !important", marginRight: 1 };
  } else {
    sx = { marginRight: 1 };
  }

  const [isLoading, setIsloading] = useState(true);
  const loadingOn = () => {
    setIsloading(true);
  };
  const loadingOff = () => {
    setIsloading(false);
  };

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      if (user.exp * 1000 < Date.now()) {
        handleLogOut();
      } else {
        console.log(user.exp, Date.now());
        auth.login(user);
      }
    }
    loadingOff();
  }, []);

  const handleLogOut = () => {
    auth.logout();
    navigate("/");
  };
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const openLoginModal = () => {
    setLoginModal(true);
  };
  const closeLoginModal = () => {
    setLoginModal(false);
  };

  const loginContent = (
    <>
      <div className="header-avatar">
        <div style={{ marginRight: "20px" }}>
          <Tooltip title="Messages">
            <IconButton component={Link} to="/inbox">
              <MessageIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton component={Link} to="/notification">
              <NotificationsIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>

        <Typography sx={sx}>{auth.name}</Typography>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src={`http://localhost:3000/${auth.profilePicture}`}
          />
        </IconButton>
      </div>
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
        <MenuItem key="1" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Activity</Typography>
        </MenuItem>
        <MenuItem key="2" onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            component={Link}
            sx={{ textDecoration: "none", color: "inherit" }}
            to="./myprofile"
          >
            My Account
          </Typography>
        </MenuItem>
        <MenuItem key="3" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Help & Support</Typography>
        </MenuItem>
        <MenuItem
          key="4"
          onClick={() => {
            handleCloseUserMenu();
            handleLogOut();
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );

  // const [headers, setHeaders] = useState([]);

  return (
    <>
      <Modal open={isLoading}>
        <Box
          display="flex"
          alignItems="center"
          height="100vh"
          justifyContent="center"
        >
          <CircularProgress size={100} />
        </Box>
      </Modal>

      <Modal
        open={loginModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box>
          <Login onClose={closeLoginModal} />
        </Box>
      </Modal>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              component={Link}
              variant="h3"
              noWrap
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "ROBOTO",
                fontWeight: "bold",

                letterSpacing: ".1rem",
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              UIU+
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {auth.role === "student" && (
                  <Student handleCloseNavMenu={handleCloseNavMenu} />
                )}
                {auth.role === "alumni" && (
                  <Alumni handleCloseNavMenu={handleCloseNavMenu} />
                )}
                {auth.role === null && (
                  <Guest handleCloseNavMenu={handleCloseNavMenu} />
                )}
              </Menu>
            </Box>

            <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "roboto",
                fontWeight: "bold",
                letterSpacing: ".1rem",
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              UIU+
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: "50px",
                display: { xs: "none", md: "flex" },
              }}
              className={location.pathname === "/" ? "mainDiv" : ""}
            >
              {auth.role === "student" && <StudentMainNav />}
              {auth.role === "alumni" && <AlumniMainNav />}
              {auth.role === null && <GuestMainNav />}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth.isLoggedIn ? (
                loginContent
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openLoginModal}
                >
                  JOIN
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Header;
