import { useGetAllDealsQuery } from "../features/api/apiSlice";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { IDeal } from "../Interface";
import { Box, Grid, Typography } from "@mui/material";
import MediaCard from "../features/mediaCard/MediaCard";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
const Home = () => {
  const { id } = useParams();
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
              lg={2.4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MediaCard item={item} />
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
      <Box sx={{ marginTop: "1.5%" }}>
        <SearchBar />
      </Box>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 5,
            letterSpacing: "0.025rem",
            fontStyle: "italic",
            color: "#fbb001",
          }}
        >
          Just added!
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
          }}
        >
          {content}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
