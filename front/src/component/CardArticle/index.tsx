import { FC } from 'react';
import { CardArticleWrapper } from './style';
import { ICardArticleProps } from './interfaces';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { theme } from 'style/theme';

export const CardArticle: FC<ICardArticleProps> = (
  ({
    options: {
      created,
      source,
      title,
      url,
    }
  }) => {
    const navigate = useNavigate();
    const formattedDate = moment(created).format('MMMM Do YYYY, h:mm:ss a');
    const getRandomEmojis = () => {
      const emojis = ['🔥', '🚀', '💡', '🌟', '✨'];
      const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
      return shuffledEmojis.slice(0, 1);
    };

    return (
      <CardArticleWrapper className="CardArticle">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              backgroundColor: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: '20px',
            }}
          >{source} {getRandomEmojis().map((emoji, index) => <span key={index}>{emoji}</span>)}</Typography>
          <Typography sx={{
            backgroundColor: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#6610f2',
          }} onClick={() => navigate(`https://www.${url}`)}>voir plus</Typography>
        </Box>
        <Typography sx={{
          fontWeight: 500,
          fontSize: '20px',
          display: 'flex',
          gap: '10px'
        }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex' }}>
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
      </CardArticleWrapper >
    )
  }
);

CardArticle.displayName = 'Components_CardArticle';
