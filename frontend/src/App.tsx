import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PublicProfile from './pages/PublicProfile'
import Booking from './pages/Booking'
import Verify from './pages/Verify'
import ShowBookings from './pages/ShowBookings'
import ShowTimeslots from './pages/ShowTimeslots'
import TimeslotDetailPage from './pages/TimeslotDetailPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/dashboard/bookings' element={<ProtectedRoute><ShowBookings/></ProtectedRoute>}/>
        <Route path='/dashboard/timeslots' element={<ProtectedRoute><ShowTimeslots/></ProtectedRoute>}/>
        <Route path='/dashboard/timeslots/:id' element={<ProtectedRoute><TimeslotDetailPage/></ProtectedRoute>}/>

        <Route path='/verify' element={<Verify/>}/>
        <Route path='/:username' element={<PublicProfile/>}/>
        <Route path='/:username/:slug' element={<Booking/>}/>
      </Routes>
    </>
  )
}

export default App