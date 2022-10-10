import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const projectButtonSx = {
  backgroundColor: "#fbb002",
  color: "#f2f2f2",
  letterSpacing: "0.1rem",
  pl: "0.75rem",
  pr: "0.75rem",
  ml: 1,
  mr: 1,
  "&:hover": {
    backgroundColor: "#a1c060",
  },
};
const NavBar = () => {
  const navigate = useNavigate();

  const registerHandler = () => {
    navigate("/register");
  };

  const loginHandler = () => {
    navigate("/login");
  };
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "#efe0d3",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "1%",
            }}
            // spacing={2}
          >
            <Grid
              item
              sm={6}
              md={8}
              lg={10}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalMallIcon
                sx={{ mr: 1, color: "#fbb002", fontSize: "2.5rem" }}
              />
              <Typography
                variant="h2"
                sx={{
                  color: "#fbb002",
                  fontWeight: "bold",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                weDeal
              </Typography>
            </Grid>
            <Grid
              item
              sm={6}
              md={4}
              lg={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button sx={projectButtonSx} onClick={registerHandler}>
                    Register
                  </Button>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button sx={projectButtonSx} onClick={loginHandler}>
                    LogIn
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </>
  );
};

export default NavBar;
