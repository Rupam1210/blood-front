import React, { useEffect, useState } from "react";
// import Layout from "../../component/shared/Layout";
import { API } from "../../App";
import moment from "moment";
import Spinner from "../../component/shared/Spinner";
import Navbar from "../../component/shared/Navbar";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Inventory = () => {
    
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const getall = async () => {
    setloading(true);
    try {
      const { data } = await API.get("/inventory/getrecord", {
        withCredentials: true,
      });

      if (data?.success) {
        setData(data?.invent);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  
  useEffect(() => {
    getall();
  }, []);
  // console.log(Data)
  const [formData, setFormData] = useState({
    inventoryType: "",
    bloodGroup: "",
    quantity: "",
    email: "",
    organisation: "",
    hospital: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const { data } = await API.post("/inventory/store", {
         ...formData
     
      },{
        withCredentials: true,
      })
       
       if(data?.success){
          
          toast.success(data.message)
          getall();
        }else{
          toast.error(data.message)
        }

     setFormData({inventoryType: "",bloodGroup: "",quantity: "",email: "",organisation: "",hospital: "",
    })
      // console.log("Submitted Data:", formData);
      setIsOpen(false);
    } catch (error) {
      console.log(error)
      
    }
   
  };

  return (
    <>
      <Navbar/>
        {loading ? (
          <Spinner />
        ) : 
        <div className="min-h-screen bg-gray-100">
    

      {/* Inventory Table */}
      <div className="container mx-auto p-6">
      <div className="flex ">
      <button
        className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700"
        onClick={() => setIsOpen(true)}
      >
        Register Inventory
      </button>
      {isOpen && (
        <motion.div 
          className="fixed m-2 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-center mb-4">Register Inventory</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Inventory Type</label>
                <select
                  name="inventoryType"
                  value={formData.inventoryType}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select</option>
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Organisation ID</label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital ID</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div> */}
              <div className="flex justify-between">
                <motion.button
                  type="button"
                  className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
    {/* taking input */}
        {/* <h2 className="text-xl font-semibold mb-4">Inventory</h2> */}

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Blood Group</th>
                <th className="py-3 px-4 text-left">Inventory Type</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Donor Email</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="border-b text-gray-700 hover:bg-gray-100">
                  <td className="py-3 px-4">{item.bloodGroup}</td>
                  <td className="py-3 px-4 capitalize">{item.inventoryType}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">
                  {moment(item.createdAt).format("DD/MM/YYYY hh:mm: A")}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>}
      {/* </Layout> */}
    </>
  );
};

export default Inventory;
