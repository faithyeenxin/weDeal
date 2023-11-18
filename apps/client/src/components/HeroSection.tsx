import { Box, Container, Grid, Typography } from '@mui/material';
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
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              zIndex: 2,
              paddingX: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box display='flex' flexDirection='column' alignItems='center'>
              <Typography
                variant='h3'
                color={theme.palette.weDeal?.neutral.white}
              >
                Spend Less,
              </Typography>
              <Typography
                variant='h3'
                color={theme.palette.weDeal?.neutral.white}
              >
                Love More.
              </Typography>
            </Box>
            <Typography
              variant='body2'
              color={theme.palette.weDeal?.neutral.white}
            >
              Save money on the things you love, <br /> spend it on the people
              you love.
            </Typography>
          </Box>
          <div
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 1,
              backgroundImage: `url(${HeroOne})`,
              backgroundSize: 'cover',
              borderTopRightRadius: isMediumScreen ? '0px' : '30px',
              borderBottomRightRadius: isMediumScreen ? '0px' : '30px',
              backgroundPosition: 'center',
              width: isMediumScreen ? '100%' : '60%',
              height: '100%',
            }}
          />
        </Box>
        {!isMediumScreen && (
          <Box
            sx={{
              position: 'relative',
              backgroundColor: theme.palette.weDeal?.secondary?.lighter,
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
                width: '50%',
                height: '100%',
                borderTopLeftRadius: '30px',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                zIndex: 2,
                paddingX: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box display='flex' flexDirection='column'>
                <Typography
                  variant='h3'
                  color={theme.palette.weDeal?.neutral.white}
                >
                  Every kinda
                </Typography>
                <Typography
                  variant='h3'
                  color={theme.palette.weDeal?.neutral.white}
                >
                  thing for every
                </Typography>
                <Typography
                  variant='h3'
                  color={theme.palette.weDeal?.neutral.white}
                >
                  kinda person
                </Typography>
              </Box>
              <Typography
                variant='body2'
                color={theme.palette.weDeal?.neutral.white}
              >
                Discover the best deals today!
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};
