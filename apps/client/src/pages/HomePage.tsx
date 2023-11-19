import { useGetAllDealsQuery } from '../features/api/dealSlice';
import { useSearchAllDealsQuery } from '../features/api/dealSlice';
import { useSearchParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { IDeal } from '../Interface';
import { Box, Grid, Typography } from '@mui/material';
import MediaCard from '../components/MediaCard';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
const Home = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: deals, //renaming the data to "deals"
    isLoading,
    isSuccess,
    isError,
  } = useSearchAllDealsQuery(
    {
      name: searchParams.get(`name`) ?? '',
      category: searchParams.get(`category`) ?? '',
      location: searchParams.get(`location`) ?? '',
    },
    { pollingInterval: 1000 }
  );

  // const {
  //   data: deals, //renaming the data to "deals"
  //   isLoading,
  //   isSuccess,
  //   isError,
  // } = useSearchAllDealsQuery(
  //   {
  //     name: searchParams.get(`name`) ?? "",
  //     category: searchParams.get(`category`) ?? "",
  //     location: searchParams.get(`location`) ?? "",
  //   },
  //   { pollingInterval: 5000 }
  // );

  // to add back in polling once done with testing
  // useGetAllDealsQuery(null, { pollingInterval: 5000 });
  console.log(`deals array:`);
  console.log(deals);
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
          display: 'flex',
        }}
      >
        {deals.map((item) => {
          return (
            <Grid
              item
              key={item.id}
              xs={6}
              sm={4}
              md={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
    <Box sx={{ marginTop: 8 }}>
      <SearchBar />
      <Container
        sx={{
          mt: 5,
          mb: 5,
        }}
      >
        <Grid
          container
          spacing={0.5}
          sx={{
            display: 'flex',
          }}
        >
          {content}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
