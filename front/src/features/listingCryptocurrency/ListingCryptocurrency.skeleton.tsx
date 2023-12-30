import { Box, Skeleton, Avatar, Stack } from '@mui/material';

const SkeletonBox = () => (
  <Box display={'flex'} pb={1}>
    <Skeleton variant="circular">
      <Avatar />
    </Skeleton>
    <Skeleton animation="wave" width={'100%'} />
  </Box>
);

const ListingCryptocurrencySkeleton = () => {
  return (
    <Stack sx={{ width: '100%', px: 1, pt: 2 }}>
      {[...Array(20)].map((_, index) => (
        <SkeletonBox key={index} />
      ))}
    </Stack>
  );
};

export default ListingCryptocurrencySkeleton;
