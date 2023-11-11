import React, { useEffect } from 'react';
import { coinStatsStore } from './cryptoStats.store';

const CryptoStats = () => {
  const { getCoinStats, isLoading } = coinStatsStore();

  useEffect(() => {
    getCoinStats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>CryptoStats</div>;
};

export default CryptoStats;
