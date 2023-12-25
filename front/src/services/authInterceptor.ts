import axios from 'axios';
import { useErrorHandler } from './authInterceptorErrorsHandler';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL as string,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    useErrorHandler.setState({ error: e });
    return Promise.reject(e);
  }
);

export default axiosInstance;
