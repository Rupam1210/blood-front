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

const Guest = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

 


  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
   
   
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6 flex flex-col items-center text-white">
        {/* Header Section */}
        <header className="w-full max-w-6xl bg-red-100 text-gray-800 p-6 rounded-xl shadow-md text-center mb-6">
          <h1 className="text-3xl font-bold text-red-700">
            Welcome to Blood Bank Organization
          </h1>
          <p className="mt-2 text-gray-600">
            Ensuring the availability of blood for those in need
          </p>
        </header>
        {/* <div className=" w-full bg-red-100 p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-2">
          Welcome to LiveFlow Blood Bank
        </h1>
        <p className="text-gray-600">
          View real-time blood availability and upcoming blood donation events.
        </p>
      </div> */}

        {/* Main Content */}
        {/* <div className="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div> */}

        {/* Buttons Section */}
        <section className="w-full max-w-4xl flex flex-col md:flex-row gap-6 justify-center mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col ">
            <h2 className="text-xl font-semibold text-center">Analytics</h2>
            <p className="mt-2 text-center">
              Monitor donation and generate availability.
            </p>
            <Link
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center"
              to={"/analytics"}
            >
              View Analytics
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-gray-800 flex flex-col ">
            <h2 className="text-xl font-semibold text-center">
              See bloodcamp Detail.
            </h2>
            <p className="mt-2 text-center">
              Check the List of upcomimg Bloodcamp
            </p>
            <Link
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center"
              to={"/bloodcamp"}
            >
              Check BloodCamp
            </Link>
          </div>
          {/* <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 w-full md:w-1/2 text-lg">
            View Blood Analytics
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 w-full md:w-1/2 text-lg">
            Explore Blood Camps
          </button> */}
        </section>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-2 mt-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Real-Time Stats
            </h2>
            <p className="text-gray-600 text-sm">
              Access live blood stock levels and availability across all
              regions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Donation Insights
            </h2>
            <p className="text-gray-600 text-sm">
              Know which blood types are in demand and where help is needed
              most.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Join Blood Camps
            </h2>
            <p className="text-gray-600 text-sm">
              Discover upcoming donation events near you and participate easily.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 text-sm text-gray-500">
          © {new Date().getFullYear()} LiveFlow — Saving Lives, One Drop at a
          Time
        </footer>
      </div>
    </>
  );
};

export default Guest;
