import { useNavigate } from 'react-router-dom'
import React from 'react'
// import Cookies from 'js-cookie'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PollIcon from '@mui/icons-material/Poll'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import './card.scss'
import { db } from '../../firebase/firebase'

const PollAdmin = (props) => {
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState('')
  const { title, description, _id, votes, optiononevote, optiontwovote, startdate, enddate, optionone, optiontwo } = props.data
  const navigate = useNavigate()
  const handlerNavigation = () => {
    navigate(`/admin/edit/${_id}`)
  }
  const handleDeleteOption = () => {
    setOpen(true)
    setType('delete')
  }
  const handleResetOption = () => {
    setOpen(true)
    setType('reset')
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleYesClose = () => {
    setOpen(false)
    if (type === 'delete') { handleDelete() }
    if (type === 'reset') { handleReset() }
  }
  const handleNoClose = () => {
    setOpen(false)
  }
  function handleDelete () {
    const objRef = db.ref('poll/' + _id)
    objRef.remove().then(() => {
      console.log('object data deleted successfully')
    }).catch(() => {
      console.error('error updating')
    })
  }

  function handleReset () {
    const objRef = db.ref('poll/' + _id)
    const updatedData = {
      optiononevote: 0,
      optiontwovote: 0,
      votes: 0
    }
    objRef.update(updatedData).then(() => {
      console.log('object data updated successfully')
    }).catch(() => {
      console.error('error updating')
    })
  }

  return (
    <div>
        <div>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title">
            <DialogTitle id="alert-dialog-title">
              Are you sure want to {type} ?
            </DialogTitle>
            <DialogActions className='model-button-wrap'>
              <button className="btn btn-danger model-button" onClick={handleYesClose}>Yes</button>
              <button className="btn btn-success model-button" onClick={handleNoClose}>No</button>
              {/* <Button onClick={handleYesClose}> Yes </Button>
              <Button onClick={handleNoClose} autoFocus> No </Button> */}
            </DialogActions>
          </Dialog>
        </div>
        <div className="card admin-card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="votes-wrap-admin">
              <span><HowToVoteIcon className='icon-admin-page'/><span>{optionone} : {optiononevote}</span></span>
              <span><HowToVoteIcon className='icon-admin-page'/><span>{optiontwo} : {optiontwovote}</span></span>
              <span><PollIcon className='icon-admin-page'/><span>Total Votes : {votes}</span></span>
              <span><CalendarTodayIcon className='icon-admin-page'/><span>Start Date : {startdate}</span></span>
              <span><CalendarTodayIcon className='icon-admin-page'/><span>End Date : {enddate}</span></span>
            </div>
            <div className="btn-admin-wrap">
              <button className="btn btn-primary" type="button" onClick = {handlerNavigation}>Edit</button>
              <button className="btn btn-danger" type="button" onClick ={handleDeleteOption}>Delete</button>
              <button className="btn btn-success" type="button" onClick ={handleResetOption}>Reset</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PollAdmin
