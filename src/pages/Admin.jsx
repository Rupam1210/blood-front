import React from "react";
// import Layout from "../component/shared/Layout";
import { Link } from "react-router-dom";
import Navbar from "../component/shared/Navbar";

const Admin = () => {
 
  return (
    <>
     <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-gray-500 to-blue-700 p-6 flex flex-col items-center text-white">
          {/* Header Section */}
          <header className="w-full max-w-6xl bg-white text-gray-800 p-6 rounded-xl shadow-md text-center mb-6">
            <h1 className="text-3xl font-bold">Welcome, Admin</h1>
            <p className="mt-2 text-lg">
              Manage donors, hospitals, and organizations efficiently from one
              place.
            </p>
          </header>

          {/* Main Content */}
          <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
              <h2 className="text-xl font-semibold">Manage Blood Inventory</h2>
              <p className="mt-2 text-center">
                Track available blood stocks and update records efficiently.
              </p>
              <Link
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                to={"/invent"}
              >
                Go to Inventory
              </Link>
            </div> */}

            

            <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
              <h2 className="text-xl font-semibold">Analytics</h2>
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
              <h2 className="text-xl font-semibold">Organisation List</h2>
              <p className="mt-2 text-center">
                Monitor Organisation lists and its details.
              </p>
              <Link
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                to={"/org-list"}
              >
                View Organisation
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
              <h2 className="text-xl font-semibold">donors List</h2>
              <p className="mt-2 text-center">
                Monitor donation lists and its details.
              </p>
              <Link
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                to={"/donor-list"}
              >
                View donors
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col items-center">
              <h2 className="text-xl font-semibold">Hospital Lists</h2>
              <p className="mt-2 text-center">
                Monitor hospital list and its details.
              </p>
              <Link
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                to={"/hospital-list"}
              >
                View Hospitals
              </Link>
            </div>
          </div>

          {/* Footer */}
        </div>
         
    
    </>
  );
};

export default Admin;
