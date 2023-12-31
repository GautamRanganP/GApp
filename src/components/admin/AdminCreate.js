import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
import { db } from '../../firebase/firebase'
// import { TextareaAutosize, TextField } from '@mui/material'

const AdminCreate = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [optionone, setOptionOne] = useState('')
  const [optiontwo, setOptionTwo] = useState('')
  const [startdateform, setStartDateForm] = useState(new Date())
  const [enddateform, setEndDateForm] = useState(new Date())
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/admin/home')
  }

  useEffect(() => {
    const tomorrow = moment().add(1, 'days')
    setEndDateForm(tomorrow._d)
  }, [])

  const addObjectToDatabase = (objectData) => {
    const newObjectRef = db.ref('poll').push()
    const id = newObjectRef.key
    objectData._id = id
    newObjectRef.set(objectData)
  }

  function createPollHandler (e) {
    e.preventDefault()
    console.log('Event', e)
    if (title === '' || description === '') {
      return
    }
    const startdate = moment(startdateform).format('DD/MM/YYYY')
    const enddate = moment(enddateform).format('DD/MM/YYYY')
    const votes = 0
    const optiononevote = 0
    const optiontwovote = 0
    const data = { title, description, startdate, enddate, votes, optionone, optiontwo, optiononevote, optiontwovote }
    // const token = Cookies.get('token')
    addObjectToDatabase(data)
    navigate('/admin/home')
  }

  const settingStartDate = useCallback((date) => {
    setStartDateForm(date)
  }, [])

  const settingEndDate = useCallback((date) => {
    setEndDateForm(date)
  }, [])

  return (
        <div className="wrap">
            <form onSubmit={createPollHandler} className="form-edit">
                <span style={{ fontSize: '24px', fontWeight: '700', width: '100%', display: 'inline-block', textAlign: 'center' }}>Create Poll</span>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="optionone">Option 1</label>
                    <input type="text" className="form-control" id="optionone" value={optionone} onChange={(e) => setOptionOne(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="optiontwo">Option 2</label>
                    <input type="text" className="form-control" id="optiontwo" value={optiontwo} onChange={(e) => setOptionTwo(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="startdate" className="form-label">Start Date</label>
                    <DatePicker
                        id="startdate"
                        dateFormat="dd/MM/yyyy"
                        showTimeSelect={false}
                        selected={startdateform}
                        onChange={settingStartDate}
                        minDate={moment()._d}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="enddate" className="form-label">End Date</label>
                    <DatePicker
                         id="enddate"
                         dateFormat="dd/MM/yyyy"
                         showTimeSelect={false}
                         selected={enddateform}
                         onChange={settingEndDate}
                         minDate={moment().add(1, 'days')._d}

                    />
                </div>
                <div className="button-form-wrap d-flex">
                    <button className="btn btn-primary btn-form" type="submit" style={{ marginRight: '20px', flex: 1 }}>Create</button>
                    <button className="btn btn-danger btn-form" type="button" onClick={handleCancel} style={{ flex: 1 }}>Cancel</button>
                </div>
            </form>
        </div>
  )
}

export default AdminCreate
