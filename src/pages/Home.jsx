/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";

import Spinner from "../component/shared/Spinner";
// import Layout from "../component/shared/Layout";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../App";
import moment from "moment";
import Navbar from "../component/shared/Navbar";
import DonorAccordion from "../component/shared/Donoracc";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

 


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
   
  return (
    <>
      {/* {!user && <Spinner />} */}
      <div  >
       <Navbar/>
        {user?.role === "admin" && navigate("/admin")}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {user?.role === "organisation" && (
              //       <div  >
              //          <h4>   <i className="fa-solid fa-plus text-success py-4"></i> Inventory</h4>
              // <table className=' w-full  text-center   border border-blue-400' >
              //      <thead className='text-sm uppercase text-white'style={{backgroundColor:"#0B60B0"}}>
              //          <tr>
              //              <th scope='col ' className='px-6 py-4'>BloodGroup</th>
              //              <th scope='col' >Inventory Type</th>
              //              <th scope='col'  >Quantity</th>
              //              <th scope='col'  >donor Email</th>
              //              <th scope='col'  >Date & Time</th>
              //          </tr>
              //      </thead>

              //      <tbody>

              //          {data?.map((records)=>(
              //              <tr  key={records._id} >
              //              <td  className='px-6 py-4' >{records.bloodGroup}</td>
              //              <td  >{records.inventoryType}</td>
              //              <td  >{records.quantity}</td>
              //              <td  >{records.email}</td>
              //              <td  >{moment(records.createdAt).format("DD/MM/YYYY hh:mm: A")}</td>
              //          </tr>
              //          ))}

              //      </tbody>
              //   </table>
              //       </div>
              <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6 flex flex-col items-center text-white">
                {/* Header Section */}
                <header className="w-full max-w-6xl bg-white text-gray-800 p-6 rounded-xl shadow-md text-center mb-6">
                  <h1 className="text-3xl font-bold">
                    Welcome to Blood Bank Organization
                  </h1>
                  <p className="mt-2 text-lg">
                    Ensuring the availability of blood for those in need
                  </p>
                </header>

                {/* Main Content */}
                <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                      Manage Blood Inventory
                    </h2>
                    <p className="mt-2 text-center">
                      Track available blood stocks and update records
                      efficiently.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/invent"}
                    >
                      Go to Inventory
                    </Link>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                      View Donation Requests
                    </h2>
                    <p className="mt-2 text-center">
                      Approve or reject blood donation requests from donors.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/org-request"}
                    >
                      Check Requests
                    </Link>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                      Analytics 
                    </h2>
                    <p className="mt-2 text-center">
                    Monitor donation and generate availability.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/analytics"}
                    >
                      View Analytics
                    </Link>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">donors List</h2>
                    <p className="mt-2 text-center">
                      Monitor donation trends and generate reports.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/donor"}
                    >
                      View donors
                    </Link>
                  </div>

                  {/* blood camp */}

                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                      BloodCamp Details
                    </h2>
                    <p className="mt-2 text-center">
                      Creation of BloodCamp for Donation.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/bloodcamp"}
                    >
                      Create One
                    </Link>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Hospital Lists</h2>
                    <p className="mt-2 text-center">
                      Monitor hospital list and its details.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      to={"/hospital"}
                    >
                      View Hospitals
                    </Link>
                  </div>
                </div>

                {/* Footer */}
               
              </div>
            )}
          </>
        )}

        {(user?.role === "donor" || user?.role === "hospital" )&& (
          <div className="min-h-screen p-4 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white  space-x-8">
            {/* Left Section - Content */}
            <div className=" md-w-2/3  text-center md:text-left space-y-6">
            {user?.role==="hospital"&&(
            <>
              <h1 className="text-4xl font-bold leading-tight">
              Welcome to Hospital Portal
              </h1>
              <p className="text-lg text-gray-200">
                Your donation can be a lifeline for someone in need. Join our
                mission to provide blood to those who need it the most.
              </p>
              </>)}
              {user?.role==="donor"&&(
               <>
               <h1 className="text-4xl font-bold leading-tight">
               Donate Blood, Save Lives!
             </h1>
             <p className="text-lg text-gray-200">
               Your donation can be a lifeline for someone in need. Join our
               mission to provide blood to those who need it the most.
             </p>
             <div className="  sm:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-8">
             <DonorAccordion/>
             </div>
              
       
    
             {/* <button
               disabled
               className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
             >
               Become a Donor
             </button> */}
             </>
              )}
              <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Organisation Lists</h2>
                    <p className="mt-2 text-center">
                      Monitor Organisation list and its details.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center"
                      to={"/organisation"}
                    >
                      View Organisation
                    </Link>
                  </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                  <h2 className="text-xl font-semibold text-center">
                     Create a Requests
                  </h2>
                  <p className="mt-2 text-center">
                    Put blood requests to the organisation.
                  </p>
                  <Link
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center"
                    to={"/request"}
                  >
                    Check Requests
                  </Link>
                </div>
                {
                  user?.role==="donor" &&
                  <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                  <h2 className="text-xl font-semibold text-center">
                  See bloodcamp Detail.
                  </h2>
                  <p className="mt-2 text-center">
                   
                    Check the List of upcomimg Bloodcamp
                  </p>
                  <Link
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center"
                    to={"/bloodcamp"}
                  >
                    Check BloodCamp
                  </Link>
                </div>
                }
                <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
                    <h2 className="text-xl font-semibold">
                      Analytics
                    </h2>
                    <p className="mt-2 text-center">
                      Monitor donation and generate availability.
                    </p>
                    <Link
                      className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center"
                      to={"/analytics"}
                    >
                      View Analytics
                    </Link>
                  </div>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className=" hidden sm:flex md:h-full md:w-1/3  flex justify-center mt-8 md:mt-0 items-center">
              <img
                src={
                   "./images/banner2.jpg"
                }
                alt="Donor Illustration"
                className="w-full h-1/2 max-w-md rounded-full shadow-xl object-cover "
              />
            </div>
            {/* <footer className="mt-12 text-center text-sm opacity-75">
                  &copy; 2025 Blood Bank Organization. All rights reserved.
                </footer> */}
          </div>

          // <div className="text-center flex flex-col space-y-4 items-center  ">
          //    <h1 className='uppercase text-2xl font-semibold underline'>{user?.name}</h1>
          //    <p className=''> A donor is an individual or organization that provides financial support to a cause or organization they care about. Donors play a critical
          //    role in funding the mission and programs of nonprofits and other social impact organizations. They can make one-time or recurring donations, and may also choose to support organizations through volunteering their time or in-kind donations. Donors help to make a difference in the world by enabling organizations to carry out their work and achieve their goals.
          //    </p>
          // </div>
        )}
      {/* </Layout> */}
      </div>
      
    </>
  );
};

export default Home;
