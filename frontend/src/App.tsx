import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PublicProfile from './pages/PublicProfile'
import Booking from './pages/Booking'
import Verify from './pages/Verify'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/:username' element={<PublicProfile/>}/>
      <Route path='/:username/:slug' element={<Booking/>}/>
    </Routes>
    </>
  )
}

export default App