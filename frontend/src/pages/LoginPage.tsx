import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export const LoginPage = () => {
  const location = useLocation();
  const [typeOfUser, setTypeOfUser] = useState<string | null>(null);
  useEffect(()=>{
    
  },[])
  return (
    <div>LoginPage</div>
  )
}
