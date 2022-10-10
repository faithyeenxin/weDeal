import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import CategoryField from "./CategoryField";

const SearchBar = () => {
  return (
    <Container>
      <form>
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
              type="text"
              label="Search for anything!"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <CategoryField />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              size="small"
              autoComplete="off"
              id="location"
              name="location"
              type="text"
              label="Location"
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              // type="submit"
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
