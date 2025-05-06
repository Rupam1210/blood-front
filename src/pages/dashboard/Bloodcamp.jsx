import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../component/shared/Navbar";
import { UserContext } from "../../context/UserContext";
import { API } from "../../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import moment from "moment";
 
const BloodCamp = () => {
    // const [camps] = useState(dummyCamps);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [selectedCamp, setSelectedCamp] = useState(null);
//   const [formDat, setFormDat] = useState({ name: "", email: "", bloodGroup: "", phone: "" });
const [campsd,setcampsd] = useState([]);
  const allcamp = async() => {
    try {
        
        const { data } = await API.get("/camp/allcamp",{
           withCredentials: true,
         })
          // console.log(data)
          if(data?.success){
           
             setcampsd(data.camp)
           
            //  toast.success(data.message)
             
        
           }else{
             toast.error(data.message)
           }
        
    } catch (error) {
        console.log(error)
    }

    // setSelectedCamp(camp);

    // setIsModalOpen1(true);
  };



    

     const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        date: "",
        time: "",
        organiser: "",
        email:"",
        contact:""
      });
    //   console.log(user)
    
      const [camps, setCamps] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.location || !formData.date || !formData.time || !formData.organiser) {
          alert("Please fill all fields!");
          return;
        }
      
        // console.log(formData)
        const { data } = await API.post("/camp/create", {
                 ...formData
             
              },{
                withCredentials: true,
              })
               
               if(data?.success){
                //   console.log(data)
                
                  toast.success(data.message)
                  getc()
             
                }else{
                  toast.error(data.message)
                }
        // setFormData({ name: "", location: "", date: "", time: "",  organizer: "", email:"",contact:""});
        setIsModalOpen(false);
      };
      const getc=async()=>{
        try {
            const {data}=await API.get("/camp/getall"
                 ,{
                withCredentials: true,
              })
              setCamps(data.camp)
             
              
        } catch (error) {
            console.log(error)
        }
      }
    //   const [id,setid]=useState("")
      const delhandle=async(id)=>{
         
        try {
            const {data}=await API.delete(`/camp/del/${id}` ,{withCredentials: true,})
            //  console.log(data)
             if(data?.success){
                toast.success(data.message)
                getc()
             }
        } catch (error) {
            console.log(error)
        }
      }
      useEffect(()=>{
        getc();
        allcamp()

      },[])
      const isPastCamp = (date, time) => {
        const now = new Date();
        const eventDate = new Date(`${date}T${time}`);
        return eventDate < now;
      };

  return (
    <>
    <Navbar/>
    {user?.role==="organisation" &&
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center p-6">
      <motion.button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
      >
        Register Blood Camp
      </motion.button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Register Blood Camp</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Camp Name" className="w-full p-3 border rounded-lg" />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-3 border rounded-lg" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 border rounded-lg" />
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-3 border rounded-lg" />
              <input type="text" name="organiser" value={formData.organiser} onChange={handleChange} placeholder="Organizer Name" className="w-full p-3 border rounded-lg" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Organizer email" className="w-full p-3 border rounded-lg" />
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Organizer contact" className="w-full p-3 border rounded-lg" />
              <div className="flex justify-between">
                <motion.button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsModalOpen(false)}>Cancel</motion.button>
                <motion.button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Register</motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="mt-10 w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Upcoming Blood Camps</h2>
        {camps.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blood camps registered yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp, index) => {
               const isPast = isPastCamp(camp?.date, camp?.Time)
                 
               return (

              <motion.div 
               
                key={index} 
                className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${
                  isPast
                    ? 'bg-gray-200 text-gray-500 border border-gray-400' 
                    : 'bg-white text-black' }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >   
                <h3 className="flex justify-between text-xl font-semibold text-blue-600"> <span  >{camp.campname} </span><span onClick={()=>delhandle(camp._id)}>🗑️</span></h3>
                <p className="text-gray-700 mt-1 font-medium">📍  {camp.location}</p>
                <p className="text-gray-700 mt-1 font-medium">📅 {camp.date} | ⏰  {moment(camp?.Time, "HH:mm").format("hh:mm A")}</p>
                <p className="text-gray-700 mt-1 font-medium">👤 {camp.organiser}</p>
                <p className="text-gray-700 mt-1 font-medium">📞  {camp.contact} 📧{camp.email}</p>
              </motion.div>
)})}
          </div>
        )}
      </div>
    </div>
}
{(user?.role==="donor" || !user) &&
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 p-8 flex flex-col items-center ">
      <motion.h1
        className="text-4xl font-extrabold text-red-600 mb-6 text-center mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upcoming Blood Donation Camps
      </motion.h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {campsd?.map((camp,index) => {
          const isPast = isPastCamp(camp?.date, camp?.Time)
          
          return (
          <motion.div
            key={index}
            className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl ${
        isPast
          ? 'bg-gray-200 text-gray-500 border border-gray-400'
          : 'bg-white text-black' }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: camp.id * 0.1 }}
          >
            <h2 className="text-xl font-bold text-red-600">{camp.campname}</h2>
            <p className="text-gray-700 mt-2">📍 {camp.location}</p>
            <p className="text-gray-700 mt-1">📅 {camp?.date} | ⏰ {moment(camp?.Time, "HH:mm").format("hh:mm A")}</p>
            <p className="text-gray-700 mt-1">👤 Organized by: {camp?.organizer}</p>
            <p className="text-gray-700 mt-1 font-medium">📞  {camp.contact} 📧{camp.email}</p>
            {/* <motion.button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            //   onClick={() => handleRegisterClick(camp)}
            >
              Register Now
            </motion.button> */}
          </motion.div>
)})}

      </div>
      {/* {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Register for {selectedCamp.name}</h2>
            <form onSubmit={handleSubmit1} className="space-y-4">
              <input type="text" name="name" value={formDat.name} onChange={handleChange1} placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
              <input type="email" name="email" value={formDat.email} onChange={handleChange1} placeholder="Email" className="w-full p-3 border rounded-lg" required />
              <input type="text" name="bloodGroup" value={formDat.bloodGroup} onChange={handleChange1} placeholder="Blood Group" className="w-full p-3 border rounded-lg" required />
              <input type="text" name="phone" value={formDat.phone} onChange={handleChange1} placeholder="Phone Number" className="w-full p-3 border rounded-lg" required />
              <div className="flex justify-between">
                <motion.button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-lg" onClick={() => setIsModalOpen1(false)}>Cancel</motion.button>
                <motion.button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">Confirm</motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )} */}
    </div>
}
    </>
  );
};

export default BloodCamp;
