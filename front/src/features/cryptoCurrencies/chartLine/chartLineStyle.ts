import {
  styled,
  InputBase,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from '@mui/material';

export const StyledToggleButton = styled(ToggleButtonGroup)({
  '& .MuiToggleButton-root': { padding: 0, margin: 0 },
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    backgroundColor: '#ffffff',
    border: 0,
    borderRadius: 4,
    margin: '8px',
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
});

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    display: 'flex',
    gap: '16px',
    position: 'relative',
    backgroundColor: '#eff2f5',
    padding: '0 16px',
    fontSize: 16,
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
