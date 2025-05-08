import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import {LandingPage} from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SIgnupPage'
import { HospitalRegistrationForm } from './pages/HospitalRegistrationPage'
import { BookOpdPage } from './pages/BookOpdPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import HospitalAdminDashboard from './userDashboards/hospitalAdmin/hospitalAdmin/HospitalAdminDashboard'
import DoctorDashboard from './userDashboards/hospitalAdmin/doctor/DoctorDashboard'

function App() {
  const {checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} /> 
       <Route path="/login" element={<LoginPage/>}/> 
       <Route path="/signup" element={<SignupPage/>}/>  

       <Route path="/registration-form" element={<HospitalRegistrationForm/>}/> 
       <Route path="/book-opd-form" element={<BookOpdPage/>}/>   
        
       <Route path="/hospitaladmin/dashboard" element={<HospitalAdminDashboard/>}/>   
       <Route path="/doctor/dashboard" element={<DoctorDashboard/>}/>   
      </Routes>
      
    </div>
  )
}

export default App
