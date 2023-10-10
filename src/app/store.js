import { configureStore } from '@reduxjs/toolkit'
import userReducer, { setUser } from '../components/feature/UserSlice'
import Cookies from 'js-cookie'
import { auth } from '../firebase/firebase'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

const initializeApp = async () => {
  const userId = Cookies.get('user_id')
  const token = Cookies.get('token')
  if (userId && token) {
    auth.onAuthStateChanged(user => {
      if (user && user.email) {
        const data = { email: user.email }
        store.dispatch(setUser(data))
      }
    })
  }
}

initializeApp()
