import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Add() {
   const backend_Url = "http://localhost:4000";
  const [item, setItem] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.image) {
      return alert("image required");
    }
    if (!item.category) {
      return alert("category required");
    }
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("image", item.image);
      formData.append("category", item.category);
      formData.append("description", item.description);
      formData.append("price", item.price);
      await axios.post(`${backend_Url}/food/add`, formData);
      setItem({
        image: "",
        name: "",
        price: "",
        category: "",
        description: "",
      });
      toast.success(`${item.name} is added...`, {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center w-full py-5 text-gray-500 ">
      <ToastContainer pauseOnHover={false} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full p-1 mx-2 sm:px-10"
        action=""
        method="post"
      >
        <div className="md:flex md:gap-x-5 md:justify-evenly md:w-full ">
          <div className="max-w-[300px] md:w-[30%] m-5">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                className="object-cover border cursor-pointer md:w-full"
                src={`${
                  item.image
                    ? URL.createObjectURL(item.image)
                    : assets.upload_area
                }`}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setItem({ ...item, image: e.target.files[0] })}
              type="file"
              id="image"
              name="image"
              className="hidden"
            />
          </div>
          <div className=" max-w-[100%] md:max-w-[60%] w-full">
            <div>
              <p className="py-1">Product Name </p>

              <input
                required
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                placeholder="Type here..."
                className={`outline-none border px-5 py-1 rounded-md text-gray-800 `}
                type="text"
              />
            </div>
            <div className="">
              <p className="py-1 ">Product Description </p>
              <textarea
                value={item.description}
                required
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
                placeholder="Type here..."
                className={`outline-none border w-full px-5 text-gray-800 py-2  resize-none   rounded-md `}
                name="description"
                rows="6"
              ></textarea>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="py-1 whitespace-nowrap">Product Category</p>

                <select
                  value={item.category}
                  onChange={(e) =>
                    setItem({ ...item, category: e.target.value })
                  }
                  name="category"
                  className={`px-5 py-1 rounded-md outline-none border `}
                >
                  <option hidden>Category</option>
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure veg">Pure veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div>
                <p className="py-1">Price</p>

                <input
                  value={item.price}
                  required
                  onChange={(e) => setItem({ ...item, price: e.target.value })}
                  placeholder="$20"
                  className={`outline-none border px-3 w-28 py-1 rounded-md text-gray-800 `}
                  type="number"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-fit mt-7 bg-[#ff5200] rounded-md text-white px-10 py-2 font-semibold tracking-wider mx-auto ${
                true ? "" : "cursor-not-allowed"
              }`}
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
