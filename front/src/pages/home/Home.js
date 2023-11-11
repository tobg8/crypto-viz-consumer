import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionArticle from '../../features/sectionArticle/SectionArticle';
import SectionListingCryptocurrency from '../../features/sectionListingCryptocurrency/SectionListingCryptocurrency';

const Home = () => {
  return (
    <>
      <Box px={1}>
        <Typography variant="h4">Crypto Daily Highlights</Typography>
        <Typography sx={{ color: 'rgb(88, 102, 126)' }}>
          Exploring the latest trends and news in the dynamic crypto landscape.
        </Typography>
      </Box>
      <SectionArticle />
      <Box px={1}>
        <Typography variant="h4">
          Today&apos;s Cryptocurrency Articles
        </Typography>
        <Typography sx={{ color: 'rgb(88, 102, 126)' }}>
          Discover real-time prices and trends in the volatile cryptocurrency
          market with Today&apos;s Cryptocurrency Prices.
        </Typography>
      </Box>
      <SectionListingCryptocurrency />
    </>
  );
};

export default Home;
