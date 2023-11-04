import { Box, Typography } from '@mui/material';
import SectionArticle from 'features/sectionArticle/SectionArticle';
import ListingCurrencies from 'features/listingCurrencies/ListingCurrencies';
import { theme } from 'style/theme';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box px={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
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
            Exploring the latest trends and news in the dynamic crypto landscape. <Box onClick={() => navigate('/articles')} sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#6610f2', fontWeight: 600 }}>Read More</Box>
          </Typography>
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
      <ListingCurrencies />
    </>
  );
};

export default Home;
