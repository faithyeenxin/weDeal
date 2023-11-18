import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import shoppingMan from '../../public/shopping_man.mp4';
import Image from '../../public/mobile_bg.jpg';

const LoginPage = () => {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          md={12}
          lg={6}
          sx={{
            backgroundImage: `url(https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: '100vh',
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: { xs: '6rem', sm: '0' },
          }}
        >
          <Box sx={{ p: '2rem' }}>
            <Box sx={{ mb: '2rem' }}>
              <Typography variant='h2'>Welcome Back!</Typography>
            </Box>

            <LoginForm />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '1.5rem',
                gap: '0.5rem',
              }}
            >
              <Typography variant='body2'>Not a member yet?</Typography>

              <Link to='/register'>
                <Typography variant='body2'>SIGN UP</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
