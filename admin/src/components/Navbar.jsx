import React from "react";
import { assets } from "../assets/assets.js";

function Navbar() {
  return (
    <>
      <div className="w-[90%] mx-auto flex justify-between   items-center py-1 ">
        <img className="w-20" src={assets.logo2} />
        <p className="text-xl font-bold text-[#ff5200] tracking-wider">
          Admin Panel
        </p>
        <img className="w-12" src={assets.profile_image} alt="" />
      </div>
      <hr />
    </>
  );
}

export default Navbar;
