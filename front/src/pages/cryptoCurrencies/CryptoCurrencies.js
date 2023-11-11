import React from 'react';
import { Grid } from '@mui/material';
import CryptoStats from '../../features/cryptoCurrencies/cryptoStats/CryptoStats';
import CryptoTrendingPosts from '../../features/cryptoCurrencies/cryptoTrendingPosts/CryptoTrendingPosts';
import HightCharts from '../../features/cryptoCurrencies/HightCharts';
import CryptoHighcharts from '../../features/cryptoCurrencies/cryptoHighcharts/CryptoHighcharts';

const CryptoCurrencies = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <CryptoStats />
      </Grid>
      <Grid item xs={8}>
        <HightCharts />
        <CryptoHighcharts />
      </Grid>
      <Grid item xs>
        <CryptoTrendingPosts />
      </Grid>
    </Grid>
  );
};

export default CryptoCurrencies;
