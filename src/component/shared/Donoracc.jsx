import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { API } from '../../App';
import moment from 'moment';

const DonorAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [orgEmail, setOrgEmail] = useState("");
     const { user } = useContext(UserContext);
     const detail={
        bloodGroup :user?.bloodType
        ,inventoryType:"in"
        ,quantity : 300
        ,email :orgEmail
     }
     const [orglistdata, setorg] = useState([]);
   const orglist = useCallback(async () => {
               try {
                 const { data } = await API.get("/auth/getorg", { withCredentials: true });
           
                 setorg(data.user);
                 // console.log(orglistdata);
               } catch (err) {
                 console.error(err);
               }
             }, []);
    useEffect(()=>{
      orglist()
    }

   ,[orglist] )
    
 

const isRequestAfterSixMonths = (lastAcceptedDate) => {
  const now = moment(); // Current date/time
  const lastAccepted = moment(lastAcceptedDate);

  return now.diff(lastAccepted, 'months') >= 2;
};

    //  console.log(detail)
   
     const requestsent=async()=>{
        // record()
        //    const data1=await API.get( "/inventory/last-record",{withCredentials:true})
        //    console.log(data1)
        //             console.log(data1.data?.invent[0]?.createdAt)
         if(!orgEmail)return toast.error("Please Provide all the details")
                try {
                    const data1=await API.get( "/inventory/last-record",{withCredentials:true})
                    // console.log(data.invent[0]?.createdAt)
                //   console.log(data1.data?.invent)
                    if ( data1.data?.invent.length>0 && !isRequestAfterSixMonths(data1.data?.invent[0]?.createdAt)) {
                        toast.error('⛔ You must wait 2 months after your last donation.')
                        setOrgEmail("")
                        setIsOpen(false)
                        return;
                    }
                    const {data}=await API.post("/request/create",{...detail},{withCredentials:true})
                    console.log(data)
                    
                    if(data?.success){
                        toast.success(data?.message)
                        setOrgEmail("")
                        setIsOpen(false)
                       
                         
                        // window.location.reload(true)
                    }
                    
                } catch (error) {
                    console.log(error)
                }
     }
     

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-purple-700 font-semibold text-lg mb-4"
      >
        Become a Donor {isOpen ? '▲' : '▼'}
      </button>

      {/* Accordion Content */}
      <div
        className={`absolute top-10 left-0 w-full m-min bg-white shadow-xl border border-purple-300 rounded-lg p-4 z-10 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <select
                className="border px-4 py-2  text-black rounded-md w-full shadow-md focus:ring-red-500 focus:outline-none"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
              >
                <option value="">All Organisation</option>
                {orglistdata.map((group,index) => (
                  <option key={index} value={group.email}>
                    {group.organisationName}
                  </option>
                ))}
              </select>
        {/* <input
          type="email"
          placeholder="Enter Organization Email"
          className="w-full border text-black border-purple-400 px-4 py-2 rounded-md mb-4 focus:outline-none"
          onChange={(e)=>setOrgEmail(e.target.value)}
        /> */}
        <button className="bg-purple-500 text-white px-6 py-2 mt-6 rounded-md hover:bg-purple-600 transition" onClick={requestsent}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DonorAccordion;
