import { Outlet } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import { Box } from '@mui/material';
import MarqueeCrypto from 'features/navbar/MarqueeCrypto';

const Layout = () => {
  return (
    <>
      <MarqueeCrypto />
      <Navbar />
      <Box
        sx={{
          width: '100%',
          padding: '16px 16px 0 16px',
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '1350px',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
