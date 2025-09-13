import { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useFoodContext } from "../Context/Context";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

function NavBar() {
  const [dropDown, setdropDown] = useState(false);
  const {
    setshowLoginPopup,
    allCartItems,
    cartData,
    setIsUserLogin,
    isUserLogin,
  } = useFoodContext();

  const logout = async () => {
    try {
      const result = await axios(`${backend_Url}/user/logout`, {
        withCredentials: true,
      });
      setIsUserLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] mx-auto flex justify-between relative  items-center ">
      <div className="w-20">
        <img src={assets.logo3} />
      </div>
      <div
        className={`${
          dropDown ? "block" : "hidden"
        } md:static md:block absolute right-0 top-20  bg-white rounded-md shadow-md md:z-0 z-10 md:border-none md:shadow-none  border px-7 py-3 `}
      >
        <div
          className={`text-base gap-y-2 md:gap-7 font-semibold flex md:flex-row  flex-col`}
        >
          <Link
            to="/"
            className="hover:text-[#ff5200] duration-300 ease-in-out cursor-pointer"
          >
            Home
          </Link>
          <HashLink
            smooth
            to="#menu"
            className="hover:text-[#ff5200] duration-300 ease-in-out cursor-pointer"
          >
            Menu
          </HashLink>
          <HashLink
            smooth
            to="#footer"
            className="hover:text-[#ff5200] duration-300 ease-in-out cursor-pointer"
          >
            Contact Us
          </HashLink>
          <Link
            to="/myorders"
            className="hover:text-[#ff5200] duration-300 ease-in-out cursor-pointer"
          >
            Orders
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5 text-lg font-bold">
        <div className="indicator">
          <Link
            to="/cart"
            className="relative cursor-pointer ri-shopping-bag-line"
          ></Link>
          <span
            className={`${
              allCartItems.length === 0 ? "hidden" : "block"
            } indicator-item badge w-1 h-1 p-1  badge-secondary`}
          ></span>{" "}
        </div>
        <button
          onClick={() => {
            if (isUserLogin) {
              logout();
            } else {
              setshowLoginPopup(true);
            }
          }}
          className="md:px-8 px-3 py-2 text-sm md:text-lg md:py-2 rounded-full hover:scale-95 duration-300 text-white bg-[#ff5200]"
        >
          {isUserLogin ? "Logout" : "Login"}
        </button>
        <i
          onClick={() => setdropDown((prev) => !prev)}
          className="cursor-pointer md:hidden ri-menu-3-fill"
        ></i>
      </div>
    </div>
  );
}

export default NavBar;
