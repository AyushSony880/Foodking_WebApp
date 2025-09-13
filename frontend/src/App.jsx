import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { useFoodContext } from "./Context/Context";
import LoginPopup from "./components/LoginPopup";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Verify from "./Pages/Verify";
import MyOrder from "./Pages/MyOrder";

function App() {
  const { showLoginPopup } = useFoodContext();
  return (
    <div className="w-full text-gray-700 bg-white select-none ">
      {showLoginPopup && <LoginPopup />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrder />} />
      </Routes>
    </div>
  );
}

export default App;
