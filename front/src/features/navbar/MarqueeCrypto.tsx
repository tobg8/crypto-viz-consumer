import { Box, Typography } from "@mui/material"
import Store from '../listingCurrencies/listingCurrencies.store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import Marquee from 'react-fast-marquee';

const MarqueeCrypto = () => {
  const {
    isLoading,
    itemsListing,
    fetchListing,
    itemsCurrency,
    fetchCurrency,
    merged,
    itemsMerged,
  } = Store.useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      fetchListing();
      fetchCurrency();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => itemsMerged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsMerged, itemsListing, itemsCurrency]);

  if (isLoading) return <Typography>Loading</Typography>;

  return (
    <Box sx={{
      width: '100%',
      padding: '0 16px 0 16px',
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: '1350px',
    }}>
      <Box sx={{ display: 'flex', py: 0.5 }}>
        <Marquee speed={40} gradient={false} direction='left' style={{ gap: '24px' }}>
          {merged.slice(0, 6).map((items, index) => {
            const isPositive = items.price_change_24h && items.price_change_24h >= 0 ? 'positive' : 'negative';
            return (
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', cursor: 'pointer' }} key={index} onClick={() => navigate(`/currencies/${items.currency_id}`)}>
                <img src={items.image_url} alt={items.identifier} height={24} width={24} style={{ objectFit: 'cover' }} />
                <Typography fontSize={'16px'} fontWeight={600}>{items.name}</Typography>
                <Typography sx={{ color: '#808080', fontSize: '1rem', fontWeight: 500 }}>({items.symbol?.toLocaleUpperCase()})</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {isPositive === 'positive' ? (
                    <ArrowDropUpRoundedIcon style={{ fontSize: '1.5rem', color: '#16c784' }} />
                  ) : (
                    <ArrowDropDownRoundedIcon style={{ fontSize: '1.5rem', color: '#ea3943' }} />
                  )}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: isPositive === 'positive' ? '#16c784' : '#ea3943',
                    }}
                  >
                    ${items.price_change_24h && items.price_change_24h.toFixed(3)}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Marquee>
      </Box>
    </Box >
  )
}

export default MarqueeCrypto
