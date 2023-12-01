import axiosInstance from './authInterceptor';

export const getHomePageArticles = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/6c2392dc-51bd-4404-b2de-ac04c830c5b2'
  );
};
