import React, { useEffect } from 'react';
import { coinStatsStore } from './cryptoStats.store';

const CryptoStats = () => {
  const { coinStatsItems, getCoinStats, isLoading } = coinStatsStore(
    (state) => state
  );

  console.log('coinStatsItems', coinStatsItems);

  useEffect(() => {
    getCoinStats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>CryptoStats</div>;
};

export default CryptoStats;
