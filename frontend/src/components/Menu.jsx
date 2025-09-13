import  { useState } from "react";
import { menu_list } from "../assets/assets";
import ItemCard from "../components/ItemCard";
import { useFoodContext } from "../Context/Context";
import { FallingLines } from "react-loader-spinner";

function Menu() {
  const [category, setcategory] = useState("all");
  const { product } = useFoodContext();

  return (
    <div className="mt-14 w-[90%] mx-auto ">
      <h2 id="menu" className="text-2xl font-bold md:text-3xl">
        Explore our menu
      </h2>
      <p className="py-2 text-xs tracking-wide md:hidden">
        Choose from a diverse menu featuring a delectable array of dishes Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex items-center justify-between gap-8 pb-10 overflow-x-scroll border-b border-gray-600 scrollbar-hide shrink-0">
        {menu_list.map((data, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                setcategory((prev) =>
                  prev !== data.menu_name ? (prev = data.menu_name) : "all"
                )
              }
              className={`${
                category === data.menu_name ? "font-bold text-[#ff5200]" : ""
              } cursor-pointer flex items-center flex-col justify-center pt-2 md:pt-4`}
            >
              <div
                className={`${
                  category === data.menu_name
                    ? "border-[3px] border-[#ff5200]"
                    : ""
                } w-14 md:w-24 overflow-hidden rounded-full `}
              >
                <img
                  className="w-full duration-300 ease-in-out hover:scale-110"
                  src={data.menu_image}
                  alt=""
                />
              </div>
              <p className=" whitespace-nowrap md:pt-2">{data.menu_name}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-7 md:text-3xl">
          Top dishes near you
        </h2>
        <div className="flex flex-wrap items-center py-5 justify-evenly gap-y-4 sm:gap-y-10 ">
          {product.length > 0 ? (
            product.map((data) => {
              if (category === "all" || category === data.category) {
                return <ItemCard key={data._id} data={data} />;
              }
            })
          ) : (
            <FallingLines
              color="#ff5200"
              width="100"
              visible={true}
              ariaLabel="falling-circles-loading"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
