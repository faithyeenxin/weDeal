import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { IDeal } from "../Interface";
import { Box, Grid, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";
import { Container } from "@mui/system";
const Home = () => {
  const [allDeals, setAllDeals] = useState<IDeal[]>([]);
  useEffect(() => {
    axios
      .get(`/api/deal`)
      .then((res) => {
        setAllDeals(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box sx={{ marginTop: "1%" }}>
        <SearchBar />
      </Box>
      <Container sx={{ mt: "3%" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            letterSpacing: "0.025rem",
            fontStyle: "italic",
            color: "#fbb001",
          }}
        >
          Just added
        </Typography>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
          sx={{
            display: "flex",
          }}
        >
          {allDeals.map((item) => {
            return (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={4}
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
      </Container>
    </>
  );
};

export default Home;
