/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
// import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 
import { toast } from 'react-toastify';
import { API } from '../../App';

const Navbar = () => {
    const {user,setuser}=useContext(UserContext)
    const location = useLocation();
    const navigate=useNavigate();
    
    const handlelogout=async()=>{
        try {
            await API.get("/auth/logout",{withCredentials:true})
            toast.success("Logout Succesfull")
            setuser(null)
            navigate("/login")
        } catch (error) {
            toast.error("Error in logout Api")
            console.log(error)
        }
    }
    const handlelogin=async()=>{
      try {
          
          navigate("/login")
      } catch (error) {
          toast.error("Error in logout Api")
          console.log(error)
      }
  }
  const handleregister=async()=>{
    try {
        
        navigate("/register")
    } catch (error) {
        toast.error("Error in logout Api")
        console.log(error)
    }
}
  return (
    <>
    <nav className="bg-black sticky top-0 text-white flex justify-between items-center z-30 p-4 shadow-md">
       {user&& <h1 className="text-xl font-bold flex items-center" onClick={()=>navigate("/")}>
            <span className="text-red-500 text-2xl mr-2">🩸</span> LiveFlow
        </h1>}
        {!user&& <h1 className="text-xl font-bold flex items-center" onClick={()=>navigate("/guest")}>
            <span className="text-red-500 text-2xl mr-2">🩸</span> LiveFlow
        </h1>}

        <div className="flex items-center gap-4">
        
          <span className="hidden  bg-blue-500 text-white px-4 py-1 rounded-md text-sm md:flex">
            {!user && <span>Guest</span>}
            
            {user?.name||user?.hospitalName||user?.organisationName}</span>
          {user&&<Link to={"/"}><span className="hidden md:flex bg-blue-500 text-white px-4 py-1 rounded-md text-sm">HOME</span></Link>}
         {user&&<button className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600" onClick={handlelogout}>LOGOUT</button> } 
         {!user&&<button className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600" onClick={handlelogin}>Login</button> } 
         {!user&&<button className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600" onClick={handleregister}>Register</button> } 
        </div>
      </nav>
{/* 

      new bar 
      
      
*/}
    {/* <nav className='bg-black text-white flex justify-between items-center p-4 shadow-md ' style={{zIndex:"1"}}>
        <div className="flex items-center justify-center space-x-2  "  >
            <BiDonateBlood color='red' className='text-4xl'/> 
            <h1 className='font-bold text-3xl ' onClick={()=>navigate("/")}>Blood Bank</h1>
        </div>
        <div className="pr-5 text-lg">
            <ul className='flex space-x-8 items-center'>
                <li className=''> 
                    <p className='flex justify-center items-center space-x-2 '>
                        <BiUserCircle/>  
                        <span>Welcome</span>
                        <span>{
                        user?.name||user?.hospitalName||user?.organisationName}
                        &nbsp;</span> 
                        <span className='bg-red-600 p-1 rounded uppercase text-sm font-semibold' style={{backgroundColor:"#0B60B0"}}>{user?.role}</span>
                     </p>
                </li>
                
                    <li>
                    <Link to="/">
                      Home
                    </Link>
                </li> 
                
                
                <li>
                    <button className=' text-black-400 font-bold bg-red-600 px-2 py-1 rounded flex items-center uppercase tracking-wider' onClick={handlelogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav> */}
    </>
  )
}

export default Navbar