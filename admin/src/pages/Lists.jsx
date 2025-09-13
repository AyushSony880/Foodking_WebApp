import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

function Lists() {
  const [allItems, setAllItems] = useState("");
  const backend_Url = "http://localhost:4000";
  const getItemList = async () => {
    try {
      const { data } = await axios(`${backend_Url}/food/view`);
      setAllItems(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const removeItem = async (id, name) => {
    try {
      await axios.delete(`${backend_Url}/food/remove/${id}`);
      await getItemList();
      toast.success(`${name} is removed`, {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemList();
  }, []);
  return (
    <div className="w-full max-h-screen overflow-y-auto">
      <div className="items-center w-full mx-auto ">
        <ToastContainer pauseOnHover={false} />
        <table className=" w-[95%] lg:w-[65%]   mx-auto ">
          <thead className="">
            <tr>
              <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:pb-10 sm:text-sm">
                Product
              </th>
              <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:pb-10 sm:text-sm">
                Category
              </th>
              <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:pb-10 sm:text-sm">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="">
            {allItems ? (
              allItems?.length ? (
                allItems.map((item) => (
                  <tr key={item._id} className="relative border-b-2">
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex flex-col items-center py-2 sm:flex-row">
                        <img
                          src={`${backend_Url}/image/${item.image}`}
                          className="object-cover mr-2 rounded-md w-14 h-11 sm:h-16 sm:w-20"
                        />
                        <span className="px-2 py-1 text-xs sm:text-base">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-1 text-xs sm:text-base whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-3 py-1 text-xs sm:text-base whitespace-nowrap">
                      ₹ {item.price}
                    </td>
                    <td
                      id={item._id}
                      onClick={() => removeItem(item._id, item.name)}
                    >
                      <IoCloseCircle className="hover:scale-90 duration-300 ease-in-out text-[#ff5200]  cursor-pointer text-lg sm:text-2xl absolute top-2 right-0" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Empty</td>
                </tr>
              )
            ) : (
              <tr>
                <td>"loading...."</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lists;
