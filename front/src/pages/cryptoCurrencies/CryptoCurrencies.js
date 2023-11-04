import React from 'react';
import CryptoStats from '../../features/CryptoCurrencies/cryptoStats/CryptoStats';
import CryptoTrendingPosts from '../../features/CryptoCurrencies/cryptoTrendingPosts/CryptoTrendingPosts';
import HightCharts from '../../features/CryptoCurrencies/HightCharts';
import { Grid } from '@mui/material';

const CryptoCurrencies = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <CryptoStats />
      </Grid>
      <Grid item xs={8}>
        <HightCharts />
      </Grid>
      <Grid item xs>
        <CryptoTrendingPosts />
      </Grid>
    </Grid>
  );
};

export default CryptoCurrencies;
