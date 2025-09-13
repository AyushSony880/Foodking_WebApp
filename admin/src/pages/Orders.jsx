import parcel from "../assets/parcel_icon.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function MyOrderCard() {
  const backend_Url = "http://localhost:4000";
  const [myOrders, setMyOrders] = useState([]);
  console.log(myOrders)
  const handleStatus = async (val, id) => {
    try {
      const result = await axios.post(
        `${backend_Url}/order/status`,
        { value: val, id: id },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const viewMyOrders = async () => {
    try {
      const items = await axios.get(`${backend_Url}/order/allOrders`, {
        withCredentials: true,
      });
      setMyOrders(items.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewMyOrders();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-full p-4 min-h-[100vh]">
      <div className="flex items-center mb-3 text-lg font-semibold ">
        <IoMdArrowRoundBack
          onClick={() => navigate("/")}
          className="mx-10 cursor-pointer "
        />
        <p> My Orders</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-5 mt-10">
        {myOrders.length
          ? myOrders.map((item) => (
              <div
                key={item._id}
                className="flex flex-col justify-between min-w-[60%] w-[90%] gap-3 p-4 border rounded-md shadow-sm sm:flex-row md:items-center"
              >
                <div className="self-start w-12 h-12 bg-yellow-100 rounded-md ">
                  <img src={parcel} alt="" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {item.items.map((itemName) => (
                      <span className="" key={itemName.name}>
                        {itemName.name} x {itemName.quantity + ", "}
                      </span>
                    ))}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mt-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">
                      ₹ {item.amount}
                    </span>
                  </div>
                </div>
                <div className="self-end">
                  <select
                    onChange={(e) => handleStatus(e.target.value, item._id)}
                    defaultValue="Pick a status"
                    className="z-20 p-2 border rounded-md select"
                  >
                    <option disabled={true}>Pick a status</option>
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Preparing Your Order">
                      Preparing Your Order
                    </option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          : "loading..."}
      </div>
    </div>
  );
}
