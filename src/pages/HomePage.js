import React, { useCallback, useEffect, useState } from 'react'
import PollCard from '../components/card/PollCard'
import { db } from '../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import moment from 'moment'

export function HomePage () {
  const [pollActiveData, setPollActiveData] = useState([])
  const [pollExpiredData, setPollExpiredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSelected, setIsSelected] = useState('')

  const handleOptionOne = useCallback((id, count, total) => {
    const objRef = db.ref('poll/' + id)
    const updatedData = {
      optiononevote: count,
      votes: ++total
    }
    objRef.update(updatedData).then(() => {
      console.log('object data updated successfully')
    }).catch(() => {
      console.error('error updating')
    })
  }, [])

  const handleOptionTwo = useCallback((id, count, total) => {
    const objRef = db.ref('poll/' + id)
    const updatedData = {
      optiontwovote: count,
      votes: ++total
    }
    objRef.update(updatedData).then(() => {
      console.log('object data updated successfully')
    }).catch(() => {
      console.error('error updating')
    })
  }, [])
  const handleTabFilter = (dataArray) => {
    const today = moment().format('YYYY/MM/DD').toString()
    setPollActiveData(dataArray.filter((poll) => {
      const end = moment(poll.data.enddate, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()
      return moment(end).isSameOrAfter(today)
    }))
    setPollExpiredData(dataArray.filter((poll) => {
      const end = moment(poll.data.enddate, 'DD/MM/YYYY').format('YYYY/MM/DD').toString()
      return moment(end).isSameOrBefore(today)
    }))
  }

  useEffect(() => {
    const fetchDataFromFirebase = () => {
      const dbRef = ref(db, 'poll')
      onValue(dbRef, (snapshot) => {
        const dataArray = []
        snapshot.forEach((childSnapshot) => {
          const keyName = childSnapshot.key
          const data = childSnapshot.val()
          dataArray.push({ key: keyName, data })
        })
        console.log('poll available', dataArray)
        handleTabFilter(dataArray)
        setLoading(false)
      })
    }
    setIsSelected('pollActive')
    fetchDataFromFirebase()

    // Clean up the event listener when the component unmounts
    return () => {
      db.ref('yourPath').off()
    }
  }, [])

  const handleTab = (event) => {
    if (event.target.getAttribute('name') === 'pollActive') {
      setIsSelected('pollActive')
    } else {
      setIsSelected('pollExpired')
    }
  }
  return (
        <div className="content-poll">
        { pollExpiredData.length > 0 && <div className="poll-tab">
              <div className ={`poll-tab-item ${isSelected === 'pollActive' ? 'active-poll' : ''}`} onClick={handleTab} name="pollActive" >Active Poll</div>
              <div className={`poll-tab-item ${isSelected === 'pollExpired' ? 'active-poll' : ''}`} onClick={handleTab} name="pollExpired" >Poll Expired</div>
           </div>}
            { pollActiveData.length > 0 && !loading && isSelected === 'pollActive' &&
              <div className="row poll-card-margin">
                    { pollActiveData.map((poll) => {
                      return (
                          <div className="col-sm-6 mb-4" key={poll.data._id}>
                                    <PollCard data={poll.data} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                          </div>
                      )
                    })
                    }
                </div>}
          { !pollActiveData.length > 0 && !loading && <div className='poll-empty'>
               No Poll Available
              </div>
}
{ pollExpiredData.length > 0 && !loading && isSelected === 'pollExpired' &&
              <div className="row poll-card-margin">
                    { pollExpiredData.map((poll) => {
                      return (
                          <div className="col-sm-6 mb-4" key={poll.data._id}>
                                    <PollCard data={poll.data} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                          </div>
                      )
                    })
                    }
                </div>}

            { loading && <div className="d-flex justify-content-center mt-4">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
            }
        </div>
  )
}
