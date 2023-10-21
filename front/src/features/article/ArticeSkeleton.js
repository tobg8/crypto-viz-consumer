import { Skeleton } from '@mui/material';
import React from 'react';

const ArticeSkeleton = () => {
  return (
    <div>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </div>
  );
};

export default ArticeSkeleton;
