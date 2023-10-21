import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionArticlesSkeleton from './SectionArticlesSkeleton';
import { Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment';
import { theme } from '../../style/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SectionArticles = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios(
          'https://run.mocky.io/v3/6c2392dc-51bd-4404-b2de-ac04c830c5b2'
        );
        const json = await response.data;
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  console.log('error::=>', error);

  if (!loaded) {
    return (
      <div>
        <SectionArticlesSkeleton />
      </div>
    );
  }

  const pagination = {
    clickable: true,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '24px 0',
        alignItems: 'flex-start',
      }}
    >
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={pagination}
        modules={[Pagination]}
        style={{ padding: '8px' }}
      >
        {data.map(({ data }, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  boxShadow:
                    'rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'grid',
                  alignContent: 'space-between',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '26px',
                      marginBottom: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    <Tooltip title={data.title} arrow>
                      <Typography
                        className="text-ellipsis"
                        maxWidth={350}
                        variant="h6"
                      >
                        {data.title}
                      </Typography>
                    </Tooltip>
                    <Button
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => window.open(data.link, '_blank')}
                    >
                      More
                    </Button>
                  </Box>
                  <Stack
                    maxWidth={420}
                    flexDirection={'row'}
                    alignItems={'center'}
                    sx={{ overflow: 'auto' }}
                  >
                    {data.categories ? (
                      data.categories.map((category, index) => (
                        <Tooltip key={index} title={category} arrow>
                          <Chip
                            label={category}
                            sx={{
                              marginRight: 0.5,
                              backgroundColor:
                                theme.palette.primary.lighterBlue,
                              color: theme.palette.primary.light,
                            }}
                          />
                        </Tooltip>
                      ))
                    ) : (
                      <div style={{ height: '32px' }}></div>
                    )}
                  </Stack>
                </Box>
                <Stack justifyContent={'flex-start'} height={90} pt={0.5}>
                  <Typography className="text-ellipsis--2">
                    description test
                  </Typography>
                </Stack>
                <Stack
                  justifyContent={'space-between'}
                  flexDirection={'row'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h6"
                    color={theme.palette.primary.darkBlue}
                    className="text-ellipsis"
                  >
                    {data.author}
                  </Typography>
                  <Typography variant="body2">
                    {moment(data.publication_date).format('MMMM Do YYYY')}
                  </Typography>
                </Stack>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default SectionArticles;
