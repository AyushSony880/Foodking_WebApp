import parcel from "../assets/parcel_icon.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useFoodContext } from "../Context/Context";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MyOrderCard() {
  const { backend_Url } = useFoodContext();
  const [myOrders, setMyOrders] = useState([]);
  const textStatusColors = {
    "Order Confirmed": "text-emerald-500",
    "Preparing Your Order": "text-amber-500",
    "Out for delivery": "text-orange-500",
    Delivered: "text-green-600",
  };
  const dotStatusColors = {
    "Order Confirmed": "bg-emerald-500",
    "Preparing Your Order": "bg-amber-500",
    "Out for delivery": "bg-orange-500",
    Delivered: "bg-green-600",
  };
  const viewMyOrders = async () => {
    try {
      const items = await axios.get(`${backend_Url}/order/myOrders`, {
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
                    <span>Items: {item.items.length}</span>
                    <span
                      className={`flex items-center gap-1 ${
                        textStatusColors[item.status] || "text-gray-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 ${
                          dotStatusColors[item.status] || "bg-gray-500"
                        } rounded-full`}
                      ></span>{" "}
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="self-end">
                  <button
                    onClick={() => viewMyOrders()}
                    className="px-4 py-2 mx-5 text-sm text-red-600 transition bg-red-100 rounded-md hover:bg-red-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))
          : "No order"}
      </div>
    </div>
  );
}
