import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useBreakpoints from '../hooks/useBreakpoints';
import HeroOne from '../assets/hero1.svg';
import HeroTwo from '../assets/hero2.svg';

export const HeroSection = () => {
  const theme = useTheme();
  const { isMediumScreen } = useBreakpoints();
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            backgroundColor: theme.palette.weDeal?.secondary?.default,
            borderRadius: 3,
            width: '100%',
            height: 200,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${HeroOne})`,
              backgroundSize: 'cover',
              borderTopRightRadius: '30px',
              borderBottomRightRadius: '30px',
              backgroundPosition: 'center',
              width: '60%',
              height: '100%',
            }}
          />
        </Box>
        {!isMediumScreen && (
          <Box
            sx={{
              position: 'relative',
              backgroundColor: theme.palette.weDeal?.primary?.default,
              borderRadius: 3,
              width: '100%',
              height: 200,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: 0,
                backgroundImage: `url(${HeroTwo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '60%',
                height: '100%',
                borderTopLeftRadius: '30px',
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};
