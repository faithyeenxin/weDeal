import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import CategoryField from './CategoryField';
import { useSearchAllDealsQuery } from '../features/api/dealSlice';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const CustomButton = styled(Button)({
  background: `linear-gradient(90deg, #FE400E 0%, #FF5935 47.4%, #FFAD1D 100%)`,
  color: '#f2f2f2',
  letterSpacing: '0.1rem',
  fontWeight: 600,
  '&:hover': {
    background: '#FF2E00',
  },
});

const SearchBar = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameSearch, setNameSearch] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const {
    data: searchedDeals, //renaming the data to "deals"
    isLoading,
    isSuccess,
    isError,
  } = useSearchAllDealsQuery({
    name: searchParams.get(`name`) ?? '',
    category: searchParams.get(`category`) ?? '',
    location: searchParams.get(`location`) ?? '',
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              size='small'
              autoComplete='off'
              id='nameSearch'
              name='nameSearch'
              onChange={(e: any) => {
                setNameSearch(e.target.value);
              }}
              type='text'
              label='Search for anything!'
              sx={{
                width: '100%',
                backgroundColor: '#F8F7F7',
                '& fieldset': { border: 'none' },
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <CategoryField setCategoryId={setCategoryId} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <TextField
              size='small'
              autoComplete='off'
              id='location'
              name='location'
              onChange={(e: any) => {
                setLocation(e.target.value);
              }}
              type='text'
              label='Location'
              sx={{
                width: '100%',
                backgroundColor: '#F8F7F7',
                borderRadius: 3,
                '& fieldset': { border: 'none' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              type='submit'
              size='large'
              sx={{
                background: `linear-gradient(90deg, #FE400E 0%, #FF5935 47.4%, #FFAD1D 100%)`,
                color: '#f2f2f2',
                letterSpacing: '0.1rem',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  background: `linear-gradient(90deg, #FFAD1D 0%, #FF5935 47.4%, #FE400E 100%)`,
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
