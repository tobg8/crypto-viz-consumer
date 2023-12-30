import { useEffect } from 'react';
import { useCoinStatsStore } from './cryptoStats.store';

const CryptoStats = () => {
  const { getCoinStats, isLoading } = useCoinStatsStore();

  useEffect(() => {
    getCoinStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>CryptoStats</div>;
};

export default CryptoStats;
