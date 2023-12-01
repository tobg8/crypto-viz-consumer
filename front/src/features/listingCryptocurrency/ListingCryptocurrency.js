import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import useListingCryptocurencyStore from './listingCryptocurrency.store';
import ListingCryptocurrencySkeleton from './ListingCryptocurrency.skeleton';

const SectionListingCryptocurrency = () => {
  const {
    isLoading,
    error,
    itemsListing,
    fetchListing,
    itemsCurrency,
    fetchCurrency,
    merged,
    itemsMerged,
  } = useListingCryptocurencyStore();

  useEffect(() => {
    return () => {
      fetchListing();
      fetchCurrency();
    };
  }, []);

  useEffect(() => {
    return () => itemsMerged();
  }, [itemsMerged, itemsListing, itemsCurrency]);

  console.log('merged::=>', merged);

  if (isLoading) return <ListingCryptocurrencySkeleton />;
  if (error) return <Typography>error</Typography>;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Price change 24h</TableCell>
            <TableCell align="right">Price change percentage 24h</TableCell>
            <TableCell align="right">High 24h</TableCell>
            <TableCell align="right">Low 24h</TableCell>
            <TableCell align="right">Market cap</TableCell>
            <TableCell align="right">Total volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merged &&
            merged.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => console.log(row)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  ':hover': {
                    backgroundColor: '#808080',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell>{row.market_cap_rank}</TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={row.image_url}
                    alt={row.identifier}
                    height={40}
                    width={40}
                    style={{ objectFit: 'cover', marginRight: '10px ' }}
                  />
                  <Typography variant="h6" className="text-ellipsis">
                    {row.identifier && row.identifier.charAt(0).toUpperCase()}
                    {row.identifier && row.identifier.slice(1)}
                  </Typography>
                  <Typography sx={{ color: '#808080', ml: 1 }}>
                    {row.symbol && row.symbol.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.current_price}</TableCell>
                <TableCell align="right">${row.price_change_24h}</TableCell>
                <TableCell align="right">
                  {row.price_change_percentage_24h}%
                </TableCell>
                <TableCell align="right">{row.high_24h}</TableCell>
                <TableCell align="right">{row.low_24h}</TableCell>
                <TableCell align="right">${row.market_cap}</TableCell>
                <TableCell align="right">${row.total_volume}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectionListingCryptocurrency;
