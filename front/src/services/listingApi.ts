import axiosInstance from './authInterceptor';

export const fetchListingCrypto = async () => {
  return await axiosInstance.get('/listings');
};

export const fetchCurrencyCryto = async () => {
  return await axiosInstance.get('/currencies');
};
