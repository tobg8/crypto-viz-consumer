import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme';

const pages = [
  { title: 'Cryptocurrencies', link: '/cryptocurrencies' },
  { title: 'Articles', link: '/articles' },
  { title: 'Community', link: '/' },
  { title: 'Products', link: '/' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
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
        sx={{ backgroundColor: 'white', boxShadow: 'inherit' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              color={theme.palette.text.primary}
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                cursor: 'pointer',
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
                color={theme.palette.text.primary}
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
                  color: theme.palette.text.primary,
                  cursor: 'pointer',
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={() => navigate(page.link)}>
                    <Typography
                      textAlign="center"
                      color={theme.palette.text.primary}
                    >
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
              color={theme.palette.text.primary}
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
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
                    color: theme.palette.text.primary,
                    cursor: 'pointer',
                  }}
                >
                  {page.title}
                </Typography>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </>
  );
};

export default Navbar;
