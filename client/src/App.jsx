import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import ShortUrl from './components/ShortUrl'
import Redirect from './components/Redirect'
import AllShortUrls from './components/AllShortUrls'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import AuthProvider from './components/AuthProvider'
import {GlobalProvider} from './components/GlobalProvider'

const App = () => {
  return (
    <>
      <AuthProvider>
        <GlobalProvider>
      <Router>
      <ToastContainer/>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ProtectedRoute><ShortUrl/></ProtectedRoute>} />
          <Route path='/allShortUrls' element={<ProtectedRoute><AllShortUrls/></ProtectedRoute>} />
          <Route path='/register' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/redirect' element={<Redirect/>} />
        </Routes>
      </Router>
        </GlobalProvider>
      </AuthProvider>
    </>
  )
}

export default App