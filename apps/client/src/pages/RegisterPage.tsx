import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import shoppingMan from "../../public/shopping_man2.mp4";
import RegistrationForm from "../components/RegistrationForm";
const RegisterPage = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            // backgroundImage: `url(https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100vh",
            display: { xs: "none", sm: "none", md: "block" },
            justifyContent: "center",
            alignItems: "center",
            m: -1,
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{ position: "fixed", zIndex: "-1", width: "100%" }}
          >
            <source src={shoppingMan} type="video/mp4" />
          </video>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: "6rem", sm: "0" },
          }}
        >
          <Box sx={{ p: "3rem" }}>
            <Grid item xs={12} sx={{ textAlign: "center", mb: "1rem" }}>
              <Typography variant="h2" sx={{ color: "#f0deac" }}>
                Join the family!
              </Typography>
            </Grid>
            <RegistrationForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
