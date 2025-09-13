import  { useState } from "react";
import { assets } from "../assets/assets";
import { useFoodContext } from "../Context/Context";

function ItemCard({ data }) {
  const [cardHover, setcardHover] = useState(false);
  const { increaseCartItem, decreaseCartItem,backend_Url } = useFoodContext();

  return (
    <>
      <div
        onMouseEnter={() => setcardHover(true)}
        onMouseLeave={() => setcardHover(false)}
        className="sm:h-[350px] mx-1 w-36 sm:w-[300px] border  rounded-xl overflow-hidden shadow-lg"
      >
        <div className="relative overflow-hidden bg-red-300 h-3/5">
          {/* card image */}
          <img
            src={`${backend_Url}/image/${data.image}`}
            className={`w-full ${
              cardHover ? "scale-110" : ""
            } duration-300 ease-in-out`}
          />
          {/* add icon on card */}
          <div
            className={`font-bold  sm:text-lg text-[#ff5200] absolute z-10 bottom-2 right-2 inline-flex bg-white rounded-full p-1 gap-x-2 items-center  justify-end 
             
             `}
          >
            <div className="inline-flex gap-2">
              <img
                onClick={() => decreaseCartItem(data._id)}
                className="w-6 cursor-pointer "
                src={assets.remove_icon_red}
                alt=""
              />
              <span className="font-bold"></span>
            </div>

            <img
              onClick={(e) => {
                console.log(data._id);
                increaseCartItem(data._id);
              }}
              className="w-6 cursor-pointer "
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        </div>
        {/* card details */}
        <div className="px-2 sm:py-3 sm:px-5 h-2/5">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h3 className="text-lg font-semibold whitespace-nowrap sm:font-bold">
              {data.name}
            </h3>
            <span className="inline-block text-yellow-500 ">★★★★☆</span>
          </div>
          <p className="text-xs sm:text-sm">{data.description}</p>
          <h3 className="font-bold text-base sm:text-lg text-[#ff5200] p-2">
            ₹{data.price}
          </h3>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
