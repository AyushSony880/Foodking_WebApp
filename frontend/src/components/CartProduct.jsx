import { IoCloseCircle } from "react-icons/io5";
import { useFoodContext } from "../Context/Context";

function CartProduct({ data, dataQuantity }) {
  const {  removeCartItem, increaseCartItem, decreaseCartItem,backend_Url } =
    useFoodContext();
  console.log(data._id);
  return (
    <div>
      <div className="relative w-full text-white bg-orange-500 rounded-lg shadow-md ">
        
        <IoCloseCircle
          onClick={() => removeCartItem(data._id)}
          className="hover:scale-90 duration-300 ease-in-out text-[#fffff]  cursor-pointer text-lg sm:text-2xl absolute top-0 right-0"
        />
        <div className="flex gap-5 px-3 py-5 font-semibold md:px-10 ">
          <div className="w-24 overflow-hidden min-w-24 md:w-48">
            <img
              className="object-cover w-full rounded-md"
              src={`${backend_Url}/image/${data.image}`}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full md:p-4">
            <p className="font-bold sm:w-4/5 md:text-xl whitespace-nowrap line-clamp-2">
              {data.name}
            </p>
            <p className="text-base font-semibold md:text-lg text-gray2500">
              {" "}
              {`Price: $ ${data.price * dataQuantity}`}
            </p>
            <div className="absolute inline-flex p-1 text-xs font-semibold bg-white rounded-lg whitespace-nowrap w-fit bottom-5 right-2 md:right-10 sm:text-base">
              <i
                onClick={() => decreaseCartItem(data._id)}
                className=" hover:bg-[#ff5200] duration-500 hover:text-white ease-in-out  ri-subtract-fill text-[#ff5200] cursor-pointer font-bold  sm:px-1 text-center rounded-lg"
              ></i>
              <span className="w-7 inline-block text-center text-[#ff5200] font-bold ">
                {dataQuantity}
              </span>
              <i
                onClick={() => {
                  increaseCartItem(data._id);
                }}
                className=" hover:bg-[#ff5200] duration-500 hover:text-white ease-in-out  ri-add-fill text-[#ff5200] cursor-pointer font-bold  sm:px-1 text-center rounded-lg"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
