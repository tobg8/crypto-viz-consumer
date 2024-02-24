import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { useNavigate } from 'react-router-dom';

const pages: { title: string; link: string }[] = [
  { title: '🔥 Trending', link: '/trending-crypto' },
  { title: '📚 Articles', link: '/articles-crypto' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Divider />
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'inherit',
          width: '100%',
          padding: '0 16px 0 16px',
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '1350px',
        }}
      >
        <Toolbar disableGutters>
          <SsidChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#6610f2' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            CRYPTO-VIZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                cursor: 'pointer',
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => navigate(page.link)}>
                  <Typography textAlign="center">
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              fontSize: '16px',
              textDecoration: 'none',
            }}
          >
            CRYPTO-VIZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Typography
                key={index}
                variant="caption"
                onClick={() => navigate(page.link)}
                sx={{
                  my: 2,
                  mx: 2,
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {page.title}
              </Typography>
            ))}
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">🇫🇷</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>🇬🇧</MenuItem>
              <MenuItem value={20}>🇨🇳</MenuItem>
              <MenuItem value={30}>🇪🇸</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default Navbar;
