import {
  Avatar,
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDeal, IUser } from "../Interface";
import format from "date-fns/format";

const DealPage = () => {
  const { id, dealid } = useParams();
  const [user, setUser] = useState<IUser>({
    id: "",
    username: "",
    password: "",
    name: "",
    image: "",
    email: "",
    dateJoined: new Date(),
  });
  const [upvotes, setUpvotes] = useState();
  const [bigImg, setBigImg] = useState("");
  const [deal, setDeal] = useState<IDeal>({
    id: "",
    userId: "",
    name: "",
    retailPrice: 0,
    discountedPrice: 0,
    location: "",
    dealLocation: "",
    dealPostedDate: new Date(),
    dealExpiry: new Date(),
    categoryId: "",
    totalUpvotes: 0,
    totalDownvotes: 0,
    DealImages: [],
  });

  useEffect(() => {
    axios
      .get(`/api/deal/${dealid}`)
      .then((res) => {
        console.log(res.data);
        setBigImg(res.data.DealImages[0].image);
        setDeal(res.data);
        return axios.get(`/api/user/${res.data.userId}`);
      })
      .then((res) => {
        setUser(res.data);
        setUpvotes(
          res.data.Deals.reduce((acc: number, obj: IDeal) => {
            return acc + obj.totalUpvotes;
          }, 0)
        );
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEnlarge = (e: any) => {
    setBigImg(e.target.src);
  };
  /* 
{
    userId: "bff81b10-0223-4a9f-9954-8f41d6b7a475",
    name: "MOIST DIANE Perfect Beauty Extra Damage Repair Shampoo",
    retailPrice: 16.9,
    discountedPrice: 10.9,
    location: "postal code/ long+ lat here",
    dealLocation: "postal code/ long+ lat here",
    dealPostedDate: new Date(2022, 10, 01),
    dealExpiry: new Date(2022, 11, 20),
    categoryId: "6ea7ed58-cdc3-45be-97db-53e9a2c43a1f",
    totalUpvotes: 10,
    totalDownvotes: 0,
    DealImages: [""]
    }
  */
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: "3rem",
          mb: "3rem",
          pb: "0.5rem",
          backgroundColor: "#efe0d3",
          borderRadius: "3%",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Futura",
                color: "#fbb002",
                fontWeight: "bold",
                letterSpacing: 6,
              }}
            >
              {deal?.name}
            </Typography>
          </Grid>

          <Grid container sx={{ m: 5 }}>
            <Grid
              item
              sm={12}
              md={6}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={bigImg}
                    style={{
                      width: "50vh",
                      marginBottom: "1rem",
                      borderRadius: 15,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {deal?.DealImages.slice(0, 3).map((image, index) => (
                      <Grid
                        item
                        key={index}
                        xs={3.1}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          key={index}
                          src={image.image}
                          style={{ width: "90%", borderRadius: 15 }}
                          onClick={handleEnlarge}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              sx={{
                p: 3,
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              {" "}
              <Grid container spacing={2} sx={{ pt: 5 }}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item md={6}>
                      <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                        Discounted Price
                      </Typography>
                      <TextField
                        disabled
                        size="small"
                        value={deal?.discountedPrice}
                        sx={{
                          width: "100%",
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                        Retail Price
                      </Typography>
                      <TextField
                        disabled
                        size="small"
                        value={deal?.retailPrice}
                        sx={{
                          width: "100%",
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                    Savings
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    value={(deal?.retailPrice - deal.discountedPrice).toFixed(
                      2
                    )}
                    sx={{
                      width: "100%",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                    End Of Deal
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    value={`${format(
                      new Date(deal?.dealExpiry),
                      "dd MMMM yyyy"
                    )}`}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                    Location
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    value={deal?.location}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                    Location Address
                  </Typography>
                  <TextField
                    disabled
                    size="small"
                    value={deal?.locationAddress}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          mt: "3rem",
          mb: "3rem",
          p: 5,
          backgroundColor: "#efe0d3",
          borderRadius: "3%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar src={user.image} sx={{ width: 130, height: 130 }} />
          </Grid>

          <Grid item md={8}>
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Deal Shared By: <a href={`/user/${user.id}`}>@{user.name}</a>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Posted On: {"  "}
                  {format(
                    new Date(deal?.dealPostedDate),
                    "dd MMMM yyyy"
                  )} at {"  "}
                  {format(new Date(deal?.dealPostedDate), "h:mm aaa ")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Total Deals Posted: {user?.Deals?.length}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Total Upvotes To Date: {upvotes}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DealPage;
