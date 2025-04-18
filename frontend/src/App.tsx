import './App.css'
import {LandingPage} from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { LoginSection } from './pages/sections/LoginSection'
import { SignupSection } from './pages/sections/SignupSection'
function App() {

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} /> 
       <Route path="/login" element={<LoginSection/>}/> 
       <Route path="/signup" element={<SignupSection/>}/> 
      </Routes>
    </div>
  )
}

export default App
