import { Dialog, DialogContent } from "@mui/material"
import Store from '../chartLine/chartLine.store';
import ChartCandles from "../chartCandles/ChartCandles";

const PopUpTrandingView = () => {
  const { openTrandingView, setOpenTrandingView } = Store.useStore((state) => state);

  return (
    <Dialog
      fullWidth
      open={openTrandingView}
      onClose={() => { setOpenTrandingView(false) }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ width: '100%' }}
    >
      <DialogContent>
        <ChartCandles />
      </DialogContent>
    </Dialog>
  )
}

export default PopUpTrandingView
