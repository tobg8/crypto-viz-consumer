import { useRoutes } from 'react-router-dom';
import CryptoCurrencies from 'pages/cryptoCurrencies/CryptoCurrencies';
import Home from 'pages/home/Home';
import Layout from 'layout/Layout';
import ArticlesCrypto from 'pages/articles/ArticlesCrypto';
import TrendingCrypto from 'pages/trending/TrendingCrypto';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/currencies/:id',
          element: <CryptoCurrencies />
        },
        {
          path: '/trending-crypto',
          element: <TrendingCrypto />
        },
        {
          path: '/articles-crypto',
          element: <ArticlesCrypto />
        },
      ],
    },
  ]);
};

export default Routes;
