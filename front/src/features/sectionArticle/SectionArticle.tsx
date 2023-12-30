import { useEffect } from 'react';
import SectionArticleSkeleton from './sectionArticleSkeleton';
import { Box } from '@mui/material';
import useHomePageArticlesStore from './sectionArticle.store';
import { CardArticle } from 'component/CardArticle';

const SectionArticle = () => {
  const { itemsArtciles, fetchHomePageArticles, isLoading, error } =
    useHomePageArticlesStore();

  useEffect(() => {
    fetchHomePageArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHomePageArticles]);

  console.log(itemsArtciles)
  if (isLoading) return <SectionArticleSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '24px 0',
        alignItems: 'flex-start',
      }}
    >
      {itemsArtciles.slice(0, 3).map((data, index) => {
        return (
          <CardArticle key={index} options={data} />
        );
      })}
    </Box>
  );
};

export default SectionArticle;
