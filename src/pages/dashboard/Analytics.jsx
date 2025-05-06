/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "../../component/shared/Layout";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { API } from "../../App";
import { toast } from "react-toastify";
import { Search, Droplet, AlertTriangle } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../component/shared/Spinner";
import Navbar from "../../component/shared/Navbar";

 

const Analytics = () => {
  // const [filters, setFilters] = useState({
  //   org: "",
  //   bloodGroup: "",
  //   name: "",
  //   quantity: "",
  // });

  // const [filteredData, setFilteredData] = useState(sampleData);

  // const handleSearch = () => {
  //   const { org, bloodGroup, name, quantity } = filters;
  //   const result = sampleData.filter((item) => {
  //     return (
  //       (org ? item.orgName.toLowerCase().includes(org.toLowerCase()) : true) &&
  //       (bloodGroup ? item.bloodGroup === bloodGroup : true) &&
  //       (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true) &&
  //       (quantity ? item.quantity === parseInt(quantity) : true)
  //     );
  //   });
  //   setFilteredData(result);
  // };

  // card for available blood
  const [data, setdata] = useState([]);
  const [btype, setbtype] = useState("");
  const [Qyt, setQyt] = useState("");
  const [Data, setData] = useState([]);
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const { user } = useContext(UserContext);
  const [orglistdata, setorg] = useState([]);
 
  // const orglist = async () => {
  //   try {
  //     const { data } = await API.get("/auth/getorg", { withCredentials: true });

  //     setorg(data.user);
  //     // console.log(orglistdata);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
      const orglist = useCallback(async () => {
            try {
              const { data } = await API.get("/auth/getorg", { withCredentials: true });
        
              setorg(data.user);
              // console.log(orglistdata);
            } catch (err) {
              console.error(err);
            }
          }, []);
  // orglist()
  const getdata = async () => {
    setloading(true);
    try {
      if (!email ) {
        setloading(false)
        alert('Please select both Organisation and Blood Group.');

        return;
      }
      const { data } = await API.get(`/inventory/anlytics?email=${email}`, {
        withCredentials: true,
      });

      if (data?.success) {
        toast.success(data?.message);
        setloading(false);
        setData(data?.bloodGroupData);
        
      }
      if (!data?.success) {
        toast.error(data?.message);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getorgdata = async () => {
    setloading(true);
    try {
      const { data } = await API.get(`/inventory/organlytics`, {
        withCredentials: true,
      });

      if (data?.success) {
        setdata(data?.bloodGroupData);

        setloading(false);
      }
      if (!data?.success) {
        toast.error(data?.message);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(()=>{
     orglist()
     

  },[orglist])
  useEffect(() => {
    getorgdata();
    
  }, []);

  const filteredBlood = Data.filter((item) => {
    if (!btype) return item;
    const a = btype ? item.bloodGroup === btype : true;
    const b = Qyt ? item.avilableblood >= parseInt(Qyt) : true;
    return a && b;
  });

  return (
    <>
      <Navbar />

      {loading && <Spinner />}

      {/* card for available blood */}
      {!loading && ((user?.role !== "organisation" ) ? (
        <>
          <div className="p-4 px-6 max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-red-700 drop-shadow">
              Available Blood Inventory
            </h1>

            {/* Filters */}
            <div className="grid place-content-between md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-4 items-end mb-10  ">
            <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">
          Organisation <span className="text-red-500">*</span>
        </label>
        <select
                className="border p-2 rounded-md w-3/4  shadow-md focus:ring-red-500 focus:outline-none"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              >
                <option value="">All Organisation</option>
                {orglistdata.map((group,index) => (
                  <option key={index} value={group.email}>
                    {group.organisationName}
                  </option>
                ))}
              </select>
      </div>
              
            
              
              {/* <input
                type="text"
                placeholder="Organization Name"
                className="border p-2 rounded-md w-full shadow-md focus:ring-red-500 focus:outline-none"
                value={filters.org}
                onChange={(e) =>
                  setFilters({ ...filters, org: e.target.value })
                }
              /> */}
              <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">
          Blood Group <span className="text-red-500">*</span>
        </label>
        <select
                className="border p-2 rounded-md w-full shadow-md focus:ring-red-500 focus:outline-none"
                value={btype}
                onChange={(e) => setbtype(e.target.value)}
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
      </div>
      <div className="flex flex-col relative group">
        <label className="text-sm font-medium mb-1">
          Quantity (units)
        </label>
        <input
                type="number"
                placeholder="Quantity (optional)"
                className="border p-2 rounded-md w-full shadow-md focus:ring-red-500 focus:outline-none"
                value={Qyt}
                onChange={(e) => setQyt(e.target.value)}
              />
        <span className="absolute top-full left-0 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Optional
        </span>
      </div>
             

              {/* <input
          type="text"
          placeholder="Donor Name"
          className="border p-2 rounded-md w-full shadow-md focus:ring-red-500 focus:outline-none"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        /> */}

              
              <button
        onClick={getdata}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-md shadow hover:shadow-lg transition duration-200"
      >
        🔍 Search
      </button>
              {/* <button
               onClick={getdata}
                className="bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 text-white p-2 rounded-full flex items-center justify-center shadow-lg transition duration-300"
              >
                <Search size={20} />
              </button> */}
            </div>

            {/* Cards */}

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {filteredBlood.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-2" />
                    <p className="text-lg font-semibold">
                      No matching blood records found.
                    </p>
                    <p className="text-sm">
                      Try adjusting your filters or check again later.
                    </p>
                  </div>
                </div>
              ) : (
                // <p className="col-span-full text-center text-gray-600">No matching data found.</p>
                filteredBlood.map((items) => (
                  <div
                    key={items.id}
                    className="relative bg-gradient-to-br from-white to-red-50 shadow-xl rounded-3xl p-5 border border-red-200 hover:shadow-2xl transform transition duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                      <Droplet size={18} />
                    </div>
                    <h2 className="text-2xl font-bold text-red-700 mb-3 tracking-wide">
                      {items.bloodGroup}
                    </h2>
                    <p className="text-gray-800 mb-1">
                      <span className="font-medium">Total IN :</span>{" "}
                      {items.totalIn} ml
                    </p>
                    <p className="text-gray-800 mb-1">
                      <span className="font-medium">Total OUT :</span>{" "}
                      {items.totalOut} ml
                    </p>
                    {/* <p className="text-gray-800 mb-1">
                <span className="font-medium">Donor:</span> {item.name}
              </p> */}
                    <p className="text-gray-800">
                      <span className="font-medium"> Total Available: </span>{" "}
                      {items.avilableblood}ml
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ):
      <>
      <div className="p-4 max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-red-700 drop-shadow">
              Available Blood Inventory
            </h1>

            {/* Filters */}
            

            {/* Cards */}

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {data?.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <AlertTriangle className="w-12 h-12 text-red-400 mb-2" />
                    <p className="text-lg font-semibold">
                      No matching blood records found.
                    </p>
                    <p className="text-sm">
                      Try adjusting your filters or check again later.
                    </p>
                  </div>
                </div>
              ) : (
                // <p className="col-span-full text-center text-gray-600">No matching data found.</p>
                data.map((items) => (
                  <div
                    key={items.id}
                    className="relative bg-gradient-to-br from-white to-red-50 shadow-xl rounded-3xl p-5 border border-red-200 hover:shadow-2xl transform transition duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                      <Droplet size={18} />
                    </div>
                    <h2 className="text-2xl font-bold text-red-700 mb-3 tracking-wide">
                      {items.bloodGroup}
                    </h2>
                    <p className="text-gray-800 mb-1">
                      <span className="font-medium">Total IN :</span>{" "}
                      {items.totalIn} ml
                    </p>
                    <p className="text-gray-800 mb-1">
                      <span className="font-medium">Total OUT :</span>{" "}
                      {items.totalOut} ml
                    </p>
                    {/* <p className="text-gray-800 mb-1">
                <span className="font-medium">Donor:</span> {item.name}
              </p> */}
                    <p className="text-gray-800">
                      <span className="font-medium"> Total Available: </span>{" "}
                      {items.avilableblood}ml
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
      </> )}

      {/* // ending  */}

    
    </>
  );
};

export default Analytics;
