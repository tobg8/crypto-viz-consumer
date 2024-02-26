import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SectionArticleSkeleton from './sectionArticle.skeleton';
import { CardArticle } from 'component/CardArticle';
import { IArticles } from 'core/articles';

const SectionArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsArticles, setItemsArticles] = useState<IArticles[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  function orderArticlesByUpdated(itemsArticles: IArticles[]): IArticles[] {
    itemsArticles.sort((a, b) => {
      const dateA = new Date(a.updated);
      const dateB = new Date(b.updated);
  
      return dateB.getTime() - dateA.getTime();
    });
  
    return itemsArticles;
  }

  useEffect(() => {
    const newEventSource = new EventSource('http://localhost:3001/articles', {withCredentials: true});

    setEventSource(newEventSource);

    newEventSource.onopen = () => {
      setIsLoading(false);
      setError(null);
    };
    newEventSource.onmessage = (event) => {
      const updatedArticle = JSON.parse(event.data);
      const oldArticles = itemsArticles

      setItemsArticles((orderArticlesByUpdated([...updatedArticle, ...oldArticles])));
    };

    newEventSource.onerror = () => {
      setIsLoading(false);
      setError('Failed to fetch articles');
      newEventSource.close()
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
        console.log(itemsArticles)

        setItemsArticles([...updatedArticle, ...itemsArticles])
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
  }, [eventSource]);

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
      return (
        <a key={index} href={data.url} target="_blank" rel="noopener noreferrer" style={{color: "black", textDecoration:"none"}}>
          <CardArticle options={data} />
        </a>
      );
    })}
  </Box>
    );
};

export default SectionArticle;
