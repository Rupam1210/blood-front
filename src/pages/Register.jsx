/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App';
import Spinner from '../component/shared/Spinner';
 

const Register = () => {
    // const [activeTab, setActiveTab] = useState("donor");
  const [role, setRole] = useState("donor");
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [bloodType,setbloodType]=useState("")
  const [name,setname]=useState("")
  const [organisationName,setorganisationName]=useState("")
  const [hospitalName,sethospitalName]=useState("")
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading,setloading]=useState(false)
  const navigate=useNavigate();
   
  const handleregister= async(e, 
    name,
    role,
    email,
    password,
    phone,
    address,
    bloodType,
    website,
    hospitalName,
    organisationName,
     )=>{
     e.preventDefault();
    //  console.log(name,role,email,password,phone,address,website,hospitalName,organisationName)
    setloading(true);
     try {
         if(!role || !email ||!password ||!phone){
          setloading(false)
          return toast.error("please provide all the field")}
          const {data}=await API.post("/auth/register",
             {name,
                role,
                email,
                password,
                phone,
                address,
                bloodType,
                website,
                hospitalName,
                organisationName},{withCredentials:true})
         if(data?.success){
             console.log(data)
             toast.success(data.message)
             setloading(false)
             navigate("/login")
         
         }else{
             console.log(data)
             toast.error(data.message)
             setloading(false)

         }
         
     } catch (error) {
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
         src=" ./images/banner1.png"
         alt="Blood Donation"
         className="w-full h-full object-cover"
       />
     </div>
     
     {/* Right Side Form */}
     <div className="w-full md:w-1/2 p-6">
       <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
         Register
       </h2>
       
       {/* Tabs */}
       <div className="flex justify-center mb-4 border-b">
         {[
           { id: "donor", label: "Donor" },
           { id: "hospital", label: "Hospital" },
           { id: "organisation", label: "Organisation" },
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
       <form action="submit" className="space-y-4" onSubmit={(e)=>handleregister(e,
              name,
              role,
              email,
              password,
              phone,
              address,
              bloodType,
              website,
              hospitalName,
              organisationName,
              )}>
         {/* <input
           type="text"
           placeholder="Name"
           
           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
         /> */}
          { (role==='donor' || role==='admin') &&
             
                 
                  <input type="text" placeholder="name"  value={name}  onChange={(e)=>setname(e.target.value)} className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'/>
            }
              { (role==='organisation') &&
              
                  
                  <input type="text" placeholder="organisationName" value={organisationName}  onChange={(e)=>setorganisationName(e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          }
              { (role==='hospital') &&
           
                  
                  <input type="text" placeholder={"hospitalName"}  value={hospitalName}  onChange={(e)=>sethospitalName(e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              }
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
         {role !== "donor" && (
           <input
           type="text" name={"website"}  value={website}  onChange={(e)=>setWebsite(e.target.value)}
             placeholder="Website"
             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
           />
         )}
          {role === "donor" && (
            <select
            value={bloodType}
            onChange={(e) => setbloodType(e.target.value)}
            className="w-full border rounded px-3 py-2" required
          >  <option defaultValue="Open this select menu">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          //  <input
          //  type="text" name={"BloodGroup"}  value={bloodType}  onChange={(e)=>setbloodType(e.target.value)}
          //    placeholder="Bloodgroup"
          //    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          //  />
         )}
         <input
           type="text" name={"address"}  value={address}  onChange={(e)=>setAddress(e.target.value)}
           placeholder="Address"
           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
         />
         <input
           type="text" name={"phone"}  value={phone}  onChange={(e)=>setPhone(e.target.value)}
           placeholder="Phone No"
           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
         />
         
         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
         >
           Submit
         </button>
       </form>
       
       <p className="text-sm text-center mt-4">
         Already registered? <Link to={"/login"} className="text-blue-600 hover:underline">Login!</Link>
       </p>
     </div>
   </div>
 </div>
 </>
  )}
 
  </>
  )
}

export default Register