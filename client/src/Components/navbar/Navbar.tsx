import React from "react";
import { Box, Container, Grid } from "@mui/material";
import logo from "../../images/logo.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="navbarGrid"
    >
      <img width={"20%"} src={logo} alt="logo" />
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 6,
          },
        }}
      ></Box>
      navbar
    </Grid>
  );
};

export default Navbar;
