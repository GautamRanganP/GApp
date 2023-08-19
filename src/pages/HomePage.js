import React, { useCallback, useEffect, useState } from 'react'
import PollCard from '../components/card/PollCard'
import db from '../components/admin/firebase'
import { ref, onValue } from 'firebase/database'

export function HomePage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

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
        setData(dataArray)
        setLoading(false)
      })
    }
    fetchDataFromFirebase()

    // Clean up the event listener when the component unmounts
    return () => {
      db.ref('yourPath').off()
    }
  }, [])

  return (
        <div className="content-poll">
            { data.length > 0 && !loading &&
              <div className="row poll-card-margin">
                    { data.map((poll) => {
                      return (
                          <div className="col-sm-6 mb-4" key={poll.data._id}>
                                    <PollCard data={poll.data} isPollSelect={{ isPollSelect: false }} onEvent1={handleOptionOne} onEvent2={handleOptionTwo}></PollCard>
                          </div>
                      )
                    })
                    }
                </div>}
          { !data.length > 0 && !loading && <div className='poll-empty'>
               No poll Available
              </div>
}

            { loading && <div className="d-flex justify-content-center mt-4">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
            }
        </div>
  )
}
