import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

function sideBar() {
  return (
      <aside className="flex flex-col pt-8 space-y-4 border-r-2 sm:min-w-32 min-w-11 whitespace-nowrap sm:pt-16 ">
        <NavLink
          to="/add"
          className={(e) =>
            `border-2 border-r-0 rounded-sm cursor-pointer text-xs flex items-center gap-3 md:px-5 p-2 md:py-2  font-semibold ${
              e.isActive ? "bg-[#fff0ed] border-orange-200" : "text-gray-500"
            }`
          }>
          <img className="w-5" src={assets.add_icon} />
          <p className="hidden sm:block">Add items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={(e) =>
            `border-2 border-r-0 rounded-sm cursor-pointer text-xs flex items-center gap-3 md:px-5 p-2 md:py-2  font-semibold ${
              e.isActive ? "bg-[#fff0ed] border-orange-200" : "text-gray-500"
            }`
          }>
          <img className="w-5" src={assets.order_icon} />
          <p className="hidden sm:block">List items</p>
        </NavLink>
        <NavLink
          to="/order"
          className={(e) =>
            `border-2 border-r-0 rounded-sm cursor-pointer text-xs flex items-center gap-3 md:px-5 p-2 md:py-2  font-semibold ${
              e.isActive ? "bg-[#fff0ed] border-orange-200" : "text-gray-500"
            }`
          }>
          <img className="w-5" src={assets.order_icon} />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </aside>
  );
}

export default sideBar;
