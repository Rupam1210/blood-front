/* eslint-disable no-unused-vars */
 
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App';
import { UserContext } from '../context/UserContext';
import Spinner from '../component/shared/Spinner';
 
const Login = () => {
    const [role, setRole] = useState("donor");
    const [email,setemail]=useState("")
    const [loading,setloading]=useState(false)
    const [password,setpassword]=useState("")
    const {setuser}=useContext(UserContext)
    const navigate=useNavigate();
     const handlelogin= async(e,email,password,role)=>{
        e.preventDefault();
        setloading(true)
        try {
            if(!role || !email ||!password){
                setloading(false)
                return toast.error("please provide all the field")
            }
             const {data}=await API.post("/auth/login",{email,role,password},{withCredentials:true})
            if(data?.success){
              setloading(false)
                console.log(data)
                toast.success(data.message)
                setuser(data.user)
                
                navigate("/")
            
            }else{
                console.log(data)
                toast.error(data.message)
                setloading(false)

            }
            
        } catch (error) {
          toast.error("Something went wrong")
            console.log(error)
            setloading(false)
        }
     }
   

  return (
    <>
    
        {loading ?<Spinner/>:(
            <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 p-4">
               <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full md:flex">
                 {/* Left Side Image */}
                 <div className="hidden md:block md:w-1/2">
                   <img
                     src= "./images/banner2v.png"
                     alt="Blood Donation"
                     className="w-full h-full object-cover"
                   />
                 </div>
                 
                 {/* Right Side Form */}
                 <div className="w-full md:w-1/2 p-6">
                   <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
                     Welcome back
                   </h2>
                   
                   {/* Tabs */}
                   <div className="flex justify-center mb-4 border-b">
                     {[
                       { id: "donor", label: "Donor" },
                       { id: "hospital", label: "Hospital" },
                       { id: "organisation", label: "Organisation" },
                       { id: "admin", label: "Admin" }
                     ].map((tab) => (
                       <button
                         key={tab.id}
                         className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-300 ${
                           role === tab.id
                             ? "text-blue-600 border-blue-600"
                             : "text-gray-500 border-transparent"
                         }`}
                         onClick={() => 
                            
                            setRole(tab.id)
                         }
                       >
                         {tab.label}
                       </button>
                     ))}
                   </div>
                   
                   {/* Registration Form */}
                   <form action="submit" className="space-y-4" onSubmit={(e)=>handlelogin(e,email,password,role)}>
                     {/* <input
                       type="text"
                       placeholder="Name"
                       
                       className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                     /> */}
                  
                         
                             
                              
                   
                     <input
                       type="email" name={"email"}  value={email}  onChange={(e)=>setemail(e.target.value)}
                       placeholder="Email"
                       className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                     <input
                      type="password" name={"password"}  value={password}  onChange={(e)=>setpassword(e.target.value)}
                       placeholder="Password"
                       className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                     />
                    
                       
                     
                     
                     <button
                       type="submit"
                       className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
                     >
                       Submit
                     </button>
                    
                   </form>
                   <button
   className="bg-white mt-3 text-gray-800 font-semibold p-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-200"
    onClick={() => {
      // Replace this with your guest login logic or navigation
      // alert("Logged in as Guest");
      navigate("/guest")
    }}
  >
    Continue as Guest
  </button>
                   
                   <p className="text-sm text-center mt-4">
                   Not registered yet ?
                   <Link to={"/register"} className='underline text-blue-600 px-4'>Here!</Link>
                     
                   </p>
                 </div>
               </div>
             </div>
            {/* <div className="flex   ">
        <div className="w-full h-full">
            <img src="./images/banner2.jpg" alt=""  className='object-cover h-full '/>
        </div>
        <div className="p-10 flex justify-center items-center">
            <form action="submit" className='flex flex-col space-y-4' onSubmit={(e)=>handlelogin(e,email,password,role)}>
                <h1 className='text-center  text-4xl font-bold text-blue-600'  >Login</h1>
                <hr/>
                <div className="flex justify-center space-x-5 text-xl font-semibold" >
                    <div className={role==='donor'?"text-white bg-blue-600 p-1 rounded  ":"p-1" } style={{cursor:"pointer"}} onClick={()=>{setRole("donor")}}>donor</div>
                    <div className={role==='admin'?"text-white bg-blue-600 p-1 rounded  ":"p-1"}onClick={()=>{setRole("admin")}} style={{cursor:"pointer"}}>Admin</div>
                    <div className={role==='hospital'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("hospital")}} style={{cursor:"pointer"}}>Hospital</div>
                    <div className={role==='organisation'?"text-white bg-blue-600 p-1 rounded ":"p-1"} onClick={()=>{setRole("organisation")}} style={{cursor:"pointer"}}>Organisation</div>
                </div>
                <hr/>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="foremail">Email</label>
                    <input type="email" name={"email"}  value={email}  onChange={(e)=>setemail(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl'/>
                </div>
                 <div className="flex flex-col space-y-3">
                    <label htmlFor="forpassword">Password</label>
                    <input type="password" name={"password"}  value={password}  onChange={(e)=>setpassword(e.target.value)} className='p-2 bg-blue-100 outline-none hover:rounded-xl' />
                </div>
                <div className="flex  justify-between">
                    <p>Not registered yet ?
                        <Link to={"/register"} className='underline text-blue-600 px-4'>Here!</Link>
                    </p>
                    <button type='submit' className='bg-blue-600 text-white p-1 px-2 rounded-sm'>Login</button>
                </div>

            </form>
        </div>
        </div> */}
        </>
        )}
   
    </>
  )
}

export default Login