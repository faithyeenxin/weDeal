import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const projectButtonSx = {
  display: 'flex',
  color: '#FF2E00',
  fontWeight: 700,
  '&:hover': {
    cursor: 'pointer',
    color: '#FFAD1D',
  },
};
const NavBar = () => {
  const navigate = useNavigate();

  const registerHandler = () => {
    navigate('/register');
  };

  const loginHandler = () => {
    navigate('/login');
  };
  return (
    <Box>
      <AppBar
        sx={{
          paddingX: '5%',
          paddingY: 0.2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        color='inherit'
      >
        <Typography
          variant='logo'
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/');
          }}
        >
          weDeal
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={projectButtonSx} onClick={registerHandler}>
            <Typography variant='h6'>Get Started</Typography>
          </Box>
          <Box sx={projectButtonSx} onClick={loginHandler}>
            <Typography variant='h6'>Login</Typography>
          </Box>
        </Box>
      </AppBar>
      {/* <Toolbar /> */}
      <Outlet />
    </Box>
  );
};

export default NavBar;
