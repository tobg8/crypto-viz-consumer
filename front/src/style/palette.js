import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  main: '#3861fb',
  light: '#2549a3',
  lighterBlue: '#e3e9fa',
  darkBlue: '#031d57',
};

const SECONDARY = {
  main: '#EFEFEF',
  black: '#000000',
  light: '#f7f7f7',
  lighter: '#f39fcc',
};

const palette = {
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  white: '#fff',
  grey: GREY,
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
};

export default palette;
