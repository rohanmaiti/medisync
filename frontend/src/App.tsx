import './App.css'
import {LandingPage} from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} />  
      </Routes>
    </div>
  )
}

export default App
