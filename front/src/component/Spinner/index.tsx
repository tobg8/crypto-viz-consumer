import { Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}

export default Spinner
