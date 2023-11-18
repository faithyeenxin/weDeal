import { useMediaQuery, useTheme } from '@mui/material';

const useBreakpoints = () => {
  const theme = useTheme();

  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isExtraExtraSmallScreen = useMediaQuery('@media (max-width: 375px)');

  let size;
  if (isExtraLargeScreen) size = 'xl';
  else if (isLargeScreen) size = 'lg';
  else if (isMediumScreen) size = 'md';
  else if (isSmallScreen) size = 'sm';
  else if (isExtraSmallScreen) size = 'xs';
  else if (isExtraExtraSmallScreen) size = 'xxs';
  else size = 'xl'; // default size

  return {
    isLargeScreen,
    isExtraLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isExtraSmallScreen,
    isExtraExtraSmallScreen,
    size,
  };
};

export default useBreakpoints;

export const xxs = `@media (max-width: 375px)`;
export const xs = `@media (min-width: 425px)`;
export const sm = `@media (min-width: 600px)`;
export const md = `@media (min-width: 900px)`;
export const lg = `@media (max-width: 1200px)`;
export const xl = `@media (min-width: 1440px)`;
