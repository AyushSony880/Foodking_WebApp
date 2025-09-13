import { assets } from "../assets/assets";
import { HashLink } from "react-router-hash-link";

function HeroPage() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url(${assets.header_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-[90%] mx-auto relative gap-y-2  md:gap-y-3 lg:gap-y-5  h-[50vw] lg:h-[37vw]  overflow-hidden mt-4 rounded-3xl flex items-center justify-center flex-col text-white text-sm md:font-bold md:tracking-widest tracking-wider py-3 px-10"
    >
      <p className="text-xs whitespace-nowrap md:text-sm">
        Enjoy Your Healthy Delicious Meal
      </p>
      <h1 className=" font-['playfair'] sm:text-5xl lg:text-8xl text-4xl font-bold">
        Treat Yourself
      </h1>
      <p className="hidden px-10 text-center sm:block ">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>
      <HashLink
        to="#menu"
        className="bg-[#ff5200] hover:scale-95 duration-200 ease-in-out px-3 py-2 rounded-full md:px-12 text-white md:py-4 md:text-base mt-5 md:mt-16"
      >
        View Menu
      </HashLink>
      <div className=" animate-pulse text-xs sm:text-lg absolute bottom-1 right-2 sm:bottom-4 sm:right-6 lg:bottom-7 lg:right-16 sm:space-x-2 space-x-1 p-1   text-[#ff5200]">
        <a
          href="https://www.linkedin.com/in/ayush-880-link?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B3KEx2oh5QJKZFp8YSW0M2Q%3D%3D"
          target="_blank"
          className="p-1 bg-white rounded-full md:p-2 ri-linkedin-fill"
        ></a>
        <a className="p-1 bg-white rounded-full md:p-2 ri-twitter-x-fill"></a>
        <a className="p-1 bg-white rounded-full md:p-2 ri-instagram-line"></a>
      </div>
    </div>
  );
}

export default HeroPage;
