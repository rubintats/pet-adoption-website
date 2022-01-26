import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import "../App.css";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: "#2c1e13",
    fontWeight: "bold",
    fontFamily: "Corinthia",
  },
}));

function Navbar() {
  const { openModal } = useContext(AppContext);
  const { user, token, setToken, setUser, setId, setAdmin, admin } =
    useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const userFromStorage = localStorage.getItem("userName");
    if (userFromStorage === "admin") {
      setAdmin(userFromStorage);
    } else {
      setUser(userFromStorage);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    setToken("");
    setUser("");
    setId("");
    setAdmin("");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#ffe2ce" }}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h3" className={classes.logo}>
          <a href="/" className="logo">
            LuckyPet
          </a>
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className="navLinks">
              Home
            </Link>
            <Link to="/search" className="navLinks">
              Search a pet
            </Link>
            {admin && (
              <Link to="/admin" className="navLinks">
                Admin page
              </Link>
            )}

            {token && (
              <Link to="/profile/:id" className="navLinks">
                Profile
              </Link>
            )}

            {token ? (
              <button onClick={logout} className="navLinks">
                Logout
              </button>
            ) : (
              <button onClick={openModal} className="navLinks">
                Login/Signup
              </button>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
