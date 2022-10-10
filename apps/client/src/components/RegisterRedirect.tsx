import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const RegisterRedirect: FC = () => {
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: "10rem",
        p: "5rem",
        borderRadius: 4,
        border: 1,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "600" }}>
        Oh no! You do not have access to this page!
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "400", mt: "1rem" }}
      >
        Please register or login to have full access!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "3rem",
          gap: "3rem",
        }}
      >
        <Button
          type="submit"
          onClick={() => navigate("/register")}
          sx={{
            background: "#D9DFE4",
            color: "#444444",
            letterSpacing: "0.2rem",
            fontWeight: "600",
            pl: "1rem",
            pr: "1rem",
            "&:hover": {
              backgroundColor: "#D9DFE4",
            },
          }}
        >
          Register
        </Button>
        <Button
          type="submit"
          onClick={() => navigate("/login")}
          sx={{
            background: "#D9DFE4",
            color: "#444444",
            letterSpacing: "0.2rem",
            fontWeight: "600",
            pl: "1rem",
            pr: "1rem",
            "&:hover": {
              backgroundColor: "#D9DFE4",
            },
          }}
        >
          Login
        </Button>{" "}
      </Box>
    </Container>
  );
};

export default RegisterRedirect;
