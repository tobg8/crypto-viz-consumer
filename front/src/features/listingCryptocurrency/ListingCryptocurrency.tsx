import { useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useListingCryptocurencyStore from './listingCryptocurrency.store';
import ListingCryptocurrencySkeleton from './ListingCryptocurrency.skeleton';
import { ICurrencyCryto, IListingCrypto } from './core/interfaces';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => itemsMerged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsMerged, itemsListing, itemsCurrency]);

  // if (isLoading) return <ListingCryptocurrencySkeleton />;
  // if (error) return <Typography>error</Typography>;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="left">#</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="left">Name</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Price</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Price 24h</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Price % 24h</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">High 24h</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Low 24h</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Market cap</TableCell>
            <TableCell sx={{ fontSize: '.8rem', fontWeight: 500 }} align="right">Volume(24h)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merged &&
            merged.map((row: IListingCrypto | ICurrencyCryto) => {
              const isPositive = row.price_change_24h >= 0 ? 'positive' : 'negative';

              return (
                <TableRow
                  key={row.id}
                  onClick={() => console.log(row)}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    ':hover': {
                      backgroundColor: '#eff2f5',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontSize: '1rem' }}>
                      {row.market_cap_rank}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={row.image_url}
                      alt={row.identifier}
                      height={36}
                      width={36}
                      style={{ objectFit: 'cover', marginRight: '10px ' }}
                    />
                    <Typography className="text-ellipsis" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                      {row.identifier && row.identifier.charAt(0).toUpperCase()}
                      {row.identifier && row.identifier.slice(1)}
                    </Typography>
                    <Typography sx={{ color: '#808080', ml: 1, fontSize: '0.5rem', fontWeight: 500 }}>
                      {row.symbol && row.symbol.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '500' }}>
                      ${row.current_price}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
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
                        ${row.price_change_24h.toFixed(3)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        {row.price_change_percentage_24h.toFixed(3)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      ${row.high_24h}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      ${row.low_24h}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      ${row.market_cap.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ fontSize: '1rem', fontWeight: '400' }}>
                      ${row.total_volume.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectionListingCryptocurrency;
