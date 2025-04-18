import './App.css'
import {LandingPage} from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SignupPage} from './pages/SIgnupPage'
function App() {

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} /> 
       <Route path="/login" element={<LoginPage/>}/> 
       <Route path="/signup" element={<SignupPage/>}/> 
      </Routes>
    </div>
  )
}

export default App
