import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryField from "./CategoryField";
import { useSearchAllDealsQuery } from "../features/api/dealSlice";
import { useSearchParams } from "react-router-dom";
const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameSearch, setNameSearch] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const {
    data: searchedDeals, //renaming the data to "deals"
    isLoading,
    isSuccess,
    isError,
  } = useSearchAllDealsQuery({
    name: searchParams.get(`name`) ?? "",
    category: searchParams.get(`category`) ?? "",
    location: searchParams.get(`location`) ?? "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchParams({
      name: nameSearch,
      category: categoryId,
      location: location,
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={0.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              size="small"
              autoComplete="off"
              id="nameSearch"
              name="nameSearch"
              onChange={(e: any) => {
                setNameSearch(e.target.value);
              }}
              type="text"
              label="Search for anything!"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <CategoryField setCategoryId={setCategoryId} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              size="small"
              autoComplete="off"
              id="location"
              name="location"
              onChange={(e: any) => {
                setLocation(e.target.value);
              }}
              type="text"
              label="Location"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#fbb002",
                color: "#f2f2f2",
                letterSpacing: "0.1rem",

                width: "100%",
                "&:hover": {
                  backgroundColor: "#a1c060",
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SearchBar;
