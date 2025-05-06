import React, { useCallback, useContext, useEffect, useState } from 'react'
// import Layout from '../../component/shared/Layout'
import { UserContext } from '../../context/UserContext'
 
import Spinner from '../../component/shared/Spinner';
import { API } from '../../App';
import { toast } from 'react-toastify';
import moment from 'moment';
import Navbar from '../../component/shared/Navbar';

const Request = () => {
    const {user}=useContext(UserContext);
    const [loading,setloading]=useState(false);
    
    const [inventoryType, setInventoryType] = useState("out");
    const [bloodGroup, setBloodGroup] = useState("");
    const [quantity, setQuantity] = useState("");
    const [email, setEmail] = useState("");
    const[data,setdata]=useState("")
      const [orglistdata, setorg] = useState([]);
      //  const orglist = async () => {
      //     try {
      //       const { data } = await API.get("/auth/getorg", { withCredentials: true });
      
      //       setorg(data.user);
      //       console.log(orglistdata);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };
        const orglist = useCallback(async () => {
          try {
            const { data } = await API.get("/auth/getorg", { withCredentials: true });
      
            setorg(data.user);
            // console.log(orglistdata);
          } catch (err) {
            console.error(err);
          }
        }, []);

    const createrequest=async(e)=>{
      e.preventDefault()
        
        // if(user?.role==="donor" && inventoryType==="out")return toast.error("donor cannot select out Inventory Type")
        if(user?.role==="hospital" && inventoryType==="in")return toast.error("Hospital cannot select IN Inventory Type")
        if(!quantity||!email)return toast.error("Please Provide all the details")
        try {
            const {data}=await API.post("/request/create",{bloodGroup,inventoryType,quantity,email},{withCredentials:true})
            console.log(data)
            
            if(data?.success){
                toast.success("Request sending Succesfull")
                getrequest()
                setBloodGroup("")
                setEmail("")
                setInventoryType("")
                setQuantity("")
                // window.location.reload(true)
            }else{
              toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const getrequest=async()=>{
        setloading(true)
        try {
            const{data}=await API.get("/request/get-req",{withCredentials:true})
            console.log(data)
            if(data?.success){
                setdata(data?.reqs)
                setloading(false)
            }
            
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }
    // console.log(data)
    useEffect(()=>{
      getrequest()
      
  },[])
    useEffect(()=>{
        orglist()
    },[orglist])
    // const Requests = [
    //     { email: "delhi3@gmail.com", quantity: 100, bloodGroup: "A+", response: "Your request is rejected", status: "Rejected", date: "29/01/2024 07:00 PM" },
    //     { email: "delhi3@gmail.com", quantity: 56, bloodGroup: "O-", response: "Your request is rejected", status: "Rejected", date: "30/01/2024 08:20 PM" },
    //     { email: "delhi3@gmail.com", quantity: 10, bloodGroup: "O+", response: "Request is pending", status: "Pending", date: "11/02/2024 10:57 AM" },
    //   ];
  return (

    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
       

      {/* Request Form */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">+ Send New Request</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <div className="flex items-center gap-4 mt-1">
                
                <label className="flex items-center gap-1">
                  <input type="radio" name="bloodType" className="accent-red-500" value={"out"} onChange={(e)=>setInventoryType(e.target.value)} defaultChecked /> OUT
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select className="w-full mt-1 p-2 border rounded-md" onChange={(e)=>setBloodGroup(e.target.value)}>
                <option defaultValue="Open this select menu">Select Blood Group</option>
                <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
              </select>
            </div>
            <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">
          Organisation <span className="text-red-500">*</span>
        </label>
        <select
                className="border p-2 rounded-md w-3/4  shadow-md focus:ring-red-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                <option value="">All Organisation</option>
                {orglistdata.map((group,index) => (
                  <option key={index} value={group.email}>
                    {group.organisationName}
                  </option>
                ))}
              </select>
      </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Organisation Email</label>
              <input type="email" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter Email" value={email}onChange={(e)=>setEmail(e.target.value)} />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" className="w-full mt-1 p-2 border rounded-md" placeholder="Enter Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
            </div>

            <div className="col-span-2">
              <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition" onClick={createrequest}>
                SEND REQUEST
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Request Table */}
     {data && <div className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Request History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Blood Group</th>
                <th className="py-3 px-4 text-left">Response</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">{item.inventoryType}</td>
                  <td className="py-3 px-4">{item.bloodGroup}</td>
                  <td className="py-3 px-4">{item.msg}</td>
                  <td className="py-3 px-4">
                    {item.requestreject && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs">REJECTED</span>
                    ) }
                      {item.requestaccept && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">ACCEPT</span>
                    ) }
                    { (!item.requestreject &&!item.requestaccept) &&(
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">PENDING</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{ moment(item.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      {/* {!data && <Spinner/>} */}

        
{loading &&(
     
       <Spinner/>
   
 )} 
    </div>
    {/* <Layout> */}
             {/* <>
            <div className='flex flex-col justify-center items-center'>
            <h4 className='text-2xl ' >   <i className="fa-solid fa-plus mr-2 py-4"></i>Send New Request</h4>
            <div className="bg-blue-200 flex flex-col ">
            <div className="  px-6 py-10 flex flex-wrap space-x-6 ">
                <div className="flex space-x-2  ">
                   
                    
                        <div className="flex  items-center space-x-2">
                            
                            <div> Blood Type </div>

                            <input type='radio' value={"in"} name="default"  onChange={(e)=>setInventoryType(e.target.value)} defaultChecked/>
                            <label htmlFor="in">IN</label>
                        </div>
                        <div className="flex  items-center space-x-2">
                            <input type='radio' value={"out"} name="default" onChange={(e)=>setInventoryType(e.target.value)}/>
                            <label htmlFor="out">OUT</label>
                        </div>
                
                </div>
                <div className="flex flex-col">
                    <label htmlFor="blood">BloodGroup</label>
                <select onChange={(e)=>setBloodGroup(e.target.value)} className='input p-0' >
                    <option defaultValue="Open this select menu"> Open this select menu</option>
                    <option value={"O+"}>O+</option>
                    <option value={"O-"}>O-</option>
                    <option value={"AB+"}>AB+</option>
                    <option value={"AB-"}>AB-</option>
                    <option value={"A+"}>A+</option>
                    <option value={"A-"}>A-</option>
                    <option value={"B+"}>B+</option>
                    <option value={"B-"}>B-</option>
                </select>
                </div>
                <div className="flex flex-col">
                <label htmlFor="OrganisationEmail">Organisation Email</label>
                    <input type="email" value={email}onChange={(e)=>setEmail(e.target.value)} className='input' />
                    
                </div>
                <div className="flex flex-col">
                <label htmlFor="Quantity">Quantity</label>
                    <input type="Number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='input'/>
                
                </div>
               
            </div>
            <div className="flex pb-6 justify-center"> <button className='bg-red-600 text-white px-2 py-1 text-lg outline-none border-none rounded-lg uppercase font-semibold w-1/3 ' onClick={createrequest}>Send</button></div>
           
            </div>
            </div>
            
             
 
            
            </> */}
           {/* {data && <table className=' w-full  text-left   border border-blue-400 mt-10 ' >
      <thead className='text-sm uppercase  text-white sm:text-sm md:text-lg' style={{backgroundColor:"#0B60B0"}}>
          <tr>
              <th scope='col ' className='px-6 py-4'>Email</th>
              <th scope='col' >Quantity</th>
              <th scope='col'  >BloodGroup</th>
              <th scope='col'  >Response</th>
              <th scope='col'  >Status</th>
              <th scope='col'  >Date</th>
          </tr>
      </thead>
      
      
      <tbody>
      
          
          {data?.map((records)=>(
              <tr  key={records._id} >
              <td  className='px-6 py-4' >{records.email}</td>
              <td  >{records.quantity}</td>
              <td  >{records.bloodGroup}</td>
              <td  >{records.msg}</td>
              <td className='text-white '  >
                {records.requestreject&& <span className='bg-red-600 p-3 font-semibold'>REJECT</span>}
                {records.requestaccept&& <span className='bg-green-600 p-3 font-semibold'>ACCEPT</span>}
                {(!records.requestreject &&!records.requestaccept)&& <span className=' p-3 font-semibold' style={{backgroundColor:"#0B60B0"}}>PENDING</span>}
                </td>
              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
          </tr>
          ))}
          
      </tbody>
   </table>} */}
   {/* {!data && <Spinner/>}

        
          {loading &&(
               
                 <Spinner/>
             
           )}  */}
    
    {/* </Layout> */}
    </>
    
  )
}

export default Request