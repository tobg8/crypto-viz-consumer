import { Box, Switch, Typography } from '@mui/material';
import SectionArticle from 'features/sectionArticle/SectionArticle';
import ListingCryptocurrency from 'features/listingCryptocurrency/ListingCryptocurrency';
import { theme } from 'style/theme';

const Home = () => {
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box px={1}>
          <Typography sx={{
            backgroundColor: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: '24px',
          }}>Crypto Daily Highlights</Typography>
          <Typography sx={{
            color: 'rgb(88, 102, 126)',
            fontWeight: 400,
            fontSize: '14px',
            display: 'flex',
            gap: '10px'
          }}>
            Exploring the latest trends and news in the dynamic crypto landscape. <Box sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#6610f2', fontWeight: 600 }}>Voir plus</Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{
            color: 'rgb(88, 102, 126)',
            fontWeight: 400,
            fontSize: '14px',
            display: 'flex',
            gap: '10px'
          }}>Highlights</Typography>
          <Switch {...label} defaultChecked />
        </Box>
      </Box>
      <SectionArticle />
      <Box px={1}>
        <Typography sx={{
          backgroundColor: theme.palette.primary.main,
          fontWeight: 700,
          fontSize: '24px',
        }}>
          Today&apos;s Cryptocurrency Articles
        </Typography>
        <Typography sx={{
          color: 'rgb(88, 102, 126)',
          fontWeight: 400,
          fontSize: '14px',
        }}>
          Discover real-time prices and trends in the volatile cryptocurrency
          market with Today&apos;s Cryptocurrency Prices.
        </Typography>
      </Box>
      <ListingCryptocurrency />
    </>
  );
};

export default Home;
