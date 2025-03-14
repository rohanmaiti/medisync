import './App.css'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <div>
      <Routes>
       <Route path='/' element={<LandingPage/>} />  
      </Routes>
      <h1 className='bg-amber-300' >Hii there!!</h1>

    </div>
  )
}

export default App
