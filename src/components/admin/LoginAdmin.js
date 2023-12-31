import * as React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import CircularProgess from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setUser } from '../feature/UserSlice'
import { auth } from '../../firebase/firebase'
// import { useAuth } from '../../contexts/AuthContext'

const theme = createTheme()

export default function LoginAdmin () {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const login = useAuth()
  // const signup = useAuth()

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault()
    setError('loading')
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
    const email = data.get('email')
    const password = data.get('password')
    try {
      // create user
      // const data = await auth.createUserWithEmailAndPassword(email, password)
      const response = await auth.signInWithEmailAndPassword(email, password)
      console.log('sucess', response.user.email)
      const data = { user: response.user.email }
      dispatch(setUser(data))
      const expireTime = new Date(new Date().getTime() + 60 * 60 * 1000)
      Cookies.set('user_id', response.user.uid, { expires: expireTime })
      Cookies.set('token', response.user._delegate.accessToken, { expires: expireTime })
      setError('success')
      navigate('/admin/home')
    } catch (error) {
      console.log('failed', error)
      setError('failed')
    }
    // const payload = { email, password }
    // fetch('http://localhost:8082/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // }).then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok')
    //   }
    //   return response.json()
    // }).then((data) => {
    //   console.log('login sucess', data)
    //   dispatch(setUser(data))
    //   const expireTime = new Date(new Date().getTime() + 60 * 60 * 1000)
    //   Cookies.set('user_id', data._id, { expires: expireTime })
    //   Cookies.set('token', data.token, { expires: expireTime })
    //   setError('success')
    //   redirect('/admin/home')
    // }).catch(() => {
    //   setError('failed')
    // })
  }, [])

  React.useEffect(() => {
    Cookies.get('token')
    const token = Cookies.get('token')
    if (token) {
      navigate('/admin/home')
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}

            { error === 'failed' && <Alert severity='error'>Authentication Failed</Alert> }
            { error === 'loading' &&
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* <span>Authenticating</span> */}
                <CircularProgess></CircularProgess>
              </Box> }
            { error === 'success' && <Alert severity='success'>Authentication Sucess</Alert> }
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}
