import React, { useEffect } from 'react';
import { useCoinStatsStore } from './cryptoStats.store';

const CryptoStats = () => {
  const { getCoinStats, isLoading } = useCoinStatsStore();

  useEffect(() => {
    getCoinStats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>CryptoStats</div>;
};

export default CryptoStats;
