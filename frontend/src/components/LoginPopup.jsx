import { useState } from "react";
import { useFoodContext } from "../Context/Context";
import axios from "axios";

function LoginPopup() {
  const { setshowLoginPopup, isSignUpPopUp, setisSignUpPopUp, loginStatus } =
    useFoodContext();

  const [err, setErr] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (isSignUpPopUp) {
      console.log("signup");
      singUp();
    } else {
      login();
    }
    setUserInfo({
      name: "",
      email: "",
      password: "",
    });
  };

  const singUp = async () => {
    try {
      await axios.post(
        "http://localhost:4000/user/signup",
        {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          withCredentials: true,
        }
      );
      loginStatus();
      setshowLoginPopup(false);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message || error.message);
    }
  };
  const login = async () => {
    try {
      await axios.post(
        "http://localhost:4000/user/login",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          withCredentials: true,
        }
      );
      loginStatus();
      setshowLoginPopup(false);
    } catch (error) {
      if (error.response?.data?.message) {
        setErr(error.response.data.message);
      } else if (error.response) {
        setErr(`Error: ${error.response.status}`);
      } else {
        setErr(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div className=" absolute  z-10 w-full h-full bg-[#00000090] grid">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-5 mx-5 text-gray-700 bg-white rounded-lg place-self-center "
      >
        <div className="flex items-center justify-between py-2">
          <h1 className="font-extrabold text-2xl text-[#ff5200]">
            {isSignUpPopUp ? "Sign in" : "Log in"}
          </h1>
          <i
            onClick={() => setshowLoginPopup(false)}
            className="font-semibold cursor-pointer ri-close-large-fill"
          ></i>
        </div>
        <div className="relative flex flex-col ">
          <p className="absolute px-2 text-xs font-semibold top-[-16px] text-red-500 left-28">
            {err}
          </p>
          {isSignUpPopUp && (
            <input
              onChange={(e) => {
                setErr("");
                setUserInfo({ ...userInfo, name: e.target.value });
              }}
              className="px-5 py-2 my-3 bg-white border rounded-md shadow-md outline-none"
              placeholder="Your name"
              type="text"
              value={userInfo.name}
              required
            />
          )}
          <input
            onChange={(e) => {
              setErr("");
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
            className="px-5 py-2 my-3 bg-white border rounded-md shadow-md outline-none"
            placeholder="Your email "
            type="email"
            value={userInfo.email}
            required
          />
          <input
            onChange={(e) => {
              setErr("");
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
            className="px-5 py-2 my-3 bg-white border rounded-md shadow-md outline-none"
            placeholder="Your password "
            type="password"
            value={userInfo.password}
            required
          />
        </div>
        <div className="py-3 pl-2 ">
          <input
            required
            type="checkbox"
            className="checkbox border-[#ff5100e1]  [--chkbg:theme(colors.orange.500)]
             [--chkfg:white] h-[14px] w-[14px] rounded-sm "
          />
          <span className="ml-2 text-sm w-">
            By continuing, i agree fo the ferms of use & privacy policy.
          </span>
        </div>
        <button className="bg-[#ff5100e1] font-semibold text-white mx-10 py-2 rounded-md sm:mt-5 ">
          {isSignUpPopUp ? "Create account" : "Log in"}
        </button>
        <p className="px-5 mt-5 text-sm text-center whitespace-nowrap">
          {isSignUpPopUp ? " Already have an account ?" : "New to FoodKing ?"}
          <span
            onClick={() => {
              setErr("");
              setUserInfo({
                name: "",
                email: "",
                password: "",
              });
              setisSignUpPopUp((prev) => !prev);
            }}
            className=" text-lg cursor-pointer font-bold text-[#ff5100e1]"
          >
            {isSignUpPopUp ? " Log in" : " Sign up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPopup;
