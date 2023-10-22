import React from 'react';
import SectionPrice from './SectionPrice';
import HightCharts from './HightCharts';
import SectionNews from './SectionNews';
import { Grid } from '@mui/material';

const Cryptocurrencies = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <SectionPrice />
      </Grid>
      <Grid item xs={8}>
        <HightCharts />
      </Grid>
      <Grid item xs>
        <SectionNews />
      </Grid>
    </Grid>
  );
};

export default Cryptocurrencies;
