import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/home/Home';
import Articles from './pages/articles/Articles';
import Layout from './layout/Layout';

const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/articles', element: <Articles /> },
      ],
    },
  ]);
};

export default Routes;
