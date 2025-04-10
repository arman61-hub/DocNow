import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Components
import AdminLogin from './admin/pages/Login'
import { AdminContext } from './admin/context/AdminContext';
import { DoctorContext } from './admin/context/DoctorContext';
import Navbar from './admin/components/Navbar';
import Sidebar from './admin/components/Sidebar';
import AdminDashboard from './admin/pages/Admin/Dashboard';
import AllAppointments from './admin/pages/Admin/AllAppointments';
import AddDoctor from './admin/pages/Admin/AddDoctor';
import DoctorsList from './admin/pages/Admin/DoctorsList';
import DoctorDashboard from './admin/pages/Doctor/DoctorDashboard';
import DoctorAppointments from './admin/pages/Doctor/DoctorAppointments';
import DoctorProfile from './admin/pages/Doctor/DoctorProfile';

// Frontend Components
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavbarFrontend from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  // Redirect based on the token in context
  useEffect(() => {
    if (aToken) {
      navigate('/admin-dashboard')
    } else if (dToken) {
      navigate('/doctor-dashboard')
    }
  }, [aToken, dToken])

  return (
    <>
      <ToastContainer />
      {aToken || dToken ? (
        <div className='bg-[#F8F9FD]'>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              {/* Admin Routes */}
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<DoctorsList />} />

              {/* Doctor Routes */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointments />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className='mx-4 sm:mx-[10%]'>
          <NavbarFrontend />
          <Routes>
            {/* Frontend Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
