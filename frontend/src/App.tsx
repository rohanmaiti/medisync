import './App.css'
import {LandingPage} from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SignupPage} from './pages/SIgnupPage'
import { ForgotPage } from './pages/ForgotPage'
function App() {

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} /> 
       <Route path="/login" element={<LoginPage/>}/> 
       <Route path="/signup" element={<SignupPage/>}/>  
       <Route path="/forgot" element={<ForgotPage/>}/> 
      </Routes>
    </div>
  )
}

export default App
