"use client";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomButton from "@/components/atoms/CustomButton";
import { theme } from "./theme";
import { useRouter } from "next/navigation";
import React from "react";
import { baseURL } from "@/api";
import { useGlobalStore } from "@/globalStore";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const { setUserId, setUserName } = useGlobalStore();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogin = () => {
    axios
      .post(baseURL + "/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setUserId(response.data.data._id);
          router.push("/home");
        } else {
          setOpen(true);
          setErrorMessage(response.data.message);
        }
      })
      .catch((err) => {
        setOpen(true);
        setErrorMessage("Erro");
      });
  };

  const handleSignUp = () => {
    axios
      .post(baseURL + "/user", {
        name: name,
        username: name,
        password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setUserName(response.data.data.name);
          setUserId(response.data.data._id);
          setOpenSuccess(true);
          setSuccessMessage("Conta criada com sucesso!");
          router.push("/home");
        } else {
          setOpen(true);
          setErrorMessage(response.data.message);
        }
      })
      .catch((err) => {
        setOpen(true);
        setErrorMessage("Erro");
      });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: "520px",
              padding: 6,
              borderRadius: "32px",
              marginRight: "-32px",
              zIndex: 1,
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" color="whitesmoke">
              Fireflies
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "450px",
              // maxWidth: "1000px",
              backgroundColor: "whitesmoke",
              padding: "32px 80px",
              paddingRight: "48px",
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"
            >
              <Tab label="Sign in" />
              <Tab label="Sign up" />
            </Tabs>

            <Grid
              container
              spacing={2}
              display={value === 0 ? "initial" : "none"}
              height="400px"
              pt={3}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{
                    borderRadius: 120,
                  }}
                  inputProps={{
                    style: {
                      borderRadius: 20,
                    },
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Login"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <CustomButton
                  onClick={() => {
                    handleLogin();
                  }}
                  title="Sign in"
                  variant="contained"
                  sx={{
                    width: "150px",
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              display={value === 0 ? "none" : "initial"}
              height="400px"
              pt={3}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{
                    borderRadius: 120,
                  }}
                  inputProps={{
                    style: {
                      borderRadius: 20,
                    },
                  }}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  onChange={(e) => setUsername(e.target.value)}
                  label="Login"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  id="outlined-basic"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <CustomButton
                  onClick={handleSignUp}
                  title="Sign up"
                  variant="contained"
                  sx={{
                    width: "150px",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
