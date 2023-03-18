import React, { useState } from "react";
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

const SignupForm = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [matricule, setMatricule] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const theme = createTheme();

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
              id="matricule"
              label="Matricule"
              name="matricule"
              autoComplete="matricule"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user || ""}
                label="Role"
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"maire"}>Maire</MenuItem>
                <MenuItem value={"officier"}>Officier</MenuItem>
                <MenuItem value={"consulaire"}>Consulaire</MenuItem>
              </Select>
            </FormControl> */}
            {error && (
              <Alert
                variant="outlined"
                severity="warning"
                style={{ height: "80px" }}
              >
                {<p>matricule ou mot de passe ou role est incorrecte.</p>}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#083444", color: "white" }}
              disabled={!(matricule && password && role)}
            >
              Signup
            </Button>
            <Typography component="h5" variant="h6">
              have account?
            </Typography>
            <Link color="inherit" onClick={() => navigate("/login")}>
              Signup
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
