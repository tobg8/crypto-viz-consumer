import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SectionArticleSkeleton from './sectionArticle.skeleton';
import { CardArticle } from 'component/CardArticle';
import { IArticles } from 'core/articles';

const SectionArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsArticles, setItemsArticles] = useState<IArticles[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/articles');

    eventSource.onopen = () => {
      setIsLoading(false);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      const updatedArticle = JSON.parse(event.data);
      setItemsArticles(updatedArticle);
    };

    eventSource.onerror = () => {
      setIsLoading(false);
      setError('Failed to fetch articles');
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <SectionArticleSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '24px 0',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      {itemsArticles.slice(0, 3).map((data, index) => {
        return <CardArticle key={index} options={data} />;
      })}
    </Box>
  );
};

export default SectionArticle;
