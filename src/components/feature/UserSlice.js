import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const initialState = {
  user: {
    email: ''
  },
  isAuthenticated: false,
  isNotify: false
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      state.user = user
      state.isAuthenticated = true
      console.log('state', state.user)
    },
    loginUser: (state, action) => {
      const { user, userId, accessToken } = action.payload
      state.user.email = user
      state.isAuthenticated = true
      console.log('state', state.user.email)
      const expireTime = new Date(new Date().getTime() + 60 * 60 * 1000)
      Cookies.set('user_id', userId, { expires: expireTime })
      Cookies.set('token', accessToken, { expires: expireTime })
    },
    removeUser: (state) => {
      state.user.email = ''
      state.isAuthenticated = false
      localStorage.removeItem('token')
      Cookies.remove('token')
      Cookies.remove('user_id')
      console.log('remove state', state.user)
    },
    autoLogout: (state, action) => {
      console.log('user logout')
      const isNotify = action.payload
      state.isNotify = isNotify
    },
    setNotify: (state, action) => {
      const isNotify = action.payload
      state.isNotify = isNotify
    }
  }
})

export const { autoLogout, setUser, removeUser, loginUser, setNotify } = userSlice.actions

export default userSlice.reducer
