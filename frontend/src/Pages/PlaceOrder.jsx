import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useFoodContext } from "../Context/Context";

const CheckoutForm = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [errorToGetItems] = useState(true);
  const { backend_Url } = useFoodContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  const [orderData, setOrderData] = useState({
    amount: "",
    items: [],
    address: {},
  });

  const getItemList = async () => {
    try {
      const { data } = await axios(`${backend_Url}/cart/list`, {
        withCredentials: true,
      });
      setShowLoading(false);
      data.data.map((item) => {
        const temp = {
          name: item.itemId.name,
          price: item.itemId.price,
          quantity: item.quantity,
        };
        setOrderData((prev) => {
          return {
            ...prev,
            amount: +prev.amount + +temp.price * +temp.quantity,
            items: [...prev.items, temp],
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(orderData)
  }, [orderData, formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderData((prev) => (prev.address = formData));
    createOrder();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
    });
  };
  const createOrder = async () => {
    try {
      const res = await axios.post(`${backend_Url}/order/place`, orderData, {
        withCredentials: true,
      });
      if (res.data.success) {
        window.location.href = res.data.session_url; 
      } else {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100vh]">
      <div className="flex items-center justify-start w-full h-20 px-5 text-xl bg-white md:px-16">
        <Link
          to="/cart"
          className="px-3 text-2xl cursor-pointer ri-arrow-left-line"
        ></Link>
        <h3 className="px-2 font-semibold">Order</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between w-full gap-10 px-6 py-10 lg:flex-row"
      >
        {/* Left Side - Delivery Form */}
        <div
          onSubmit={handleSubmit}
          className="w-full p-6 bg-white shadow-md shadow-[#ff5200] lg:w-2/3 rounded-2xl"
        >
          <h2 className="mb-6 text-2xl font-bold">Delivery Information</h2>

          {/* First & Last Name */}
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none "
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mt-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>

          {/* Street */}
          <div className="flex flex-col mt-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>

          {/* City & State */}
          <div className="flex flex-col gap-4 mt-4 md:flex-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>

          {/* Zip & Country */}
          <div className="flex flex-col gap-4 mt-4 md:flex-row">
            <input
              type="text"
              name="zip"
              placeholder="Zip code"
              value={formData.zip}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="flex-1 p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col mt-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 bg-white border rounded-lg outline-none"
              required
            />
          </div>
        </div>

        {/* Right Side - Cart Totals */}
        <div className="  max-w-[500px] p-6 bg-white shadow-md shadow-[#ff5200] max-h-[300px] lg:w-1/3 rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold">Cart Totals</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">$222</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-medium">$2</span>
            </div>
            <div className="flex justify-between pt-3 text-lg font-bold border-t">
              <span>Total</span>
              <span>$224</span>
            </div>
          </div>

          {errorToGetItems ? (
            showLoading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#ff5200"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <button className="px-4 py-3 mt-6 font-semibold text-white transition bg-red-500 rounded-lg m hover:bg-red-600">
                PROCEED TO PAYMENT
              </button>
            )
          ) : (
            "Network Error"
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
