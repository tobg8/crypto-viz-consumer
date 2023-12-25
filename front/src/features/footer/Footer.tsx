import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';

const Footer = () => {
  return (
    <Box component={'footer'} sx={{ py: 4 }}>
      <Divider />
      <Stack>
        <Box>
          <List
            subheader={
              <ListSubheader
                sx={{ display: 'flex', justifyContent: 'center' }}
                component="div"
                id="nested-list-subheader"
              >
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemText primary="Single-line item" />
              <ListItemText primary="Single-line item" />
              <ListItemText primary="Single-line item" />
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Stack
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
        px={2}
      >
        <Typography>
          © {new Date().getFullYear()} CoinMarketCap. All rights reserved
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          CRYPTO-VIZ
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
