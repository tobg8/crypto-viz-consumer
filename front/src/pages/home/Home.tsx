import { Box, Typography } from '@mui/material';
import SectionArticle from 'features/sectionArticle/SectionArticle';
import ListingCurrencies from 'features/listingCurrencies/ListingCurrencies';
import { theme } from 'style/theme';
import { useNavigate } from 'react-router-dom';
import Store from '../../features/listingCurrencies/listingCurrencies.store';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const { reset } = Store.useStore((state) => state);

  useEffect(() => {
    reset();
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          Exploring the latest trends and news in the dynamic crypto landscape. <Box onClick={() => navigate('/articles-crypto')} sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#6610f2', fontWeight: 600 }}>Read More</Box>
        </Typography>
      </Box>
      <SectionArticle />
      <Box>
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
          Discover <span style={{ color: '#6610f2', fontWeight: '700' }}>real-time</span> prices and <span style={{ color: '#6610f2', fontWeight: '700' }}>trends</span> in the volatile cryptocurrency
          market with Today&apos;s Cryptocurrency Prices.
        </Typography>
      </Box>
      <ListingCurrencies />
    </>
  );
};

export default Home;
