import React, { useContext } from "react";
import { Box, Button, Container, Grid, Link } from "@mui/material";
import logo from "../../images/logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { EthereumContext } from "../../context/EthereumContext";

const Navbar = () => {
  const { connectedAccount, setConnectedAccount } = useContext(EthereumContext);
  const navigate = useNavigate();

  const logout = () => {
    setConnectedAccount("");
  };
  return (
    <Grid className="navbarGridWrapper">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="navbarGrid"
      >
        <Link className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </Link>
        <Box
          sx={{
            display: "flex",
            paddingRight: "20px",
          }}
        >
          {connectedAccount && (
            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#083444",
                color: "white",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Navbar;
