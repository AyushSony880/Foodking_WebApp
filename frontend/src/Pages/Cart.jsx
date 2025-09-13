import { useFoodContext } from "../Context/Context";
import CartProduct from "../components/CartProduct";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import emptyCart from "../assets/emptyCart.jpg";

function Cart() {
  const { getCartItems, allCartItems } = useFoodContext();
  const navigate = useNavigate();
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="w-[90%] flex relative flex-col gap-x-20 gap-y-10 lg:flex-row lg:justify-between  mx-auto   min-h-[calc(100vh-16px)]">
      <div className="fixed top-0 left-0 z-10 flex items-center justify-start w-full h-20 px-5 text-xl bg-white md:px-16">
        <Link
          to="/"
          className="px-3 text-2xl cursor-pointer ri-arrow-left-line"
        ></Link>
        <h3 className="px-2 font-semibold">My Cart</h3>
      </div>
      {allCartItems.length == 0 && (
        <div className="w-full h-[100vh] flex flex-col mt-20 sm:mt-0 items-center justify-start sm:justify-center">
          <img src={emptyCart} alt="" srcset="" />
          <Link
            to="/"
            className="px-4 py-3 mt-6 font-semibold text-white transition bg-red-500 rounded-lg m hover:bg-red-600"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {allCartItems.length !== 0 && (
        <aside className="flex flex-col justify-start w-full max-h-screen pt-5 mx-1 mt-20 overflow-y-scroll lg:w-1/2 gap-y-5">
          {allCartItems.map((item) => {
            return (
              <CartProduct
                key={item.itemId.name}
                dataQuantity={item.quantity}
                data={item.itemId}
              />
            );
          })}
        </aside>
      )}

      {allCartItems.length !== 0 && (
        <aside className="right-0 lg:w-1/2 lg:fixed top-20">
          <div className=" max-w-[450px] mx-auto  h-fit shadow-md shadow-[#ff5200] font-semibold space-y-4 text-gray-500 p-10">
            <h3 className="text-xl font-bold tracking-wide text-gray-600">
              Price Details
            </h3>
            <div className="flex items-center justify-between pt-3 ">
              <p>
                Price <span>2 items</span>
              </p>
              <p>₹3000</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Discount</p>
              <p className="text-[#559e58]"> - ₹3000</p>
            </div>
            <div className="flex items-center justify-between border-b-2 border-dashed">
              <p>Delivery Charge</p>
              <p className="">₹30</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold tracking-wide text-gray-800">
                Total Amount
              </h3>
              <p>₹3000</p>
            </div>
            <hr />
            <p className="text-[#59aa5c] font-semibold text-sm whitespace-nowrap sm:text-lg">
              You will save ₹5,290 on this order
            </p>
            <button
              onClick={() => navigate("/order")}
              className="px-4 py-3 mt-6 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="max-w-[450px] mx-auto px-5 pb-16 mt-10 flex items-start justify-center text-gray-500 ">
            <i className="text-2xl font-extrabold ri-secure-payment-line"></i>
            <p className="px-3 text-xs font-semibold sm:text-base">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}

export default Cart;
