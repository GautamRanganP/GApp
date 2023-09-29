import * as React from 'react'
import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { ChartPoll } from '../chart/chart'
import './PollDetails.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function PollDetails (props) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    title,
    description
  } = props.data

  return (
    <div className='poll-details-wrap'>
      <button className='poll-details-button btn btn-primary' onClick={handleOpen}>View Detail</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" className="modal-container-wrap" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span className="modal-description-text">{description}</span>
          <ChartPoll data={props.data}></ChartPoll>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
