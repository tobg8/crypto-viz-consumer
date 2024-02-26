import { useParams } from 'react-router-dom';
import Store from '../../sectionArticle/sectionArticle.store';
import { useEffect } from 'react';
import Spinner from 'component/Spinner';
import { CardArticle } from 'component/CardArticle';
import { Box, Typography } from '@mui/material';

const CryptoTrendingPosts = () => {
  const { id } = useParams<{ id?: string }>();
  const { fetchHomePageArticles, itemsArtciles, isLoading } = Store.useStore();

  useEffect(() => {
    fetchHomePageArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterItemsArtciles = itemsArtciles.filter((article) => article.currencies.includes(id ?? ''));

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {filterItemsArtciles && filterItemsArtciles.length ? <Typography fontSize={'24px'} fontWeight={700}>You may be interested in these crypto articles</Typography> : null}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {filterItemsArtciles && filterItemsArtciles.map((data, index) => {
          return (
            <Box key={index}>
              <CardArticle options={data} />
            </Box>
          )
        })}
      </Box>
    </Box>
  );
};

export default CryptoTrendingPosts;

