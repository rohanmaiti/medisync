import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LoginSection } from './sections/LoginSection';
import { SignupSection } from './sections/SignupSection';
import { Link } from 'react-router-dom';
export const AuthPage = () => {
  const location = useLocation();
  const [typeOfUser, setTypeOfUser] = useState<string>("user");
  useEffect(()=>{
    const userType = location.state?.userType;
    setTypeOfUser(userType ? userType : "user");
  },[])
  return (
    // <div className='min-h-screen flex flex-col md:flex-row justify-center items-center gap-6 p-6 md:flex-row'>
    //   <div className=" p-4  leading-13" >
    //   <h1 className='text-4xl text-left font-extrabold leading-13 max-w-md' >Welcome to MediSync <br /> Login to continue</h1>
    //   <h2 className=''> Don't have account? <Link to="/signup" className='text-blue-600'>register</Link> </h2>
    //   </div>
    // <div className='w-96 h-3/4 bg-slate-950 rounded-md p-4' >
    //     <LoginSection/>
    // </div>
    // </div>
    <>
       <Routes>
        <Route path='/login' element={<LoginSection/> } />
        <Route path='/signup' element={<SignupSection/> } />
       </Routes>
        
    </>
  )
}
