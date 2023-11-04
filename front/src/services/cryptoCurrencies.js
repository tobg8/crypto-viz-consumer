import axiosInstance from './authInterceptor';

export const getTrendingPosts = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/e380d0d7-af69-41a3-ae6a-f859f89b66f8'
  );
};

export const getCoinStats = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/325f1a16-8f41-49a7-8cd7-fa6a6a64c9de'
  );
};
