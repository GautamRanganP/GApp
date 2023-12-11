import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../components/feature/UserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
