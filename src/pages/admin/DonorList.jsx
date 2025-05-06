import React, { useEffect, useState } from 'react'
 
import Spinner from '../../component/shared/Spinner'
import moment from 'moment'
import { API } from '../../App'
import { toast } from 'react-toastify'
import Navbar from '../../component/shared/Navbar'

const DonorList = () => {
    const[loading,setloading]=useState(false)
    const[Data,setdata]=useState()
    const getdonors=async()=>{
        setloading(true)
        try {
            const {data}=await API.get("/admin/donor-list",{withCredentials:true})
            // console.log(data)
            if(data?.success){
              
                setdata(data?.donordata)
                setloading(false)
            }
            // console.log(data.donors)
        } catch (error) {
            console.log(error)
            setloading(false);
        }
    }
    const deleteone=async(id)=>{
       setloading(true)
        try {
            const {data}=await API.delete(`/admin/getdelete/${id}`,{withCredentials:true})
           
            if(data?.success){
                 toast.success(data?.message)
                 setloading(false)
                 getdonors()
               
                
            }else{
                toast.error(data?.message)
                setloading(false)
            }
            // console.log(data.donors)
        } catch (error) {
            console.log(error)
             
        }
    }
    useEffect(()=>{
        getdonors()
    },[])
  return (
    <>
    <Navbar/>
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Donor List</h2>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-700 text-white text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Data?.map((org, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{org.name||"Donor"}</td>
                <td className="p-3">{org.email}</td>
                <td className="p-3">{org.phone}</td>
                <td className="p-3">{moment(org.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={()=>deleteone(org._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {Data?.map((org, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="font-semibold text-lg">{org.name || "Donor"}</div>
            <div className="text-sm text-gray-600">{org.email}</div>
            <div className="text-sm">Phone: {org.phone}</div>
            <div className="text-sm">Date: {moment(org.createdAt).format("DD/MM/YYYY hh:mm: A")}</div>
            <button
              onClick={()=>deleteone(org._id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full w-full transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    {/* Donor list */}
    {/* <table className=' w-full  text-center   border border-blue-400' >
        <thead className='text-sm uppercase text-white'style={{backgroundColor:"#0B60B0"}}>
            <tr>
                <th scope='col ' className='px-6 py-4'>Name</th>
                <th scope='col' >Email</th>
                <th scope='col'  >Phone</th>
                <th scope='col'  >Date</th>
                <th scope='col'  >Action</th>
            </tr>
        </thead>
        
        <tbody>
        
            
            {Data?.map((records)=>(
                <tr  key={records._id} >
                <td  className='px-6 py-4' >{records.name || "Donor"}</td>
                <td  >{records.email}</td>
                <td  >{records.phone}</td>
                <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
                <td  >
                    <button className='bg-red-600 px-3 py-2 rounded-2xl uppercase text-sm font-semibold text-white' onClick={()=>deleteone(records._id)}>Delete</button>
                </td>

            </tr>
            ))}
            
        </tbody>
     </table> */}
     {loading &&(
                 
                   <Spinner/>
               
             )} 
  
    
    </>
  )
}

export default DonorList