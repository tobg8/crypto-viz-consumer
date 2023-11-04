import axios from 'axios';
import axiosInstance from './authInterceptor';

export const getTrendingPosts = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/4ab9242c-d33d-40d3-b35d-161272e19b4a'
  );
};

export const getCoinStats = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/37ef1a24-4fb9-4732-af57-2288afa46d5b'
  );
};

export const getDataHLCChart = async (
  symbol: string,
  chartType: string,
  range: number
) => {
  return await axios.get(`/prices/${symbol}/${chartType}/${range}`);
};
