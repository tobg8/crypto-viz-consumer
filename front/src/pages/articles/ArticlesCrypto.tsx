import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { IArticles } from 'core/articles';
import { theme } from 'style/theme';
import moment from 'moment';

const ArticlesCrypto = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsArticles, setItemsArticles] = useState<IArticles[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);


  useEffect(() => {
    const newEventSource = new EventSource('http://localhost:3001/articles', { withCredentials: true });
    setEventSource(newEventSource)
    newEventSource.onopen = () => {
      setIsLoading(false);
      setError(null);
    };


    newEventSource.onmessage = (event) => {
      const updatedArticle = JSON.parse(event.data);
      const oldArticles = itemsArticles
      setItemsArticles([...updatedArticle, ...oldArticles]);
    };

    newEventSource.onerror = () => {
      setIsLoading(false);
      setError('Failed to fetch articles');
    };

    return () => {
      if (newEventSource) {
        newEventSource.close();
      }
    };
  }, []);

  useEffect(() => {
    if (eventSource) {
      eventSource.onopen = () => {
        setIsLoading(false);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        const updatedArticle = JSON.parse(event.data);
        const oldArticles = itemsArticles

        setItemsArticles([...updatedArticle, ...oldArticles])
      };

      eventSource.onerror = () => {
        console.log("error")
        setIsLoading(false);
        setError('Failed to fetch articles');
      };
    }

    return () => {
      if (eventSource) {
        eventSource.onopen = null;
        eventSource.onmessage = null;
        eventSource.onerror = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsArticles]);

  const getRandomEmojis = () => {
    const emojis = ['🔥', '🚀', '💡', '🌟', '✨'];
    const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    return shuffledEmojis.slice(0, 1);
  };

  if (isLoading) return <div>loading</div>;
  if (error) return <div>Error: {error}</div>;

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
            <a key={index} href={data.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: "black" }}>
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
            </a>
          </Grid>
        )
      })}
    </Grid>
  )
};

export default ArticlesCrypto;
