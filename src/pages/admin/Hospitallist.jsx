import React, { useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout'
import moment from 'moment'
import { API } from '../../App'
import Spinner from '../../component/shared/Spinner'
import { toast } from 'react-toastify'

const Hospitallist = () => {
    const[loading,setloading]=useState(false)
    const[Data,setdata]=useState()
    const getdonors=async()=>{
        setloading(true)
        try {
            const {data}=await API.get("/admin/hospital-list",{withCredentials:true})
         
            if(data?.success){
                setdata(data?.hospitaldata)
                setloading(false)
            }
            // console.log(data.donors)
        } catch (error) {
            console.log(error)
            setloading(false);
        }
    }
    const deleteone=async(id)=>{
       
        try {
            const {data}=await API.delete(`/admin/getdelete/${id}`,{withCredentials:true})
           
            if(data?.success){
                 toast.success(data?.message)
               
                window.location.reload();
            }else{
                toast.error(data?.message)
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
    <Layout>
         <div className="p-4">
                      <h2 className="text-2xl font-semibold mb-4 text-center">Hospital List</h2>
                      
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
                                <td className="p-3">{org.hospitalName}</td>
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
                            <div className="font-semibold text-lg">{org.hospitalName}</div>
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
        
    
     {loading &&(
                 
                   <Spinner/>
               
             )} 
  
    </Layout>
    </>
    
  )
}

export default Hospitallist