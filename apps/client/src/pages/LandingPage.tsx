import { Card, Grid, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "../../public/happy-shopping.jpeg";
import MediaCard from "../components/MediaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IDeal } from "../Interface";

const LandingPage = () => {
  const [allDeals, setAllDeals] = useState<IDeal[]>([]);

  useEffect(() => {
    axios
      .get(`/api/deal`)
      .then((res) => {
        setAllDeals(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Paper
        sx={{
          padding: "45vh 0vh 27vh 0vh",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          // borderRadius: "2%",

          mt: -1,
          mr: -1,
          ml: -1,
          mb: 2,
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
      <Container
        sx={{
          // backgroundColor: "#f1f2f2",
          pt: "1%",
          pb: "1%",
          pl: "2.5%",
          pr: "2.5%",
          mr: "2%",
          ml: "2%",
        }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
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
      </Container>
    </>
  );
};

export default LandingPage;
