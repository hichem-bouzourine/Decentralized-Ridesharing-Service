import React from "react";
import { Box, Container, Grid, Link } from "@mui/material";
import logo from "../../images/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="navbarGrid"
    >
      <Link onClick={() => navigate("/")}>
        <img width={"20%"} src={logo} alt="logo" />
      </Link>
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
