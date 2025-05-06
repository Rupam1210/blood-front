import React, { useEffect, useState } from "react";

import { API } from "../App";
 
import moment from "moment";
import Spinner from "../component/shared/Spinner";

import { toast } from "react-toastify";
import Navbar from "../component/shared/Navbar";

const Orgrequest = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState("");
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedBloodGroup, setEditedBloodGroup] = useState("");
  const [reqid, setid] = useState("");
  const acceptreq = async (val) => {
    console.log(val);
    setid(val);

    setEditedQuantity(val.quantity);
    setEditedBloodGroup(val.bloodGroup);
    setShowModal(true);
    // try {
    //     const {data}=await API.get(`/request/req-accept/${val}`,{withCredentials:true})
    //     // console.log(data)
    //     if(data?.success){
    //         toast.success(data?.message)
    //         window.location.reload(true)
    //     }
    //     if(!data?.success){
    //         toast.error(data?.message)
    //     }

    // } catch (error) {
    //     console.log(error)
    // }
  };

  const rejectreq = async (val) => {
    try {
      const { data } = await API.get(`/request/req-reject/${val}`, {
        withCredentials: true,
      });

      // console.log(data)
      if (data?.success) {
        toast.success("Request is rejected");
        window.location.reload(true);
      }
      if (!data?.success) {
        toast.error("Request is rejected");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getrequest = async () => {
    setloading(true);
    try {
      const { data } = await API.get("/request/get-orgreq", {
        withCredentials: true,
      });

      if (data?.success) {
        setdata(data?.reqs);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getrequest();
  }, []);

  // const handleAcceptClick = (request) => {
  //   setSelectedRequest(request);
  //   setEditedQuantity(request.quantity);
  //   setEditedBloodGroup(request.bloodGroup);
  //   setShowModal(true);
  // };

  const confirmAccept = async () => {
    // const updatedRequest = {
    //   // ...selectedRequest,
    //   quantity: editedQuantity,
    //   bloodGroup: editedBloodGroup,
    // };
    try {

      let data1;
      let donor=reqid?.donor
     
      if(reqid?.inventoryType==="in"){
        data1 = await API.put(
          `/request/upreq/${reqid._id}`,
          { editedQuantity ,editedBloodGroup,donor},
          { withCredentials: true }
        );
      }else{
        data1 = await API.put(
          `/request/upreq/${reqid._id}`,
          { editedQuantity },
          { withCredentials: true }
        );
      }
      
      setloading(true);
      console.log(data1);
      if (data1.data?.success) {
        const { data } = await API.get(`/request/req-accept/${reqid._id}`, {
          withCredentials: true,
        });
        // console.log(data)
        if (data?.success) {
          toast.success(data?.message);
          setloading(false);
          getrequest();
        }
        if (!data?.success) {
          toast.error(data?.message);
        }

        // window.location.reload(true)
      }
      //     const {data}=await API.get(`/request/req-accept/${val}`,{withCredentials:true})
      //     // console.log(data)
      //     if(data?.success){
      //         toast.success(data?.message)
      //         window.location.reload(true)
      //     }
      //     if(!data?.success){
      //         toast.error(data?.message)
      //     }
    } catch (error) {
      console.log(error);
    }

    // Example: API call or state update
    console.log("Accepted and Edited Request:");

    setShowModal(false);
    // setSelectedRequest(null);
  };

  return (
    <>
      <Navbar/>
        <h1
          className="text-center font-bold text-3xl"
          style={{ color: "#0B60B0" }}
        >
          Request of donors and Hospital
        </h1>

        {data && (
          <>
            <div className="p-4 max-w-6xl mx-auto">
               
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg bg-white">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Phone No.</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Blood Group</th>

                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((req, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="p-3">
                          {" "}
                          {req?.donor?.email}
                          {req?.hospital?.email}
                        </td>
                        <td className="p-3">
                          {req?.donor?.phone}
                          {req?.hospital?.phone}
                        </td>
                        <td className="p-3">
                          {req?.donor?.role.toUpperCase()}
                          {req?.hospital?.role.toUpperCase()}
                        </td>
                        <td className="p-3">
                          {req.inventoryType.toUpperCase()}
                        </td>
                        <td>{req.quantity || 0} </td>
                        {/* <td
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleQuantityChange(index, e.target.innerText)}
                  className="p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
                >
                  {req.quantity}
                </td> */}
                        <td className="p-3">{req.bloodGroup}</td>

                        <td className="p-3">
                          {moment(req.createdAt).format("DD/MM/YYYY hh:mm: A")}
                        </td>

                        <td className="p-3 flex gap-2">
                          {req.requestreject && (
                            <span className="px-4 py-2 bg-red-500 text-white rounded-lg   transition">
                              REJECT
                            </span>
                          )}
                          {req.requestaccept && (
                            <span className="px-4 py-2 bg-green-500 text-white rounded-lg   transition">
                              ACCEPT
                            </span>
                          )}

                          {!req.requestreject && !req.requestaccept && (
                            <>
                              <button
                                onClick={() => acceptreq(req)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => rejectreq(req._id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-600 transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
                    <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                      Review Request Details
                    </h2>

                    {reqid.donor &&reqid.inventoryType==="in" && !reqid?.donor?.verify && (
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Blood Group
                        </label>
                        <select
                          value={editedBloodGroup}
                          onChange={(e) => setEditedBloodGroup(e.target.value)}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        {/* <input
                          type="text"
                          value={editedBloodGroup}
                          onChange={(e) => setEditedBloodGroup(e.target.value)}
                          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        /> */}
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Quantity (units)
                      </label>
                      <input
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={confirmAccept}
                      >
                        Confirm Accept
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!data && <Spinner />}

        {loading && <Spinner />}
  
    </>
  );
};

export default Orgrequest;
