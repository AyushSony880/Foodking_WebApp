import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const foodContext = createContext(null);
export const useFoodContext = () => useContext(foodContext);
export const FoodContextProvider = (props) => {
  const [showLoginPopup, setshowLoginPopup] = useState(false);
  const [product, setproduct] = useState([]);
  const [isSignUpPopUp, setisSignUpPopUp] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);

  const [allCartItems, setAllCartItems] = useState([]);
  const backend_Url = "http://localhost:4000";

  const loginStatus = async () => {
    try {
      const result = await axios.get(`${backend_Url}/user/me`, {
        withCredentials: true,
      });
      setIsUserLogin(true);
    } catch (error) {
      setIsUserLogin(false);
      console.log(error);
    }
  };
  const getCartItems = async () => {
    try {
      const { data } = await axios.get(`${backend_Url}/cart/list`, {
        withCredentials: true,
      });
      setAllCartItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllItems = async () => {
    try {
      const result = await axios.get(`${backend_Url}/food/view`, {
        withCredentials: true,
      });
      setproduct(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loginStatus();
  }, [isUserLogin]);
  useEffect(() => {
    getCartItems();
    getAllItems();
  }, []);

  const increaseCartItem = async (itemId) => {
    try {
      const result = await axios.post(
        `${backend_Url}/cart/increase`,
        {
          id: itemId,
        },
        {
          withCredentials: true,
        }
      );
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = async (itemId) => {
    try {
      const result = await axios.post(
        `${backend_Url}/cart/remove`,
        {
          id: itemId,
        },
        {
          withCredentials: true,
        }
      );
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseCartItem = async (itemId) => {
    try {
      const result = await axios.post(
        `${backend_Url}/cart/decrease`,
        {
          id: itemId,
        },
        {
          withCredentials: true,
        }
      );
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <foodContext.Provider
      value={{
        backend_Url,
        increaseCartItem,
        removeCartItem,
        decreaseCartItem,
        showLoginPopup,
        setshowLoginPopup,
        product,
        setproduct,
        isSignUpPopUp,
        setisSignUpPopUp,
        isUserLogin,
        setIsUserLogin,
        loginStatus,
        getCartItems,
        allCartItems,
        setAllCartItems,
      }}
    >
      {props.children}
    </foodContext.Provider>
  );
};
