import { createTheme } from '@mui/material/styles';
import { paletteOptions } from './palette';

export const theme = createTheme({
  palette: paletteOptions,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.2,
          fontFamily: 'Inter',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          elevation: 3,
          fontWeight: 700,
          fontFamily: 'Inter',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          color: '#2600AF',
          '& .MuiTabs-indicator': {
            backgroundColor: '#532BE3',
            fontFamily: 'Inter',
          },
          '& .MuiTab-root': {
            '&.Mui-selected': {
              color: '#2600AF',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            backgroundColor: 'rgb(247, 247, 248)',
            color: 'rgb(158, 158, 158)',
            fontFamily: 'Inter',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            backgroundColor: 'rgb(247, 247, 248) !important',
            color: 'rgb(158, 158, 158) !important',
            fontFamily: 'Inter',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          color: '#100066',
          '&.Mui-focused': {
            color: '#2600AF',
          },
          '&.Mui-disabled': {
            color: '#7D7A93 !important',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#100066',
          fontFamily: 'Inter',
          '&.Mui-disabled': {
            color: '#7D7A93',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '12px',
          },
          '&.MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#2600AF',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#2600AF',
          },
          '& label.Mui-focused': {
            color: '#2600AF',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: '#2600AF',
            },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          color: '#100066',
          '&.Mui-disabled': {
            color: '#7D7A93',
          },
        },
      },
    },
  },
  typography: {
    htmlFontSize: 10,
    allVariants: {
      fontFamily: 'Inter',
      textTransform: 'none',
    },
    h1: {
      fontFamily: 'Inter',
      fontSize: '9.6rem',
    },
    h2: {
      fontFamily: 'Inter',
      fontSize: '6rem',
    },
    h3: {
      fontFamily: 'Inter',
      fontSize: '4.8rem',
    },
    h4: {
      fontFamily: 'Inter',
      fontSize: '3.4rem',
    },
    h5: {
      fontSize: '2.4rem',
      fontFamily: 'Inter',
    },
    h6: {
      fontSize: '2rem',
      fontFamily: 'Inter',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: '1.6rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1.4rem',
      fontFamily: 'Inter',
    },
    subtitle1: {
      fontSize: '1.6rem',
      fontFamily: 'Inter',
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: '1.4rem',
      fontFamily: 'Inter',
      fontWeight: 700,
    },
    caption: {
      fontSize: '1.2rem',
      fontFamily: 'Inter',
    },
    overline: {
      fontSize: '1.2rem',
      fontFamily: 'Inter',
    },
    button: {
      fontFamily: 'Plus Jakarta Sans',
    },
  },
});
