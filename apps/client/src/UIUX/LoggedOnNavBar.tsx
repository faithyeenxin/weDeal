import {
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const drawerWidth = 240;

const navItems = ['Profile', 'Add Deal', 'LogOut'];

const LoggedOnNavBar = (props: any) => {
  const { window } = props;
  const theme = useTheme();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography
        variant='h3'
        sx={{
          textAlign: 'center',
          m: 2,
          background:
            'linear-gradient(90deg, #FE400E 0%, #FF5935 47.4%, #FFAD1D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          TextFillColor: 'transparent',
        }}
      >
        weDeal
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                if (item === 'LogOut') {
                  sessionStorage.clear();
                  navigate('/');
                } else if (item === 'Add Deal') {
                  navigate(`/add-deal`);
                } else {
                  navigate(`/${item.toLowerCase()}`);
                }
              }}
            >
              <ListItemText
                primary={item}
                sx={{ color: theme.palette.weDeal?.secondary?.default }}
                primaryTypographyProps={{
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        sx={{
          paddingX: '5%',
          paddingY: { xs: '1%', md: '0.2%' },
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
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            navigate('/home');
          }}
        >
          weDeal
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: '#fbb002' }} />
          </IconButton>
        </Box>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor='right'
          sx={{
            //   display: { xs: "block", sm: "none" },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
};

export default LoggedOnNavBar;
