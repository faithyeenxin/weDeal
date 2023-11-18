import { useGetAllDealsQuery } from '../features/api/dealSlice';

import { Card, Grid, Paper, Typography, alpha } from '@mui/material';
import Container from '@mui/material/Container';
import Image from '../../public/happy-shopping.jpeg';
import MediaCard from '../components/MediaCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IDeal } from '../Interface';
import { json } from 'react-router-dom';
import MediaCardDisplayOnly from '../components/MediaCardDisplayOnly';

const LandingPage = () => {
  const {
    data: deals, //renaming the data to "deals"
    isLoading,
    isSuccess,
    isError,
  } = useGetAllDealsQuery(null, { pollingInterval: 5000 });

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
              xs={12}
              sm={6}
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
  return <Container sx={{ mt: 5, mb: 5 }}>{content}</Container>;
};

export default LandingPage;
