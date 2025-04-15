import React from 'react'
import {axiosInstance} from "../lib/axios.ts";
export const Navbar = () => {
  return (
    <>
    <div>Navbar</div>
    <button
    onClick={()=>{
      axiosInstance.get("/hello");
    }}
    >hello</button>
    </> 
  )
}
