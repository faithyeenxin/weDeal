import { createTheme, Theme } from "@mui/material";

import backgroundTexture from "../src/background_texture.jpg";
const theme: Theme = createTheme({
  palette: {
    secondary: {
      main: "#254D71",
    },
  },
  typography: {
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
      fontFamily: "Poppins",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      fontFamily: "Poppins",
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 500,
      fontFamily: "Poppins",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 500,
      fontFamily: "Poppins",
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 500,
      fontFamily: "Poppins",
    },
    body1: {
      fontSize: "0.9rem",
      letterSpacing: "0.025rem",
      fontFamily: "Poppins",
    },
    body2: {
      fontSize: "0.7rem",
      letterSpacing: "0.1rem",
      fontFamily: "Poppins",
    },
  },
});

export default theme;
