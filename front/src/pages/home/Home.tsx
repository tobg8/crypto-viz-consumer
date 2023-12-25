import { Box, Typography } from '@mui/material';
import SectionArticle from 'features/sectionArticle/SectionArticle';
import ListingCryptocurrency from 'features/listingCryptocurrency/ListingCryptocurrency';
import { theme } from 'style/theme';

const Home = () => {
  return (
    <>
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
        }}>
          Exploring the latest trends and news in the dynamic crypto landscape.
        </Typography>
      </Box >
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
