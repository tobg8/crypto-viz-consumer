import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { IArticles } from 'core/articles';
import { theme } from 'style/theme';
import moment from 'moment';

const ArticlesCrypto = () => {
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
  }, []);

  const getRandomEmojis = () => {
    const emojis = ['🔥', '🚀', '💡', '🌟', '✨'];
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    return shuffledEmojis.slice(0, 1);
  };

  if (isLoading) return <div>loading</div>;
  if (error) return <div>Error: {error}</div>;

  console.log('itemsArticles SALT', itemsArticles)

  return (
    <Grid container sx={{
      gap: '1rem',
      justifyContent: 'space-between'
    }}>
      {itemsArticles.map((data, index) => {
        const formattedDate = moment(data.created).format('MMMM Do YYYY, h:mm:ss a');
        return (
          <Grid item xs={12} md={3} key={`grid-item-${index}`}
            sx={{
              boxShadow: '#6610f2 0px 1px 4px, rgba(88, 102, 126, 0.12) 0px 10px 20px',
              borderRadius: '8px',
              padding: '1rem',
            }}>
            <Box key={index} className="CardArticle">
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '20px',
                  }}
                >{data.source} {getRandomEmojis().map((emoji, index) => <span key={index}>{emoji}</span>)}</Typography>
              </Box>
              <Typography sx={{
                fontWeight: 500,
                fontSize: '20px',
                display: 'flex',
                gap: '10px'
              }}>
                {data.title}
              </Typography>
              <Typography sx={{
                color: 'rgb(88, 102, 126)',
                fontWeight: 400,
                fontSize: '14px',
                display: 'flex',
                gap: '10px'
              }}>
                {formattedDate}
              </Typography>
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
};

export default ArticlesCrypto;
