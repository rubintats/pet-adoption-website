import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import "../App.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { AppContext } from "../context/AppContext";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: "#4f331f",
    fontWeight: "bold",
    fontFamily: "Corinthia",
  },
}));

export default function Footer() {
  const { openModal } = useContext(AppContext);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function Copyright(props) {
    return (
      <Typography variant="body2" color="#4f331f" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          LuckyPet by Tanya Rubin
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ backgroundColor: "#ffe2ce", position: "fixed", bottom: 0 }}
    >
      <Container maxWidth="md">
        <Toolbar>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div className={classes.navlinks}>
              <Link to="/" className="coolBeans">
                Home
              </Link>
              <Link to="/search" className="coolBeans">
                Search a pet
              </Link>
              <Link to="/contact" className="coolBeans">
                Contact us
              </Link>
              <button onClick={openModal} className="coolBeans">
                Login/Signup
              </button>
            </div>
          )}
          <Typography variant="h3" className={classes.logo}>
            <a href="/" className="logo">
              LuckyPet
            </a>
          </Typography>
        </Toolbar>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </AppBar>
  );
}
