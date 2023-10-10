import './App.css'
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import AdminCreate from './components/admin/AdminCreate'
import AdminForm from './components/admin/AdminForm'
import LoginAdmin from './components/admin/LoginAdmin'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'
import Navbar from './components/navbar/Navbar'
import AdminProfile from './components/admin/AdminProfile'
import ErrorPage from './components/error/ErrorPage'
import { Link, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

function App () {
  const isNotify = useSelector((state) => state.user.isNotify)

  const HandleLoginRefresh = () => {

  }
  const handleLogoutRefresh = () => {

  }
  return (
      <HashRouter basename='/'>
        <Navbar></Navbar>
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<HomePage></HomePage>} />
            <Route path='/admin/create' element={<AdminCreate></AdminCreate>}></Route>
            <Route path='/admin/home' element={<AdminPage></AdminPage>}></Route>
            <Route path='/admin/edit/:id' element={<AdminForm></AdminForm>}></Route>
            <Route path='/admin' element={<LoginAdmin></LoginAdmin>}></Route>
            <Route path='/admin/profile' element={<AdminProfile></AdminProfile>}></Route>
            <Route path='*' exact={true} element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
          <Dialog
            open={isNotify}
            aria-labelledby="alert-dialog-title">
            <DialogTitle id="alert-dialog-title">
              Session Expired ?
            </DialogTitle>
            <DialogActions className='model-button-wrap'>
              <button className="btn btn-danger model-button" onClick={HandleLoginRefresh}>Stay as LoggedIn</button>
              <button className="btn btn-success model-button" onClick={handleLogoutRefresh}>Logout</button>
            </DialogActions>
          </Dialog>
        </div>
        <footer>
          <div className='footer'>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                GApp
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>

          </div>
        </footer>
      </HashRouter>
  )
}

export default App
