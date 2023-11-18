import { useSearchAllDealsQuery } from '../features/api/dealSlice';

import { Box, Card, Grid, Paper, Typography, alpha } from '@mui/material';
import Container from '@mui/material/Container';
import Image from '../../public/happy-shopping.jpeg';
import MediaCard from '../components/MediaCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDeal } from '../Interface';
import { json, useSearchParams } from 'react-router-dom';
import MediaCardDisplayOnly from '../components/MediaCardDisplayOnly';
import SearchBar from '../components/SearchBar';

const LandingPage = () => {
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
      <SearchBar />
      <Container sx={{ mt: 2, mb: 5 }}>{content}</Container>;
    </>
  );
};

export default LandingPage;
