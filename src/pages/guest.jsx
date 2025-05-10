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
const bloodTraits = [
  {
    group: "O-",
    trait:
      "The universal red cell donor — O-negative blood can be transfused to patients of all blood types. This type is crucial in emergencies. Extremely rare and always in high demand.",
  },
  {
    group: "O+",
    trait:
      "The most common blood type. Can donate to any Rh-positive blood group. Often used in trauma situations where quick transfusions are needed.",
  },
  {
    group: "A-",
    trait:
      "Rare type. Can donate to A-, A+, AB-, AB+. Often in demand for plasma and platelet donations.",
  },
  {
    group: "A+",
    trait:
      "Second most common type. Can donate to A+ and AB+. Commonly used in surgeries and chronic illnesses.",
  },
  {
    group: "B-",
    trait:
      "Rare and valuable. Can donate to B-, B+, AB-, AB+. Crucial for maintaining a diverse blood supply.",
  },
  {
    group: "B+",
    trait:
      "Can donate to B+ and AB+. Common in South Asia and used in general transfusions.",
  },
  {
    group: "AB-",
    trait:
      "Very rare. Can donate to AB-, AB+. Known for its unique plasma compatibility as a universal plasma donor.",
  },
  {
    group: "AB+",
    trait:
      "The universal plasma recipient and red cell recipient — can receive blood from any group. Rarest of all blood types.",
  },
];
const Guest = () => {
    const [open, setOpen] = useState(false);
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
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition text-gray-800" >
        <h2 className="text-xl font-semibold text-center">Info</h2>
            <p className="mt-2 text-center ">
              Know more about the Blood and its donor.
            </p> */}
        <button
                      className="bg-gradient-to-r from-purple-500 to-purple-700 sm:h-1/3 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold tracking-wide transition transform hover:scale-105 "
                      onClick={() => setOpen(true)}
                    >
                      🔍 Blood Group Info
                    </button>

                    {open && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative overflow-y-auto max-h-[90vh] border border-red-100">
                          <h2 className="text-3xl font-extrabold mb-6 text-center text-red-700 underline decoration-red-300">
                            Understanding Blood Groups
                          </h2>
                          <ul className="space-y-4 text-base leading-relaxed text-gray-800">
                            {bloodTraits.map(({ group, trait }) => (
                              <li
                                key={group}
                                className="p-4 rounded-lg bg-red-50 shadow-sm border-l-4 border-red-500"
                              >
                                <span className="text-red-700 font-bold text-lg mr-2">
                                  {group}
                                </span>
                                <span>{trait}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
          {/* </div> */}
          
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
