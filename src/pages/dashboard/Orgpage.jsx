import React, {  useEffect, useState } from 'react'
// import Layout from '../../component/shared/Layout'
 
import Spinner from '../../component/shared/Spinner';
import moment from 'moment';
import { API } from '../../App';
import Navbar from '../../component/shared/Navbar';

 

const Orgpage = () => {
  const [Data,setData]=useState([]);
  const [hosData,sethosData]=useState([]);
  const [loading,setloading]=useState(false);
  
  
  const getorg=async()=>{
    setloading(true)
    try {
          const {data}=await API.get("/inventory/get-org",{withCredentials:true})
          if(data?.success){
              sethosData(data?.orgprofile)
              setloading(false)
          }
    } catch (error) {
        console.log(error)
        setloading(false);
    }
}
  const getdonors=async()=>{
      setloading(true)
      try {
            const {data}=await API.get("/inventory/get-org-hospital",{withCredentials:true})
            if(data?.success){
                setData(data?.orgprofile)
                setloading(false)
            }
      } catch (error) {
          console.log(error)
          setloading(false);
      }
  }
  
  useEffect(()=>{
    getorg()
},[])
  useEffect(()=>{
      getdonors()
  },[])
  // console.log(Data)
return (
  <>
  
  <Navbar/>
      
      <div className="container mx-auto p-6">
              <h2 className="text-xl font-semibold mb-4">Organisation List</h2>
      
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-blue-600 text-white uppercase text-sm">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Phone</th>
                      <th className="py-3 px-4 text-left">Address</th>
                      <th className="py-3 px-4 text-left">Date</th>
              
                    </tr>
                  </thead>
                  <tbody>
                    {Data?.map((item, index) => (
                      <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                        <td className="py-3 px-4">{item.organisationName}</td>
                        <td className="py-3 px-4 capitalize">{item.email}</td>

                        <td className="py-3 px-4">{item.phone}</td>
                        <th className="py-3 px-4 text-left">{item.address}</th>
                        
                        <td className="py-3 px-4">
                        {moment(item.createdAt).format("DD/MM/YYYY hh:mm: A")}
                          </td>
                      </tr>
                    ))}
                    {hosData?.map((item, index) => (
                      <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                        <td className="py-3 px-4">{item.organisationName}</td>
                        <td className="py-3 px-4 capitalize">{item.email}</td>

                        <td className="py-3 px-4">{item.phone}</td>
                        <th className="py-3 px-4 text-left">{item.address}</th>
                        
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
{/*   
  <Layout>
  <div className="">
   
   </div>
     
   <table className=' w-full  text-left   border border-blue-400' >
      <thead className='text-sm uppercase  text-white' style={{backgroundColor:"#0B60B0"}}>
          <tr>
              <th scope='col ' className='px-6 py-4'>Name</th>
              <th scope='col' >Email</th>
              <th scope='col'  >Phone</th>
              <th scope='col'  >Address</th>
              <th scope='col'  >Date</th>
          </tr>
      </thead>
      
      
      <tbody>
      
          
          { Data?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.organisationName}</td>
              <td  >{records.email}</td>
              <td  >{records.phone}</td>
              <td  >{records.address}</td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          { hosData?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.organisationName}</td>
              <td  >{records.email}</td>
              <td  >{records.phone}</td>
              <td  >{records.address}</td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          
      </tbody>
   </table>
  
   
   {loading &&(
               
                 <Spinner/>
             
           )} 
  </Layout> */}
  </>
 
)
}

export default Orgpage