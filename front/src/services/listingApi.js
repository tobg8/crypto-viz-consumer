import axiosInstance from './authInterceptor';

export const fetchListingCrypto = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/805b2c0d-f261-486a-ae35-a43bdf02913e'
  );
};

export const fetchCurrencyCryto = async () => {
  return await axiosInstance.get(
    'https://run.mocky.io/v3/dccdf33f-9e13-46fc-949b-998c5a15a649'
  );
};
