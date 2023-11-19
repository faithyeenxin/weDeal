import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import shoppingMan from '../../public/shopping_man2.mp4';
import RegistrationForm from '../components/RegistrationForm';
const RegisterPage = () => {
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
        />
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: '1rem',
            }}
          >
            <Typography variant='h2'>Join Us!</Typography>
            <RegistrationForm />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: '1.5rem',
                gap: '0.5rem',
              }}
            >
              <Typography variant='body2'>Already a member?</Typography>
              <Link to='/login'>
                <Typography variant='body2'>LOGIN</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
