import { Box, styled } from '@mui/material';

export const CardArticleWrapper = styled(Box)({
  width: '33%',
  maxWidth: '448px',
  height: '200px',
  padding: '10px',
  boxShadow:
    'rgba(88, 102, 126, 0.08) 0px 4px 24px, rgba(88, 102, 126, 0.12) 0px 1px 2px',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'grid',
  alignContent: 'space-between',
});
