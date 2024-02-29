import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import CryptoStats from 'features/cryptoCurrencies/cryptoStats/CryptoStats';
import ChartLine from 'features/cryptoCurrencies/chartLine/ChartLine';
import CryptoTrendingPosts from 'features/cryptoCurrencies/cryptoTrendingPosts/CryptoTrendingPosts';
import StoreTrending from '../../features/trending/trending.store';
import { useEffect } from 'react';
import { CardArticleWrapper } from 'component/CardArticle/style';
import { useNavigate } from 'react-router-dom';

const CryptoCurrencies = () => {
  const navigate = useNavigate();
  const { itemsTrending, fetchTrending } = StoreTrending.useStore((state) => state);

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: 'flex', gap: '32px', flexDirection: 'column', pt: 2 }}>
      <Grid container spacing={2} flexWrap={'nowrap'} sx={{ rowGap: '16px', gap: '16px' }}>
        <Grid item xs={3}>
          <CryptoStats />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontSize={'24px'} fontWeight={700} pb={'10px'}>Top trending crypto</Typography>
            <Button variant="text" sx={{ color: '#6610f2', textDecoration: 'underline', fontSize: '14px' }} onClick={() => navigate('/trending-crypto')}>See all</Button>
          </Box>
          <CardArticleWrapper>
            {itemsTrending.slice(0, 5).map((items, index) => {
              return (
                <Typography key={index} fontSize={'14px'} fontWeight={700}>
                  🔥 #{index} - {items.item.name}
                </Typography>
              )
            })}
          </CardArticleWrapper>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={9}>
          <ChartLine />
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <CryptoTrendingPosts />
      </Grid>
    </Box>
  )
};

export default CryptoCurrencies;
