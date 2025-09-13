import axios from "axios";
import { useEffect } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFoodContext } from "../Context/Context";

const Verify = () => {
  const { backend_Url} = useFoodContext()
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(`${backend_Url}/order/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="w-full min-h-[100vh] bg-orange-50 flex justify-center items-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#ff5200"
        outerCircleColor="#ff5200"
        innerCircleColor="#ff5200"
        barColor="#ff5200"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Verify;
