import { Grid } from '@mui/material';
import CryptoStats from 'features/cryptoCurrencies/cryptoStats/CryptoStats';
import ChartLine from 'features/cryptoCurrencies/chartLine/ChartLine';
// import ChartTest from 'features/cryptoCurrencies/chartTest/ChartTest';
import ChartOhlc from 'features/cryptoCurrencies/chartOhlc/ChartOhlc';

const CryptoCurrencies = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CryptoStats />
      </Grid>
      <Grid item xs={9}>
        <ChartLine />
        {/* <ChartTest /> */}
        <ChartOhlc />
      </Grid>
    </Grid>
  );
};

export default CryptoCurrencies;
