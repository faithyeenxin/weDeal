import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const LoginForm: FC = () => {
  const [error, setError] = useState<String>("");

  const navigate = useNavigate();

  const parseJwt = (token: string) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("api/user/login", values)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          const payload = parseJwt(res.data.token);
          console.log(payload);
          navigate(`/${payload.id}/home`);
        })
        .catch((error) => setError(error.response.data.error));
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} sx={{ mb: "2rem" }}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              USERNAME*
            </Typography>
            <TextField
              id="username"
              autoComplete="off"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              sx={{
                width: "100%",
              }}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mb: "2rem" }}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              PASSWORD*
            </Typography>
            <TextField
              id="password"
              autoComplete="off"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              sx={{ width: "100%" }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Grid>
        </Grid>

        <Button
          type="submit"
          sx={{
            background: "#f0deac",
            color: "black",
            width: "100%",
            letterSpacing: "0.2rem",
            mb: "0.5rem",
            "&:hover": {
              backgroundColor: "#b4c6aa",
            },
          }}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ color: "red" }}>
          {error}
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;
