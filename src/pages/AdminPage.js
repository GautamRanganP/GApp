import React, { useEffect, useState } from 'react'
import PollAdmin from '../components/card/PollAdmin'
import 'react-datepicker/dist/react-datepicker.css'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase/firebase'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export function AdminPage () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleRoute = () => {
    navigate('/admin/create')
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
        setData(dataArray)
        setLoading(false)
      })
    }
    const token = Cookies.get('token')
    if (!token) {
      navigate('/admin')
    } else {
      fetchDataFromFirebase()
    }
    // Clean up the event listener when the component unmounts
    return () => {
      db.ref('yourPath').off()
    }
  }, [])

  return (
        <div>
            <div className="content-poll">
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary" onClick={handleRoute}>Create Poll</button>
                </div>
                {data.length > 0 && !loading &&
                  <div className="row poll-card-margin">
                        {data.map((poll) => {
                          return (
                                <div className="col-sm-6 mb-5" key={poll.data._id}>
                                    <PollAdmin data={poll.data}></PollAdmin>
                                </div>
                          )
                        })}

                    </div>
                 }
                 { !data.length > 0 && !loading && <div className="poll-empty">No poll Available</div>
                }
                  { loading && <div className="d-flex justify-content-center mt-4">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
            }
            </div>
        </div>
  )
}
