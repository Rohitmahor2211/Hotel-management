import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import RoomDetailsPage from './pages/RoomDetailsPage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { useScrollEffects } from './useScrollEffects.js'
import { useMobileNavigation } from './useMobileNavigation.js'
import { useComponentInitialization } from './useComponentInitialization.js'
import { useDebugConsole } from './useDebugConsole.js'
import './styles.css'
import AdminLogin from './pages/AdminLogin.jsx'
import OtpVerification from './pages/OtpVerificationPage.jsx'
import DashBoard from './Admin/pages/DashBoard.jsx'
import Rooms from './Admin/pages/Rooms.jsx'
import Bookings from './Admin/pages/Bookings.jsx'
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'
import OtpRoute from './routes/OtpRoute.jsx'
import { Toaster } from 'react-hot-toast';


export default function App() {
  useScrollEffects()
  useMobileNavigation()
  useComponentInitialization()
  useDebugConsole()

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/room-details/:id" element={<RoomDetailsPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/adminlogin' element={<AdminLogin />} />

        <Route element={<OtpRoute />}>
          <Route path='/verify-otp' element={<OtpVerification />} />
        </Route>

        <Route element={<ProtectedAdminRoute />}>
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/rooms' element={<Rooms />} />
          <Route path='/admin/bookings' element={<Bookings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
