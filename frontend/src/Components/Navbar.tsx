import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useNavigate } from 'react-router-dom';
import React from 'react'
export const Navbar = () => {
    const navigate = useNavigate();
    const handleLoginUser = (typeOfUser:string)=>{
       switch (typeOfUser){
        case "user":
            navigate("/login",{state:{userType:"user"}})
            break;
          case "doctor":
            navigate("/login",{state:{userType:"doctor"}})
            break;
          case "inventory manager":
            navigate("/login",{state:{userType:"inventory manager"}})
            break;
          case "receptionist":
            navigate("/login",{state:{userType:"receptionist"}}) 
            break;
          case "hospital admin":
            navigate("/login",{state:{userType:"hospital admin"}}) 
            break;
          default:
            alert("unknown type")
            navigate("/");
            break;
       }
    } 
  return (
    <>
    
    <div className="bg-zinc-900 p-3 flex items-center" >
    {/* image */}
    <div className='mx-2 rounded-lg' >
            <img src="logo.png" alt="medisync logo" width={90} className='p-2 hover:cursor-pointer '/>
    </div>
    {/* input search */}
    <div className='flex items-center gap-10' >
    <Input 
    placeholder="Search Hospitals"
    variant="outlined"
    color="neutral" 
    sx={{
        border: '1px solid grey', // Indigo-600 (Tailwind)
        backgroundColor: '#1f2937', // Tailwind's bg-zinc-800
        color: 'white',
        borderRadius: '8px',
        width:'20rem'
      }}
    />
    </div >

    <div className='flex items-center justify-between w-full px-10' >
    {/* navlinks */}
    <div className='flex gap-10 w-full p-2 mx-10' >
    <Link href="#home" underline="none" variant="plain" color='primary'  level="body-lg"
    sx={{
        '&:hover':{
            backgroundColor:'#6200ea',
            color:'white'
        }
    }}
    >Home</Link>
    <Link href="#services" underline="none" variant="plain" color='primary'  level="body-lg"
    sx={{
        '&:hover':{
            backgroundColor:'#6200ea',
            color:'white'
        }
    }}
    >Services</Link>
    <Link href="#about" underline="none" variant="plain" color='primary'  level="body-lg"
    sx={{
        '&:hover':{
            backgroundColor:'#6200ea',
            color:'white'
        }
    }}
    >About</Link>
    <Link href='book-opd-page' underline="none" variant="plain" color='primary'  level="body-lg"
    sx={{
        '&:hover':{
            backgroundColor:'#6200ea',
            color:'white'
        }
    }}
    >Book OPD</Link>
    <Link href="emergency-service-page"underline="none"  variant="solid" color='danger'  level="body-lg"
    sx={{
        '&:hover':{
            backgroundColor:'#d32f2f',
            color:'eeeeee'
        }
    }}
    >Emergency</Link>
    </div>
    {/* login button  */}
    <div>
    <Dropdown>
    <MenuButton 
    variant="outlined"
    color="primary"
    >Login</MenuButton>
    <Menu
     placement="bottom-end" // 👈 aligns the dropdown to the right
    >
    <MenuItem sx={{borderBottom:"1px solid #424242"}} onClick={(e)=>{handleLoginUser("user")}} >User</MenuItem>
    <MenuItem sx={{borderBottom:"1px solid #424242"}} onClick={(e)=>{handleLoginUser("doctor")}} >Doctor</MenuItem>
    <MenuItem sx={{borderBottom:"1px solid #424242"}} onClick={(e)=>{handleLoginUser("inventory manager")}} >Inventory Manager</MenuItem>
    <MenuItem sx={{borderBottom:"1px solid #424242"}} onClick={(e)=>{handleLoginUser("receptionist")}} >Reception</MenuItem>
    <MenuItem sx={{borderBottom:"none"}} onClick={(e)=>{handleLoginUser("hospital admin")}} >Hospital Admin</MenuItem>
    </Menu>
    </Dropdown>
    </div>
    </div>
    </div>

    <div>
        <div></div>
        <div></div>
    </div>
    </>
  )
}
