import React from "react";
import { assets } from "../assets/assets";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer id="footer">
      <div className="  footer mt-10 w-full flex flex-wrap justify-evenly bg-gray-700 text-gray-400 px-1 py-5 md:p-16">
        <div className="md:w-1/2">
          <img className="sm:w-20 w-10 " src={assets.logo3} alt="" />
          <p className="hidden sm:block w-full pb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            doloribus nostrum voluptatum, accusantium earum possimus laudantium
            obcaecati impedit sunt ut doloremque quas, dolorum ipsum. Nesciunt
            perferendis consequuntur temporibus facere ullam.
            <br />
          </p>
          <div className="text-xs sm:text-lg sm:space-x-2 space-x-1 p-1   text-[#ff5200]">
            <a
              href="https://www.linkedin.com/in/ayush-880-link?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B3KEx2oh5QJKZFp8YSW0M2Q%3D%3D"
              target="_blank"
              className="bg-white cursor-pointer hover:bg-gray-400 duration-200 ease-in-out rounded-full p-1 md:p-2 ri-linkedin-fill"></a>
            <i className="bg-white cursor-pointer hover:bg-gray-400 duration-200 ease-in-out rounded-full p-1 md:p-2 ri-twitter-x-fill"></i>
            <i className="bg-white cursor-pointer hover:bg-gray-400 duration-200 ease-in-out rounded-full p-1 md:p-2 ri-instagram-line"></i>
          </div>
        </div>

        <div>
          <h6 className="footer-title">Company</h6>
          <HashLink className="link link-hover">About us</HashLink>
          <HashLink className="link link-hover">Contact</HashLink>
          <HashLink className="link link-hover">Jobs</HashLink>
          <HashLink className="link link-hover">Press kit</HashLink>
        </div>
        <div>
          <h6 className="footer-title">Get In Touch</h6>
          <p>+91-1234567898</p>
          <p>ayushak880@gmail.com</p>
        </div>
      </div>
      <hr />
      <p className="relative  bg-gray-700 text-gray-400 text-center pb-5 px-1 py-2">
        Copyright © {new Date().getFullYear()} - All right reserved by ACME
        Industries Ltd
        <HashLink
          to="#"
          title="Got to top"
          className=" z-10 absolute ri-arrow-up-circle-line text-2xl p-1 font-bold cursor-pointer  text-white right-5 md:right-10 animate-bounce"></HashLink>
      </p>
    </footer>
  );
}

export default Footer;
