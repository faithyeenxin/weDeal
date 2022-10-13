import { useGetAllDealsQuery } from "../features/api/apiSlice";

import { Card, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "../../public/happy-shopping.jpeg";
import MediaCard from "../features/mediaCard/MediaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IDeal } from "../Interface";
import { json } from "react-router-dom";
import MediaCardDisplayOnly from "../components/MediaCardDisplayOnly";

const LandingPage = () => {
  const {
    data: deals, //renaming the data to "deals"
    isLoading,
    isSuccess,
    isError,
  } = useGetAllDealsQuery(null, { pollingInterval: 3000 });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <Grid
        container
        rowSpacing={3}
        columnSpacing={1}
        sx={{
          display: "flex",
        }}
      >
        {deals.map((item) => {
          return (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MediaCardDisplayOnly item={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  } else if (isError) {
    content = <p>There's an error</p>;
  }
  return (
    <>
      <Paper
        sx={{
          padding: "45vh 0vh 18vh 0vh",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          mt: -1,
          mr: -1,
          ml: -1,
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Futura",
              color: "#fbb002",
              fontWeight: "bold",
              letterSpacing: 6,
            }}
            align="center"
          >
            Deals are best enjoyed together
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "Futura",
              color: "#e46e00",
              padding: "1vh 0vh",
              fontStyle: "italic",
            }}
            align="center"
            gutterBottom
          >
            join our robust community now!
          </Typography>
          <br />
        </Container>
      </Paper>
      <Container sx={{ mt: 5, mb: 5 }}>{content}</Container>
    </>
  );
};

export default LandingPage;
