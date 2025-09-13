import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Orders from "./pages/Orders";
import Home from "./Home";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-start h-screen mx-2 sm:gap-10">
        <Sidebar />

        <Routes path="/" element={<Home />}>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<Lists />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </div>
      //{" "}
    </div>
  );
}

export default App;
