// @ts-nocheck
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      weDeal?: {
        primary?: {
          default?: string;
          lighter?: string;
        };
        secondary?: {
          default?: string;
        };
        tertiary?: {
          default?: string;
        };
        error?: {
          default?: string;
        };
        success?: {
          default?: string;
        };
      };
    };
  }

  interface PaletteOptions {
    weDeal?: {
      primary?: {
        default?: string; // default color: corporate blue
        lighter?: string;
        defaultFilter?: string;
        lighterFilter?: string;
      };
      secondary?: {
        default?: string; // secondary color: cream yellow
      };
      tertiary?: {
        default?: string;
      };
      error?: {
        default?: string;
      };
      success?: {
        default?: string;
      };
    };
  }

  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    h7: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    logo?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    h6?: React.CSSProperties;
    h7?: React.CSSProperties;
    body1?: React.CSSProperties;
    body2?: React.CSSProperties;
    logo?: React.CSSProperties;
  }

  // allow Breakpoints Overrides
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// allow Typography Overrides
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1?: true;
    h2?: true;
    h3?: true;
    h4?: true;
    h5?: true;
    h6?: true;
    h7: true;
    body1?: true;
    body2?: true;
  }
}

// Initialize theme with custom Palette & Breakpoints, because the typography needs to use it in this same file
const initCustomTheme = createTheme({
  palette: {
    weDeal: {
      primary: {
        default: '#FF2E00', // bright tangerine
        lighter: '#FF2E00',
      },
      secondary: {
        default: '#FFAD1D', // yellow orange
      },
      tertiary: {
        default: '#F8F7F7', // faded grey
      },
      error: {
        default: '#D82D38',
      },
      success: {
        default: '#19867F',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const theme = createTheme({
  ...initCustomTheme,
  typography: {
    // Heading 1, for page main headline
    h1: {
      fontFamily: 'Barlow',
      fontSize: '72px',
      fontWeight: 600,
      lineHeight: '120%',
      textTransform: 'uppercase',
      letterSpacing: '0.4em',
      textAlign: 'left',
      [initCustomTheme.breakpoints.down('lg')]: {
        letterSpacing: '0.3em',
        fontSize: '64px',
      },
      [initCustomTheme.breakpoints.down('md')]: {
        letterSpacing: '0.1em',
        fontSize: '48px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        letterSpacing: '0.05em',
        // fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        letterSpacing: '0em',
        fontSize: '32px',
      },
    },

    // Heading 2, gradient primary-dark color
    h2: {
      fontFamily: 'Barlow',
      fontSize: '64px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      background: `linear-gradient(90deg, ${initCustomTheme.palette?.PCLab?.primary?.default} 0%, ${initCustomTheme.palette?.PCLab?.text?.primary} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      TextFillColor: 'transparent',
      [initCustomTheme.breakpoints.down('lg')]: {
        fontSize: '54px',
      },
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '48px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '24px',
      },
    },

    // Heading 3, primary color, for News Article Title
    h3: {
      fontFamily: 'Barlow',
      fontSize: '38px',
      fontWeight: 600,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.default,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '24px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '20px',
      },
    },

    // Heading 4, primary color
    h4: {
      fontFamily: 'Barlow',
      fontSize: '32px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.default,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '24px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },

    // Heading 5, dark color
    h5: {
      fontFamily: 'Barlow',
      fontSize: '24px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },

    // Heading 6, dark color
    h6: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '18px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },

    // Small Title (Bold)
    h7: {
      fontFamily: 'Barlow',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },

    // Text for paragraph that are inside headliners
    body1: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'justify',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('lg')]: {
        fontSize: '18px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },

    // Standard text for paragraph
    body2: {
      fontFamily: 'Barlow',
      fontSize: '16px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'justify',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    logo: {
      fontSize: '36px',
      fontWeight: 800,
      fontFamily: 'Barlow',
      lineHeight: '120%',
      color: initCustomTheme.palette.weDeal?.primary?.default,
      '@media (max-width:600px)': {
        fontSize: '24px',
      },
    },
  },
});

export default theme;
