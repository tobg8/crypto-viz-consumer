import { useRoutes } from 'react-router-dom';
import CryptoCurrencies from 'pages/cryptoCurrencies/CryptoCurrencies';
import Home from 'pages/home/Home';
import Layout from 'layout/Layout';

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
          path: '/currencies',
          element: <CryptoCurrencies />
        },
        {
          path: '/articles',
          children: [
            {
              path: ':companyId/tokens',
              element: <CryptoCurrencies />
            },
            {
              path: ':companyId/currencies',
              element: <CryptoCurrencies />
            }
          ],
        },
      ],
    },
  ]);
};

export default Routes;
