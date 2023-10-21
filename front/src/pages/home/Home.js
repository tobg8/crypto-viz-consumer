import React from 'react';
import Article from '../../features/article/Article';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '16px 16px 0 16px',
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: '1402px',
      }}
    >
      <Box px={1}>
        <Typography variant="h4">Crypto Daily Highlights</Typography>
        <Typography sx={{ color: 'rgb(88, 102, 126)' }}>
          Exploring the latest trends and news in the dynamic crypto landscape.
        </Typography>
      </Box>
      <Article />
      <Box px={1}>
        <Typography variant="h4">
          Today&apos;s Cryptocurrency Articles
        </Typography>
        <Typography sx={{ color: 'rgb(88, 102, 126)' }}>
          Discover real-time prices and trends in the volatile cryptocurrency
          market with Today&apos;s Cryptocurrency Prices.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
