import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import urlcat from "urlcat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";

const RegistrationForm: FC = () => {
  const [error, setError] = useState<String>("");

  const SERVER = import.meta.env.VITE_SERVER;

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
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("api/user/", values)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          const payload = parseJwt(res.data.token);
          navigate(`/home`);
        })
        .catch((error) => setError(error.response.data.err));
    },
  });
  return (
    <Grid item xs={12}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              FULL NAME
            </Typography>

            <TextField
              required
              id="name"
              autoComplete="off"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              USERNAME
            </Typography>
            <TextField
              required
              id="username"
              autoComplete="off"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              EMAIL ADDRESS
            </Typography>
            <TextField
              required
              id="email"
              autoComplete="off"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: "0.5rem", color: "#f0deac" }}>
              PASSWORD
            </Typography>

            <TextField
              required
              id="password"
              autoComplete="off"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </Grid>
        </Grid>

        <Grid item sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              background: "#f0deac",
              color: "black",
              letterSpacing: "0.2rem",
              mt: "3rem",
              width: { xs: "100%", sm: "0" },
              pl: { sm: "6rem" },
              pr: { sm: "6rem" },
              "&:hover": {
                backgroundColor: "#b4c6aa",
              },
            }}
          >
            Submit
          </Button>
          <Typography variant="body2" sx={{ color: "white" }}>
            {error}
          </Typography>
        </Grid>
      </form>
    </Grid>
  );
};

export default RegistrationForm;
