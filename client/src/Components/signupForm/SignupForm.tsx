import React, { useContext, useState } from "react";
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import signupIcon from "../../images/signupIcon.png";
import "./signupForm.css";
import { useNavigate } from "react-router-dom";
import { EthereumContext } from "../../context/EthereumContext";

const SignupForm = () => {
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const navigate = useNavigate();
  const theme = createTheme();

  const { signupUser, findUser, connectedAccount } =
    useContext(EthereumContext);

  const handleSignup = () => {
    // signupUser(fullName, phoneNumber);
    console.log(connectedAccount);

    findUser(connectedAccount);
  };

  const Copyright = (props: any) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="">
          MagnaChain
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="main">
            <img src={signupIcon} alt="" />
          </Box>

          <Avatar sx={{ m: 1, bgcolor: "AppWorkspace" }}>
            <AccountCircleIcon fontSize="large" style={{ color: "#083444" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="phoneNumber"
              id="phoneNumber"
              autoComplete="current-phoneNumber"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#083444", color: "white" }}
              // disabled={!(fullName && phoneNumber)}
              onClick={handleSignup}
            >
              Signup
            </Button>
            <Typography component="h5" variant="h6">
              have account?
            </Typography>
            <Link color="inherit" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
