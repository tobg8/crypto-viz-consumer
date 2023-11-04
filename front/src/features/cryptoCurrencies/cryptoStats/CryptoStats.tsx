import { useEffect } from 'react';
import { useCoinStatsStore } from './cryptoStats.store';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { TypographyTitle, TypographyTitlePrice } from './style';

const CryptoStats = () => {
  const { getCoinStats, isLoading, coinStatsItems } = useCoinStatsStore();

  useEffect(() => {
    getCoinStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack>
      <Box>
        {coinStatsItems.map((stats, index) => {
          const isPositive = stats.price_change_24h && stats.price_change_24h >= 0 ? 'positive' : 'negative';

          return (
            <Box key={index}>
              <Chip label={`Rang #${stats.market_cap_rank}`} variant='outlined' />
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <img
                  src={stats.image_url}
                  alt={stats.identifier}
                  height={36}
                  width={36}
                  style={{ objectFit: 'cover', marginRight: '10px ' }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  {stats.identifier && stats.identifier.charAt(0).toUpperCase()}
                  {stats.identifier && stats.identifier.slice(1)}
                </Typography>
                <Typography sx={{ color: '#808080', ml: 1, fontSize: '1rem', fontWeight: 500 }}>{stats.symbol?.toLocaleUpperCase()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', pb: '2rem' }}>
                <Typography sx={{ fontWeight: '500' }}>{stats.current_price} $US</Typography>
                {isPositive === 'positive' ? (
                  <ArrowDropUpRoundedIcon style={{ fontSize: '2.5rem', color: '#16c784' }} />
                ) : (
                  <ArrowDropDownRoundedIcon style={{ fontSize: '2.5rem', color: '#ea3943' }} />
                )}
                <Typography sx={{ color: isPositive === 'positive' ? '#16c784' : '#ea3943', }}>
                  {stats.price_change_percentage_24h && stats.price_change_percentage_24h.toFixed(3)} %
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', pb: '1rem' }}>
                <Stack>
                  <TypographyTitle>changement de prix 24h</TypographyTitle>
                  <TypographyTitlePrice>{stats.price_change_24h}</TypographyTitlePrice>
                </Stack>
                <Stack>
                  <TypographyTitle>changement de prix 24h en %</TypographyTitle>
                  <TypographyTitlePrice>{stats.price_change_percentage_24h}</TypographyTitlePrice>
                </Stack>
                <Stack>
                  <TypographyTitle>approvisionnement en circulation</TypographyTitle>
                  <TypographyTitlePrice>${stats.circulating_supply}</TypographyTitlePrice>
                </Stack>
                <Stack>
                  <TypographyTitle>Volume Total</TypographyTitle>
                  <TypographyTitlePrice>${stats.total_volume}</TypographyTitlePrice>
                </Stack>
                <Stack>
                  <TypographyTitle>Valorisation entièrement diluée</TypographyTitle>
                  <TypographyTitlePrice>${stats.fully_diluted_valuation}</TypographyTitlePrice>
                </Stack>
                <Stack>
                  <TypographyTitle>approvisionnement total</TypographyTitle>
                  <TypographyTitlePrice>${stats.total_supply}</TypographyTitlePrice>
                </Stack>
              </Box>
              <Divider />
            </Box>
          )
        })}
      </Box>
    </Stack >
  )
};

export default CryptoStats;