import React, { useEffect } from 'react';
import Store from './trending.store';
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TableWrapper } from 'features/listingCurrencies/style';
import { ListingCurrenciesTableCell, ListingCurrenciesTableRow } from './style';
import Spinner from 'component/Spinner';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

const Trending = () => {
  const { itemsTrending, fetchTrending, isLoading } = Store.useStore((state) => state);

  useEffect(() => {
    fetchTrending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const topThreeCryptos = itemsTrending.slice(0, 3).map((item) => ({
    name: item?.item?.name,
    priceChange: item?.item?.data?.price_change_percentage_24h?.usd,
  }));

  if (isLoading) return <Spinner />

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'column'
      }}>
        <Typography fontSize={'24px'} fontWeight={700}>Top Trending Cryptocurrencies Today</Typography>
        <Typography fontSize={'14px'} fontWeight={400} color={'rgb(88, 102, 126)'}>
          Discover the top <span style={{ color: '#6610f2', fontWeight: '700' }}>trending cryptocurrencies</span> on Crypto Viz.
          This list is sorted by coins that are most searched for in the last 3 hours. {' '}
          {topThreeCryptos.map((crypto, index) => (
            <React.Fragment key={crypto.name}>
              {crypto.name}
              {index < 2 ? ',' : ''}
            </React.Fragment>
          ))}
          {topThreeCryptos.length > 0 && (
            <> are the top trending crypto now. </>
          )}
          {topThreeCryptos.length > 0 && (
            <>
              In the past 24 hours, the price of {topThreeCryptos[0].name} changed by {topThreeCryptos[0].priceChange.toFixed(1)}%, {' '}
              {topThreeCryptos[1].name} price changed by {topThreeCryptos[1].priceChange.toFixed(1)}%, and{' '}
              {topThreeCryptos[2].name} price changed by {topThreeCryptos[2].priceChange.toFixed(1)}%.
            </>
          )}
        </Typography>
      </Box>
      <TableContainer>
        <TableWrapper>
          <TableHead>
            <TableRow>
              <ListingCurrenciesTableCell align="left">#</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="left">Name</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="right">Price</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="right">Price 24h</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="right">Volume(24h)</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="right">Market cap</ListingCurrenciesTableCell>
              <ListingCurrenciesTableCell align="right">Last 7 Days</ListingCurrenciesTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsTrending.map((items, index) => {
              const isPositive = items.item.data.price_change_percentage_24h.usd >= 0 ? 'positive' : 'negative';

              return (
                <ListingCurrenciesTableRow key={index}>
                  <TableCell>
                    <Typography sx={{ fontSize: '1rem' }}>{items.item.market_cap_rank}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={items.item.small}
                        alt={items.item.symbol}
                        height={36}
                        width={36}
                        style={{ objectFit: 'cover', }}
                      />
                      <Typography className="text-ellipsis" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                        {items.item.name && items.item.name.charAt(0).toUpperCase()}
                        {items.item.name && items.item.name.slice(1)}
                      </Typography>
                      <Typography sx={{ color: '#808080', fontSize: '0.5rem', fontWeight: 500 }}>
                        {items.item.symbol && items.item.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '500' }}>
                      {items.item.data.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {isPositive === 'positive' ? (
                        <ArrowDropUpRoundedIcon style={{ fontSize: '1.5rem', color: '#16c784' }} />
                      ) : (
                        <ArrowDropDownRoundedIcon style={{ fontSize: '1.5rem', color: '#ea3943' }} />
                      )}
                      <Typography sx={{
                        fontSize: '1rem',
                        fontWeight: '400',
                        color: isPositive === 'positive' ? '#16c784' : '#ea3943',
                      }}>
                        {items.item.data.price_change_percentage_24h.usd.toFixed(3)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      {items.item.data.total_volume.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      {items.item.data.market_cap.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <img
                      src={items.item.data.sparkline}
                      alt={`sparkline ${items.item.name}`}
                    />
                  </TableCell>
                </ListingCurrenciesTableRow>
              )
            })}
          </TableBody>
        </TableWrapper>
      </TableContainer>
    </Box>
  )
}

export default Trending
