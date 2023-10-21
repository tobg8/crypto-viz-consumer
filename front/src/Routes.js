import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './layout/Layout';
import Articles from './pages/articles/Articles';
import Cryptocurrencies from './pages/cryptocurrencies/Cryptocurrencies';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/cryptocurrencies', element: <Cryptocurrencies /> },
        { path: '/articles', element: <Articles /> },
      ],
    },
  ]);
};

export default Routes;
