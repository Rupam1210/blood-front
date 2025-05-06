import React, { useEffect, useState } from 'react'
// import Layout from '../../component/shared/Layout'
import { API } from '../../App';
import moment from 'moment'
import Spinner from '../../component/shared/Spinner';
import Navbar from '../../component/shared/Navbar';

const Donor = () => {
    const [Data,setData]=useState([]);
    const [loading,setloading]=useState(false);

    const getdonors=async()=>{
        setloading(true)
        try {
            const {data}=await API.get("/inventory/get-donors",{withCredentials:true})
            if(data?.success){
                setData(data?.donors)
                setloading(false)
            }
            // console.log(data.donors)
        } catch (error) {
            console.log(error)
            setloading(false);
        }
    }
    useEffect(()=>{
        getdonors()
    },[])
    // console.log(Data)
  return (
    <>
 <Navbar/>
      
     <div className="container mx-auto p-6">
             <h2 className="text-xl font-semibold mb-4">donor List</h2>
     
             <div className="overflow-x-auto">
               <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                 <thead className="bg-blue-600 text-white uppercase text-sm">
                   <tr>
                     <th className="py-3 px-4 text-left">Name</th>
                     <th className="py-3 px-4 text-left">Email</th>
                     <th className="py-3 px-4 text-left">Phone</th>
                     <th className="py-3 px-4 text-left">Date</th>
             
                   </tr>
                 </thead>
                 <tbody>
                   {Data?.map((item, index) => (
                     <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                       <td className="py-3 px-4">{item.name}</td>
                       <td className="py-3 px-4 capitalize">{item.email}</td>
                       <td className="py-3 px-4">{item.phone}</td>
                       
                       <td className="py-3 px-4">
                       {moment(item.createdAt).format("DD/MM/YYYY hh:mm: A")}
                         </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         
     {loading &&(
                 
                   <Spinner/>
               
             )} 
    {/* </Layout> */}
    </>
   
  )
}

export default Donor