import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IDeal, IUser } from "../Interface";
import format from "date-fns/format";

const DealPageEdittable = () => {
  const [locationStatus, setLocationStatus] = useState("");
  const [locationDetail, setLocationDetails] = useState<any>();
  const navigate = useNavigate();
  const [offEditMode, setOffEditMode] = useState<boolean>(true);
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
        setBigImg(res.data.DealImages[0].image);
        setDeal(res.data);
        return axios.get(`/api/user/${res.data.userId}`);
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [offEditMode]);

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

  // dealExpiry: format(
  //   new Date(deal?.dealExpiry),
  //   "dd MMMM yyyy - h:mm aaa "
  // ),
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: deal?.name,
      retailPrice: deal?.retailPrice,
      discountedPrice: deal?.discountedPrice,
      dealExpiry: format(new Date(deal?.dealExpiry), "yyyy-MM-dd"),
      location: deal?.location,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name of deal required"),
      discountedPrice: Yup.number().required("Required"),
      retailPrice: Yup.number().required("Required"),
      dealExpiry: Yup.date().required("Required"),
      location: Yup.string()
        .required("Required")
        .test(
          "location-exist",
          "Location does not exist",
           (location: any): any =>  {
            return axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBh_veIl8kLIgp2gCyglYDvnl-d0EK9CU&address=${location}`
              )
              .then((res) => {
                setLocationStatus(res.data.status);
                setLocationDetails(res.data);
                console.log(res.data);
                return res.data.status === "OK"
              })
              .catch((err) => console.log(err));
          }
        ),
    }),

    onSubmit: (values: any) => {
      console.log("edit button clicked")
      const body = {
        id: dealid,
        name: values.name,
        retailPrice: Number(values.retailPrice),
        discountedPrice: Number(values.discountedPrice),
        location: values.location,
        locationAddress: locationDetail.results[0].formatted_address,
        locationLat: locationDetail.results[0].geometry.location.lat,
        locationLong: locationDetail.results[0].geometry.location.lng,
        dealExpiry: new Date(values.dealExpiry),
      };
      if (offEditMode) {
        setOffEditMode(!offEditMode);
      } else {
        setOffEditMode(!offEditMode);
        axios
          .patch(`/api/deal/${dealid}`, body)
          .then((res) => {
            console.log(res.data);
            alert("Your deal has been updated");
            navigate(`/home`);
          })
          .catch((err) => console.log(err));
      }
    },
  });

  const handleDeleteDeal = () => {
    axios
      .delete(`/api/deal/${dealid}`)
      .then((res) => {
        console.log(res.data);
        alert("deal has been deleted");
        navigate(`/home`);
      })
      .catch((err) => console.log(err));
  };

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
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              <TextField
                disabled={offEditMode}
                id="name"
                name="name"
                size="medium"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  width: "100%",
                  pl: 2,
                  pr: 2,
                }}
              />
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
                          disabled={offEditMode}
                          id="discountedPrice"
                          name="discountedPrice"
                          size="small"
                          value={formik.values.discountedPrice}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          sx={{
                            width: "100%",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <Typography variant="body2" sx={{ mb: "0.5rem" }}>
                          Retail Price
                        </Typography>
                        <TextField
                          disabled={offEditMode}
                          id="retailPrice"
                          name="retailPrice"
                          size="small"
                          value={formik.values.retailPrice}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          sx={{
                            width: "100%",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
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
                      id="savings"
                      name="savings"
                      size="small"
                      value={(
                        formik.values.retailPrice -
                        formik.values.discountedPrice
                      ).toFixed(2)}
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
                      disabled={offEditMode}
                      id="dealExpiry"
                      name="dealExpiry"
                      type="date"
                      size="small"
                      value={formik.values.dealExpiry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                      disabled={offEditMode}
                      id="location"
                      name="location"
                      size="small"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{
                        width: "100%",
                      }}
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <div>{formik.errors.location}</div>
                    ) : null}
                    {locationStatus === "OK" ? (
                      <Typography variant="body2" sx={{ p: 0.7 }}>
                        {JSON.stringify(
                          locationDetail.results[0].formatted_address
                        ).replace(/['"]+/g, "")}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      itemAlign: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        background: "#fbb001",
                        color: "white",
                        // letterSpacing: "0.2rem",
                        mt: "3rem",
                        px: "2rem",
                        "&:hover": {
                          backgroundColor: "#7da471 ",
                        },
                      }}
                    >
                      {offEditMode ? "Edit" : "Submit"}
                    </Button>
                    {!offEditMode && (
                      <Button
                        sx={{
                          background: "#fbb001",
                          color: "white",
                          // letterSpacing: "0.2rem",
                          mt: "3rem",
                          px: "2rem",
                          "&:hover": {
                            backgroundColor: "#7da471",
                          },
                        }}
                        onClick={() => {
                          setDeal({
                            ...deal,
                            name: "rerender initial state",
                          });
                          setOffEditMode(!offEditMode);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      sx={{
                        background: "gray",
                        color: "white",
                        // letterSpacing: "0.2rem",
                        mt: "3rem",
                        px: "2rem",
                        "&:hover": {
                          backgroundColor: "red",
                        },
                      }}
                      onClick={handleDeleteDeal}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default DealPageEdittable;
